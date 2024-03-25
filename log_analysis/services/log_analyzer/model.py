from transformers import AutoTokenizer, AutoModel, AutoConfig
import torch
import torch.nn.functional as F
import pickle
import numpy
import pandas as pd

class LogAnalyzer:
    '''Сlass of an expert system module that analyzes diagnostic information
    about the operation of the input-output subsystem.
    '''

    def __init__(self, path_model_embedding: str, path_tokenizer: str):
        '''Constructor of model for analyse.
        :param path_model_embedding: String of path to directory with model
        for build embeddings of message
        :param path_tokenizer: String of path to directory with tokenizer
        for tokenize message
        '''
        self.tokenizer = AutoTokenizer.from_pretrained(path_tokenizer)
        self.model_embedding = AutoModel.from_pretrained(path_model_embedding)
        self.model = None

    def predict(self, program: str, message: str) -> numpy.ndarray:
        '''Function predict whether an log is anomaly.
        :param message: string of message
        '''

        def mean_pooling(model_output, attention_mask) -> torch.Tensor:
            '''Function applies mean pooling on the embedding model to get
            a single vector representation.
            :param model_output: Tuple containing different model outputs.
            The first element contains the token embeddings.
            :param attention_mask: Tensor that identifies the tokens
            to which attention should be paid (value of 1)
            versus those which should not (value of 0).
            :return: Tensor representing the pooled output of the input tokens.
            '''
            token_embeddings = model_output[0]
            input_mask_expanded = attention_mask.unsqueeze(-1).expand(
                token_embeddings.size()).float()
            return torch.sum(
                token_embeddings * input_mask_expanded, 1) / torch.clamp(
                input_mask_expanded.sum(1), min=1e-9)

        def embed(message: str, tokenizer, model) -> torch.Tensor:
            '''Function generates embeddings for a given message.
            :param message: String of message for which embeddings
            are to be generated.
            :param tokenizer: The tokenizer to be used for tokenizing
            the message.
            :param model: The model to be used for generating embeddings.
            :return: Tensor of normalized embeddings of the input message.
            '''
            encoded_input = tokenizer(
                message, padding=True, truncation=True, return_tensors='pt')

            with torch.no_grad():
                model_output = model(**encoded_input)

            message_embeddings_mean = mean_pooling(
                model_output, encoded_input['attention_mask'])
            message_embeddings = F.normalize(
                message_embeddings_mean, p=2, dim=1)
            return message_embeddings

        if self.model is None:
            raise ValueError("Model is not fitted. Make '.fit' method first")
            return None

        message_embeddings = embed(
            message, self.tokenizer, self.model_embedding)

        try:
            prediction = self.model[program].predict(
                message_embeddings.numpy())
        except KeyError:
            prediction = self.model['unknown'].predict(
                message_embeddings.numpy())
        return prediction

    def fit(self, path_model):
        '''Function predict whether an log is anomaly.
        :param path_model: String of path to saved model
        '''
        self.model = pickle.load(open(path_model, 'rb'))
