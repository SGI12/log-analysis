import numpy
import pandas
from collections import defaultdict

def BuildBigramDictionary(corpus: list):
    bigrams = []
    vocabulary = []
    count_matrix_dictionary = defaultdict(dict)

    for i in range(len(corpus) - 3 + 1):
        trigram = tuple(corpus[i:i + 3])

        bigram = trigram[0:-1]
        if bigram not in bigrams:
            bigrams.append(bigram)

        last_word = trigram[-1]
        if last_word not in vocabulary:
            vocabulary.append(last_word)

        if (bigram, last_word) not in count_matrix_dictionary:
            count_matrix_dictionary[bigram, last_word] = 0

        count_matrix_dictionary[bigram, last_word] += 1

    count_matrix = numpy.zeros((len(bigrams), len(vocabulary)))
    for trigram_key, trigram_count in count_matrix_dictionary.items():
        count_matrix[bigrams.index(trigram_key[0]), vocabulary.index(trigram_key[1])] = trigram_count

    count_matrix = pandas.DataFrame(count_matrix, index=bigrams, columns=vocabulary)
    return count_matrix

class BigramDictionary:
    def __init__(self, corpus: list):
        self.count_matrix = BuildBigramDictionary(corpus)
        self.probability_matrix = self.count_matrix.div(self.count_matrix.sum(axis="columns"), axis="rows")

    def score(self, line: list) -> float:
        result = 0.0

        for i in range(len(line) - 3 + 1):
            trigram = tuple(line[i:i + 3])

            bigram = trigram[:-1]
            last_word = trigram[-1]
            if last_word in self.probability_matrix and bigram in self.probability_matrix[last_word]:
                result += self.probability_matrix[last_word][bigram]

        return result
