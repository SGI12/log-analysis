class NgramInfo:
    def __init__(self, id):
        self.id = id
        self.frequency = 1

class NgramsDictionary:
    def __init__(self, ngram_size):
        self.ngrams = {}
        self.ngram_size = ngram_size
        self.last_id = 0

    def update(self, words):
        for last_word_index in range(self.ngram_size, len(words) + 1):
            ngram = ""
            for current_word_index in range(0, self.ngram_size):
                ngram += words[last_word_index - self.ngram_size + current_word_index] + " "

            self.addNgram(ngram[:-1])

    def addNgram(self, ngram):
        if ngram in self.ngrams:
            self.ngrams[ngram].frequency += 1
        else:
            word_info = NgramInfo(self.last_id)
            self.last_id += 1
            self.ngrams[ngram] = word_info
