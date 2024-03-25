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
    topic = groups[3]
    message = groups[4]

    context.logger.log(LogLevel.Debug, f"Sending '{message}' to topic '{topic}'")
    context.producer.send(topic, message)

class CephOsdDispatcher(DispatcherBase):
    def __init__(self):
        # Паттерн: yyyy-mm-ddThh:mm:ss+timezone pid  number process-name: message
        datetime = Constants.number + "-" + Constants.number + "-" + Constants.number + "T" + Constants.time + "\." + Constants.number + "\+" + Constants.number
        datetime = datetime.replace("(", "")
        datetime = datetime.replace(")", "")

        pattern = Pattern()
        pattern.parts = [
            ("(" + datetime + ")", "Date and time with timezone"), # 0
            (Constants.word, "pid"),                               # 1
            (Constants.number, "unknown number"),                  # 2
            (Constants.word + ":", "process name"),                # 3
            (Constants.anything, "message")                        # 4
        ]

        super().__init__(topic="ceph-osd", pattern=pattern, consume_callback=ConsumeCallback, description="Dispatcher for ceph-osd logs")

def main():
    dispatcher = CephOsdDispatcher()
    dispatcher.run()

if __name__ == "__main__":
    main()
