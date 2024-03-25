import signal
import kafka
import kafka.errors
import multiprocessing.pool

class Config:
    def __init__(self, topic, server, pool_size, pool_cache_limit):
        self.topic = topic
        self.server = server
        self.pool_size = pool_size
        self.pool_cache_limit = pool_cache_limit

class LimitedMultiprocessingPool(multiprocessing.pool.Pool):
    def getPoolCacheSize(self):
        return len(self._cache)

class Consumer:
    def __init__(self, config: Config, callback):
        self.callback = callback
        self.consumer = kafka.KafkaConsumer(
            config.topic,
            bootstrap_servers=[config.server],
        )

        self.should_stop = False
        self.pool_cache_limit = config.pool_cache_limit
        self.pool = LimitedMultiprocessingPool(processes=config.pool_size)
        signal.signal(signal.SIGTERM, self.stop)

    def handlePoolCacheExcess(self):
        while self.pool.getPoolCacheSize() >= self.pool_cache_limit:
            pass

    def run(self, context):
        print("consumer is running")

        while not self.should_stop:
            for message in self.consumer:
                if self.should_stop:
                    break

                self.callback(context, message.value.decode())

    def stop(self):
        self.should_stop = True
