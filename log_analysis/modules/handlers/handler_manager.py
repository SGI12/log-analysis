class HandlerManager:
    def __init__(self):
        self.handlers = {}

    def add(self, handler):
        name = handler.name
        if self.contains(name):
            raise Exception("Handler with name '" + name + "' already exists")

        self.handlers[name] = handler

    def get(self, name):
        if not self.contains(name):
            raise Exception("There is no handler with name '" + name + "'")

        return self.handlers[name]

    def contains(self, name):
        return name in self.handlers