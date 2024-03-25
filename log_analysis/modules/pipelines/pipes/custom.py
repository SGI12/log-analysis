from modules.pipelines.pipes.pipe_base import *

class Custom(PipeBase):
    def __init__(self, name, input_data_type, output_data_type, callback):
        super().__init__(name, input_data_type, output_data_type)
        self.callback = callback

    def do(self, data):
        return self.callback(data)
