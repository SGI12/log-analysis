import re

from modules.logging.logger import LogLevel
from modules.utils.pattern import Constants, Pattern
from services.dispatchers.dispatcher_base import DispatcherBase

def ConsumeCallback(context, message):
    match = re.search(str(context.pattern), message)
    if match is None:
        context.logger.log(LogLevel.Error, f"Nothing is matched for log '{message}'")
        return

    groups = match.groups()
    topic = groups[5]
    message = groups[6]

    context.logger.log(LogLevel.Debug, f"Sending '{message}' to topic '{topic}'")
    context.producer.send(topic, message)

class AllDispatcher(DispatcherBase):
    def __init__(self):
        # Паттерн: <number>month number hh:mm:ss machine-name process-name: message
        pattern = Pattern()
        pattern.parts = [
            (Constants.unknown_begin_part, "unknown begin part"), # 0
            (Constants.month, "month"),                           # 1
            (Constants.number, "unknown number"),                 # 2
            (Constants.time, "time"),                             # 3
            (Constants.word, "machine name"),                     # 4
            (Constants.word + ":", "process name"),               # 5
            (Constants.anything, "message")                       # 6
        ]

        super().__init__(topic="all", pattern=pattern, consume_callback=ConsumeCallback, description="Dispatcher for all logs")

def main():
    dispatcher = AllDispatcher()
    dispatcher.run()

if __name__ == "__main__":
    main()
