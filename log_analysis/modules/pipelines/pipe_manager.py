class PipeManager:
    def __init__(self):
        self.pipes = {}

    def add(self, pipe):
        name = pipe.name
        if self.contains(name):
            raise Exception("Pipe with name '" + name + "' already exists")

        self.pipes[name] = pipe

    def get(self, name):
        if not self.contains(name):
            raise Exception("There is no pipe with name '" + name + "'")

        return self.pipes[name]

    def contains(self, name):
        return name in self.pipes
