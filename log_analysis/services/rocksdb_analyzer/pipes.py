import re

from modules.pipelines.pipes.preprocessing import DataType, PipeBase

class RemoveByRegex(PipeBase):
    def __init__(self, name, pattern):
        super().__init__(name, DataType.String, DataType.String)

        self.pattern = re.compile(pattern)

    def do(self, data):
        return self.pattern.sub("", data)

class RemoveOriginalLogTime(RemoveByRegex):
    def __init__(self):
        super().__init__("remove_original_log_time", "\(Original Log Time .*\)")

class RemoveSourceCode(RemoveByRegex):
    def __init__(self):
        super().__init__("remove_source_code", "\[\w*\/?\w*\.\w*:\d+\]")

class StopRunningIfContains(PipeBase):
    def __init__(self, items: list[str]):
        super().__init__("stop_running_if_contains", DataType.String, DataType.String)

        self.items = items

    def do(self, data: str):
        for item in self.items:
            if data.find(item) != -1:
                return None

        return data
