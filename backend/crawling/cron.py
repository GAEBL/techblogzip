from .crawlers import naver_crawler, kakao_crawler, toast_crawler, woowabros_crawler, line_crawler, coupang_crawler, spoqa_crawler, yanolja_crawler, samsung_crawler
from mainapp.models import Company, Post, Tag
from crawling.textrank.textrank import TextRank
from datetime import datetime
import pickle
import nltk
import json
import re
import os


# set log file path
LOG_PATH = os.getcwd().replace('\\', '/') + '/crawling/logs/'


# set companies` blog site list
with open('./crawling/data/techblog_list.json', 'r', encoding='utf-8') as f:
    companies = json.load(f)


# set stopwords
with open('./crawling/data/korean_stopwords.pkl', 'rb') as f:
    korean_stopwords = pickle.load(f)

try:
    english_stopwords = nltk.corpus.stopwords.words('english')
except:
    nltk.download('stopwords')
    english_stopwords = nltk.corpus.stopwords.words('english')


# function for read only alphabets, numbers and hangeuls
def remove_others(text):
    return re.sub(r'[^A-Za-z0-9ㄱ-힣%\-\'\[{()}\]]', r' ', text)


# patch tags to post
def add_tags():
    # find un patched posts
    posts = Post.objects.filter(is_taged=0)

    words = []
    for post in posts:
        # find keywords with textrank system
        textrank = TextRank(remove_others(post.contents))
        keywords = textrank.keywords(-1)
        passwords = [
            word for word in keywords if word not in korean_stopwords and word not in english_stopwords]
        words.append(passwords.copy())

        # patch most important 12 tags
        for word in passwords[:12]:
            tag = Tag.objects.get_or_create(name=word)[0]
            post.tags.add(tag)
        post.is_taged = True
        post.save()

    # save all keywords as pickle
    with open('./recommend/data/new_words.pkl', 'wb') as f:
        pickle.dump(words, f)

    # write tag patch log
    with open(LOG_PATH + f'/{datetime.today()}_add_tags.log', 'w', encoding='utf-8') as f:
        f.write(
            f'{datetime.today()}: ADD TAGS TO {len(posts)}')


# crawling companies` blog
def crawling():
    global companies

    # crawler list
    crawlers = [
        naver_crawler, kakao_crawler, toast_crawler,
        woowabros_crawler, line_crawler, coupang_crawler,
        spoqa_crawler, yanolja_crawler, samsung_crawler
    ]

    # crawling
    data = []
    for crawler, company in zip(crawlers, companies):
        data.append(crawler.get_posts(companies.get(company)).copy())

    # count sucess and fail log
    sucess, error = 0, 0
    for msg in data:
        if msg.get('status') == 200:
            sucess += 1
        else:
            error += 1

    # patch tags and write crawling log
    add_tags()
    with open(LOG_PATH + f'/{datetime.today()}_crawling.log', 'w', encoding='utf-8') as f:
        f.write(
            f'{datetime.today()}: SUCESS: {sucess}/{len(data)}, ERROR: {error}/{len(data)}')
