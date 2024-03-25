import argparse
from kafka import KafkaConsumer

parser = argparse.ArgumentParser()
parser.add_argument("--topic", type=str, required=True)

arguments = parser.parse_args()

consumer = KafkaConsumer(bootstrap_servers=["localhost:29092"])
consumer.subscribe(arguments.topic)

for message in consumer:
    print(message.value)
