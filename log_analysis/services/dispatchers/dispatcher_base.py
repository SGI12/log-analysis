import argparse
from datetime import datetime

from modules.logging.logger import LogLevel, Logger
from modules.message_broker.consumer import Config as ConsumerConfig, Consumer
from modules.message_broker.producer import Config as ProducerConfig, Producer
from modules.utils.pattern import Pattern

class Context:
    def __init__(self):
        self.logger = None
        self.pattern = None
        self.producer = None

def LogCallback(level, message):
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{str(level)}] {now}: {message}")

def ParseArguments(description):
    parser = argparse.ArgumentParser(description=description)
    parser.add_argument("--server", type=str, required=True, help="Kafka server")
    parser.add_argument("--pool-size", type=int, required=True, help="Pool size")
    parser.add_argument("--pool-cache-limit", type=int, required=True, help="Pool cache limit")
    parser.add_argument("--max-log-level", type=int, required=False, help="Max log level. Error -- 0 (default), Warning -- 1, Debug -- 2")

    arguments = parser.parse_args()
    return arguments

class DispatcherBase:
    def __init__(self, topic: str, pattern: Pattern, consume_callback, description: str):
        # Парсим аргументы
        arguments = ParseArguments(description)

        # Создаём контекст
        self.context = Context()
        self.context.pattern = pattern

        # Настраиваем логирование
        max_log_level = LogLevel.Debug # todo log level
        self.context.logger = Logger(max_log_level=max_log_level, callback=LogCallback)

        # Создаём продюсера
        producer_config = ProducerConfig(arguments.server)
        self.context.producer = Producer(producer_config)

        # Создаём консюмера
        consumer_config = ConsumerConfig(topic, arguments.server, arguments.pool_size, arguments.pool_cache_limit)
        self.consumer = Consumer(consumer_config, consume_callback)

    def run(self):
        self.consumer.run(self.context)
