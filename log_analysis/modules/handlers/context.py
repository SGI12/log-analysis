class Subscriber:
    def __init__(self):
        self.host = None
        self.port = None

class Context:
    """
    Контекст обработчиков
    """

    def __init__(self):
        """
        Конструктор
        """

        self.pipe_manager = None
        self.pipeline_manager = None
        self.subscribers = {}
