from sklearn.feature_extraction.text import CountVectorizer
from nltk.tokenize import TreebankWordTokenizer
from sklearn.preprocessing import normalize
from decouple import Config, RepositoryEnv
from konlpy.tag import Kkma
from time import sleep
import numpy as np
import requests
import json
import os


class ETRI(object):
    def __init__(self, n=0):
        self.path = os.getcwd().replace('\\', '/') + '/crawling/data/api.env'
        self.config = Config(RepositoryEnv(self.path))

        self.n = n
        self.headers = {'Content-Type': 'application/json; charset=UTF-8'}
        self.analysis_code = 'morp'
        self.url = 'http://aiopen.etri.re.kr:8000/WiseNLU'
        self.access_key = self.config.get(f'ETRI_KEY_{n}')


class SentenceTokenizer(object):
    def __init__(self):
        self.kkma = Kkma()
        self.etri = ETRI()
        self.sentences = []

    def text2sentences(self, text):
        sentences = self.kkma.sentences(text)
        for idx in range(len(sentences)):
            if len(sentences[idx]) < 10:
                sentences[idx - 1] += ' ' + sentences[idx]
                sentences[idx] = ''
        return sentences

    def get_nouns(self, text):
        nouns = []

        while True:
            sleep(3)

            response = requests.post(
                url=self.etri.url,
                headers=self.etri.headers,
                data=json.dumps({
                    'access_key': self.etri.access_key,
                    'argument': {
                        'analysis_code': self.etri.analysis_code,
                        'text': text
                    }
                })
            )

            code = response.status_code
            if code == 200:
                response = response.json()
                if response.get('result') == -1:
                    self.etri.n += 1
                    self.etri.access_key = self.etri.config.get(
                        f'ETRI_KEY_{(self.etri.n) % 4}')
                else:
                    break

            if code == 413:
                if not self.sentences:
                    self.sentences = self.text2sentences(text)
                else:
                    self.sentences = self.sentences[
                        :int(len(self.sentences) * 0.9)]
                text = ' '.join(self.sentences)
            elif code == 429:
                sleep(30)

        if response.get('return_object') != None:
            sentence = response.get('return_object').get('sentence')[0]
            if sentence:
                morps = sentence.get('morp')
                for morp in morps:
                    if morp.get('type') in ['SL', 'NNG', 'NNP']:
                        if morp.get('type') == 'SL':
                            nouns += TreebankWordTokenizer().tokenize(morp.get('lemma'))
                        else:
                            nouns.append(morp.get('lemma'))

        return nouns


class GraphMatrix(object):
    def __init__(self):
        self.cnt_vec = CountVectorizer()

    def build_words_graph(self, words):
        cnt_vec_mat = normalize(
            self.cnt_vec.fit_transform(words).toarray().astype(float), axis=0)
        vocab = self.cnt_vec.vocabulary_
        return np.dot(cnt_vec_mat.T, cnt_vec_mat), {vocab[word]: word for word in vocab}


class Rank(object):
    def get_ranks(self, graph, d=0.85):
        A = graph
        matrix_size = A.shape[0]
        for idx in range(matrix_size):
            A[idx, idx] = 0
            link_sum = np.sum(A[:, idx])
            if link_sum != 0:
                A[:, idx] /= link_sum
            A[:, idx] *= -d
            A[idx, idx] = 1

        B = (1 - d) * np.ones((matrix_size, 1))
        ranks = np.linalg.solve(A, B)
        return {idx: r[0] for idx, r in enumerate(ranks)}


class TextRank(object):
    def __init__(self, text):
        self.sent_tokenizer = SentenceTokenizer()
        self.nouns = self.sent_tokenizer.get_nouns(text)

        self.graph_matrix = GraphMatrix()
        self.words_graph, self.idx_word = self.graph_matrix.build_words_graph(
            self.nouns)

        self.rank = Rank()
        self.word_rank_idx = self.rank.get_ranks(self.words_graph)
        self.sorted_word_rank_idx = sorted(
            self.word_rank_idx, key=lambda k: self.word_rank_idx[k], reverse=True)

    def keywords(self, word_num=10):
        rank = Rank()
        rank_idx = rank.get_ranks(self.words_graph)
        sorted_rank_idx = sorted(
            rank_idx, key=lambda k: rank_idx[k], reverse=True)

        keywords, index = [], []
        for idx in sorted_rank_idx[:word_num]:
            index.append(idx)

        index.sort()
        for idx in index:
            keywords.append(self.idx_word[idx])

        return keywords
