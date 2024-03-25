import json

from modules.pipelines.pipes.pipe_base import ToString
from modules.handlers.handler_base import *

class CreatePipeline(HandlerBase):
    """
    Обработчик создания пайплайна
    """

    def __init__(self):
        super().__init__("create_pipeline")

    def do(self, context: Context, parameters: dict):
        CheckParameters(parameters, ["name", "pipes"])

        name = parameters["name"]
        pipes = parameters["pipes"]

        context.pipeline_manager.create(name, pipes)

        query = f"insert into pipelines (name, pipes) values ('{name}', '{json.dumps(pipes)}');"
        context.storage.do(query)

class GetPipelines(HandlerBase):
    """
    Обработчик получения списка пайплайнов
    """

    def __init__(self):
        super().__init__("get_pipelines")

    def do(self, context: Context, parameters: dict):
        result = []

        for name, pipeline in context.pipeline_manager.pipelines.items():
            item = {
                "name": pipeline.name,
                "pipes": [pipe.name for pipe in pipeline.pipes if pipe.name[0] != "_"]
            }

            result.append(item)

        return result

class GetPipes(HandlerBase):
    """
    Обработчик получения списка пайп
    """

    def __init__(self):
        super().__init__("get_pipes")

    def do(self, context: Context, parameters: dict):
        result = []

        for pipe_name, pipe in context.pipe_manager.pipes.items():
            item = {
                "name": pipe.name,
                "description": pipe.description,
                "input_data_type": ToString(pipe.input_data_type),
                "output_data_type": ToString(pipe.output_data_type)
            }

            result.append(item)

        return result

class RunPipeline(HandlerBase):
    """
    Обработчик запуска пайплайна
    """

    def __init__(self):
        super().__init__("run_pipeline")

    def do(self, context: Context, parameters: dict):
        CheckParameters(parameters, ["name", "data"])

        name = parameters["name"]
        data = parameters["data"]

        pipeline = context.pipeline_manager.get(name)
        result = pipeline.run(data)

        for subscriber in context.subscribers[name]:
            try:
                Send(subscriber.host, subscriber.port, result)

        return result

class SubscribeOnPipeline(HandlerBase):
    """
    Обработчик подписки на результаты работы пайплайна
    """

    def __init__(self):
        super().__init__("subscribe_on_pipeline")

    def do(self, context: Context, parameters: dict):
        CheckParameters(parameters, ["name", "host", "port"])

        name = parameters["name"]
        host = parameters["host"]
        port = parameters["port"]

        context.sub

        return result
