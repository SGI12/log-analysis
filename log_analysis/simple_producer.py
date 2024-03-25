import argparse
from kafka import KafkaProducer

parser = argparse.ArgumentParser()
parser.add_argument("--topic", type=str, required=True)
parser.add_argument("--message", type=str, required=True)

arguments = parser.parse_args()

producer = KafkaProducer(bootstrap_servers=["localhost:29092"])
future = producer.send(arguments.topic, arguments.message.encode())
future.get(timeout=3)
