from enum import Enum

class LogLevel(Enum):
    Error = 0,
    Warning = 1,
    Debug = 2

    def __int__(self):
        return self.value[0]

    def __str__(self):
        if self.value == LogLevel.Error:
            return "Error"
        elif self.value == LogLevel.Warning:
            return "Warning"
        elif self.value == LogLevel.Debug:
            return "Debug"
        else:
            return "Unknown log level"

class Logger:
    def __init__(self, max_log_level: LogLevel, callback):
        self.max_log_level = max_log_level
        self.callback = callback

    def log(self, level: LogLevel, message):
        # if self.callback is not None and int(level) <= int(self.max_log_level):
        if self.callback:
            self.callback(level, message)
