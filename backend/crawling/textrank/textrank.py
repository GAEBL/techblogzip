from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.preprocessing import normalize
from konlpy.tag import Kkma, Okt
import numpy as np


class SentenceTokenizer(object):
    def __init__(self):
        self.kkma = Kkma()
        self.okt = Okt()
        self.stopwords = []

    def add_stopwords(self, word):
        if word is not '':
            self.stopwords.append(word)

    def text2sentences(self, text):
        sentences = self.kkma.sentences(text)
        for idx in range(len(sentences)):
            if len(sentences[idx]) < 10:
                sentences[idx - 1] += ' ' + sentences[idx]
                sentences[idx] = ''
        return sentences

    def get_nouns(self, sentences):
        nouns = []
        for sentence in sentences:
            if sentence is not '':
                temp = []
                for noun in self.okt.nouns(sentence):
                    if noun not in self.stopwords and len(noun) > 1:
                        temp.append(noun)
                nouns.append(' '.join(temp))
        return nouns


class GraphMatrix(object):
    def __init__(self):
        self.tfidf = TfidfVectorizer()
        self.cnt_vec = CountVectorizer()
        self.graph_sentence = []

    def build_sent_graph(self, sentence):
        tfidf_mat = self.tfidf.fit_transform(sentence).toarray()
        self.graph_sentence = np.dot(tfidf_mat, tfidf_mat.T)
        return self.graph_sentence

    def build_words_graph(self, sentence):
        cnt_vec_mat = normalize(
            self.cnt_vec.fit_transform(sentence).toarray().astype(float), axis=0)
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
        self.sentences = self.sent_tokenizer.text2sentences(text)
        self.nouns = self.sent_tokenizer.get_nouns(self.sentences)

        self.graph_matrix = GraphMatrix()
        self.sent_graph = self.graph_matrix.build_sent_graph(self.nouns)
        self.words_graph, self.idx_word = self.graph_matrix.build_words_graph(
            self.nouns)

        self.rank = Rank()
        self.sent_rank_idx = self.rank.get_ranks(self.sent_graph)
        self.sorted_sent_rank_idx = sorted(
            self.sent_rank_idx, key=lambda k: self.sent_rank_idx[k], reverse=True)

        self.word_rank_idx = self.rank.get_ranks(self.words_graph)
        self.sorted_word_rank_idx = sorted(
            self.word_rank_idx, key=lambda k: self.word_rank_idx[k], reverse=True)

    def summarize(self, sent_num=3):
        summary, index = [], []
        for idx in self.sorted_sent_rank_idx[:sent_num]:
            index.append(idx)

        index.sort()
        for idx in index:
            summary.append(self.sentences[idx])

        return summary

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
