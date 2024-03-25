from enum import Enum

class DataType(Enum):
    """
    Перечисление типов данных пайпы
    """

    String = 0, # Строка
    StringArray = 1, # Массив строк
    IntegerArray = 2 # Массив целых чисел

    def __cmp__(self, other):
        return self.value == other.value

def ToString(data_type) -> str:
    """
    Преобразование типа данных к строковому представлению
    :param data_type: Тип данных
    :return: Строка
    """

    if data_type == DataType.String:
        return "string"
    elif data_type == DataType.StringArray:
        return "string array"
    elif data_type == DataType.IntegerArray:
        return "integer array"

class PipeBase:
    """
    Базовый класс пайпы
    """

    def __init__(self, name, input_data_type, output_data_type):
        """
        Конструктор
        :param name: Название пайпы
        :param input_data_type: Тип входных данных
        :param output_data_type: Тип выходных данных
        """

        self.name = name
        self.description = ""
        self.input_data_type = input_data_type
        self.output_data_type = output_data_type

    def do(self, data):
        """
        Вызов обработки данных
        :param data: Данные
        :return: Обработанные данные
        """

        raise Exception("calling unimplemented method")
