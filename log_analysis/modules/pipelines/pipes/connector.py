from modules.pipelines.pipes.pipe_base import *
from modules.transports.client import Client

class Connector(PipeBase):
    def __init__(self, name, host, port):
        super().__init__(name, DataType.String, DataType.String)
        self.host = host
        self.port = port

    def do(self, data):
        client = Client()
        client.connect(self.host, self.port)

        client.send(data)

        return client.receive()
