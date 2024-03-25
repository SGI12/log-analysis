from modules.pipelines.pipeline import Pipeline

class PipelineManager:
    def __init__(self, pipe_manager):
        self.pipe_manager = pipe_manager
        self.pipelines = {}

    def create(self, name, pipe_names):
        if self.contains(name):
            raise Exception("Pipeline with name '" + name + "' already exists")

        pipeline = Pipeline(name)
        for pipe_name in pipe_names:
            pipeline.add(self.pipe_manager.get(pipe_name))

        self.pipelines[name] = pipeline

    def get(self, name):
        if not self.contains(name):
            raise Exception("There is no pipelines with name '" + name + "'")

        return self.pipelines[name]

    def contains(self, name):
        return name in self.pipelines
