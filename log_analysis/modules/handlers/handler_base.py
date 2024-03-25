from modules.handlers.context import Context

def CheckParameters(parameters, required_keys):
    for key in required_keys:
        if key not in parameters:
            raise Exception(f"there is no key '{key}' in parameters")

class HandlerBase:
    def __init__(self, name):
        self.name = name

    def do(self, context: Context, parameters: dict):
        pass
