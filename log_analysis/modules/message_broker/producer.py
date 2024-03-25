import kafka

class Config:
    def __init__(self, server):
        self.server = server

class Producer:
    def __init__(self, config):
        self.producer = kafka.KafkaProducer(
            bootstrap_servers=[config.server]
        )

    def send(self, topic: str, message: str):
        self.producer.send(topic, message.encode())
