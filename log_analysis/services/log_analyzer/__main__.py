import argparse
import json
import re

from modules.message_broker.consumer import Config, Consumer
from modules.storages.storage import ConnectionData, Storage
from modules.utils.pattern import Constants, Pattern
from services.log_analyzer.model import LogAnalyzer

class Context:
    def __init__(self):
        self.kafka_server = None
        self.topic = None
        self.model = None
        self.storage = None
        self.message_pattern = None
        self.enable_logging = False

def CheckRequiredKeys(config):
    keys = ["storage", "kafka_server", "topic", "vectorization_model", "tokenizer", "model"]

    is_ok = True
    for key in keys:
        if key not in config:
            print(f"config doesn't contain key '{key}'")
            is_ok = False

    if not is_ok:
        raise RuntimeError("Invalid configuration file")

    storage_config = config["storage"]
    storage_keys = ["host", "port", "database", "user", "password"]
    for key in storage_keys:
        if key not in storage_config:
            print(f"storage config doesn't contain key '{key}'")
            is_ok = False

    if not is_ok:
        raise RuntimeError("Invalid configuration file")

def ParseConfig() -> Context:
    parser = argparse.ArgumentParser("Log analyzer")
    parser.add_argument("-c", "--config", required=True, type=str, help="Path to configuration file")
    parser.add_argument("-l", "--enable-logging", action="store_true", default=False, help="Enable logging")

    arguments = parser.parse_args()

    with open(arguments.config, "r") as file:
        config_data = file.read()

    config = json.loads(config_data)
    CheckRequiredKeys(config)

    context = Context()
    context.kafka_server = config["kafka_server"]
    context.topic = config["topic"]
    context.model = LogAnalyzer(config["vectorization_model"], config["tokenizer"])
    context.model.fit(config["model"])

    storage_config = config["storage"]
    connection_data = ConnectionData()
    connection_data.host = storage_config["host"]
    connection_data.port = storage_config["port"]
    connection_data.database = storage_config["database"]
    connection_data.user = storage_config["user"]
    connection_data.password = storage_config["password"]

    context.storage = Storage(connection_data)

    context.enable_logging = arguments.enable_logging

    pattern = Pattern()
    pattern.parts = [
        (Constants.unknown_begin_part, "unknown begin part"),  # 0
        (Constants.month, "month"),  # 1
        (Constants.number, "unknown number"),  # 2
        (Constants.time, "time"),  # 3
        (Constants.word, "machine name"),  # 4
        (Constants.word + ":", "process name"),  # 5
        (Constants.anything, "message")  # 6
    ]

    context.message_pattern = re.compile(str(pattern))

    return context

def ClearMessage(context: Context, message: str) -> tuple:
    match = re.search(context.message_pattern, message)
    if match is None:
        if context.enable_logging:
            print(f"Nothing is matched for log '{message}'")

        return "", message

    groups = match.groups()
    topic = groups[5]
    message = groups[6]

    return topic, message

def UpdateStatisticsQuery(name: str):
    return f"update statistics set value = value + 1 where name = '{name}';"

def SaveAnomalyLogQuery(log: str):
    return f"insert into anomaly_logs (data) values('{log}')"

def Callback(context: Context, message: str):
    if context.enable_logging:
        print(f"Processing message '{message}'", message)

    topic, message = ClearMessage(context, message)

    result = context.model.predict(program=topic, message=message)[0]
    result_as_str = "anomaly" if result == -1 else "not anomaly"

    query = UpdateStatisticsQuery("total") + UpdateStatisticsQuery(result_as_str)
    context.storage.do(query)

    if result == -1:
        query = SaveAnomalyLogQuery(message)
        context.storage.do(query)

    if context.enable_logging:
        print("log is " + result_as_str)

def main():
    # Создаём контекст
    context = ParseConfig()

    # Создаём потребителя
    config = Config(context.topic, context.kafka_server, 16, 16)
    consumer = Consumer(config, Callback)

    # Запускаем обработку
    consumer.run(context)

if __name__ == "__main__":
    main()
