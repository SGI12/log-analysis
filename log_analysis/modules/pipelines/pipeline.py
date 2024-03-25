from modules.pipelines.pipes.starter import Starter

class Pipeline:
    def __init__(self, name):
        self.name = name
        self.pipes = [Starter()]

    def add(self, pipe):
        previous_output_data_type = self.pipes[-1].output_data_type
        current_input_data_type = pipe.input_data_type

        if previous_output_data_type != current_input_data_type:
            raise Exception("Output and input datatypes are different")

        self.pipes.append(pipe)

        return self

    def run(self, data):
        for pipe in self.pipes:
            data = pipe.do(data)

            if data is None:
                return None

        return data
