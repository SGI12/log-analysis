import string
import nltk

from modules.pipelines.pipes.pipe_base import *

class ToLowerCase(PipeBase):
    """
    Преобразует все символы в строке к нижнему регистру
    """

    def __init__(self):
        """
        Конструктор
        """

        super().__init__("to_lower_case", DataType.String, DataType.String)
        self.description = "converts all letters to lower case"

    def do(self, data):
        return data.lower()

class Strip(PipeBase):
    """
    Удаляет пробелы в начале и конце строки
    """

    def __init__(self):
        """
        Конструктор
        """

        super().__init__("strip", DataType.String, DataType.String)
        self.description = "removes any leading and trailing whitespaces"

    def do(self, data: str):
        return data.strip()

class Split(PipeBase):
    """
    Разбивает строку на токены через разделитель
    """

    def __init__(self, name, divider):
        """
        Конструктор
        :param name: Название пайпа
        :param divider: Разделитель
        """

        super().__init__(name, DataType.String, DataType.StringArray)
        self.description = "split string into tokens array by divider"
        self.divider = divider

    def do(self, data: str):
        return data.split(self.divider)

class SplitBySpace(Split):
    """
    Разбивает строку на токены через пробелы
    """

    def __init__(self):
        """
        Конструктор
        """

        super().__init__("split_by_space", " ")
        self.description = "split string into tokens array by space"

class Filter(PipeBase):
    """
    Фильтр, базовый класс. Удаляет токены, указанные в конструкторе
    """

    def __init__(self, name, tokens_to_remove):
        """
        Конструктор
        :param name: Название фильтра
        :param tokens_to_remove: Удаляемые токены
        """

        super().__init__(name, DataType.StringArray, DataType.StringArray)
        self.tokens_to_remove = tokens_to_remove

    def do(self, data):
        data = [token for token in data if not token in self.tokens_to_remove]
        return data

class RemovePunctuationMarks(Filter):
    """
    Фильтр. Удаляет знаки пунктуации
    """

    def __init__(self):
        """
        Конструктор
        """

        super().__init__("remove_punctuation_marks", [c for c in string.punctuation])
        self.description = "removes punctuation marks"

class RemoveStopWords(Filter):
    """
    Фильтр. Удаляет стоп-слова
    """

    def __init__(self):
        """
        Конструктор
        """

        super().__init__("remove_stop_words", set(nltk.corpus.stopwords.words("english")))
        self.description = "removes stop words, such as 'the', 'is' and etc"

class Stem(PipeBase):
    """
    Оставляет от каждого слова только корень
    """

    def __init__(self):
        """
        Конструктор
        """

        super().__init__("stem", DataType.StringArray, DataType.StringArray)
        self.description = "stem all words, like 'loving' become 'love'"

    def do(self, data):
        porter = nltk.stem.porter.PorterStemmer()
        data = [porter.stem(word) for word in data]
        return data
