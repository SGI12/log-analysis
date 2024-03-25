from modules.pipelines.pipes.pipe_base import *

class Starter(PipeBase):
    """
    Класс-стартер для запуска пайплайна
    """

    def __init__(self):
        """
        Конструктор
        """

        super().__init__("_starter", DataType.String, DataType.String)

    def do(self, data):
        return data
