class Constants:
    whitespace = r"\s*"
    unknown_begin_part = r"<(\d{1,2})>"
    month = r"([A-Za-z]{3})"
    number = r"(\d+)"
    time = r"(\d{2}:\d{2}:\d{2})"
    word = r"(\S+)"
    anything = r"(.*)"

class Pattern:
    def __int__(self):
        self.parts = []

    def __str__(self):
        result = ""

        for part in self.parts:
            result += part[0] + Constants.whitespace

        return result
