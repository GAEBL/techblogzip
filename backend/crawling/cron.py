from crawling.crawlers import naver_crawler, kakao_crawler, toast_crawler, woowabros_crawler, line_crawler, coupang_crawler, spoqa_crawler, yanolja_crawler, samsung_crawler
from mainapp.models import Company, Post, Tag
from techblog.settings import BASE_DIR
from crawling.textrank.textrank import TextRank
from datetime import datetime
from tqdm import tqdm
import pickle
import json
import re
import os

# set BASE_DIR
BASE_DIR = BASE_DIR.replace('\\', '/')


# set companies` blog site list
with open(BASE_DIR + '/crawling/data/techblog_list.json', 'r', encoding='utf-8') as f:
    companies = json.load(f)


# set passwords
passwords = []
with open(BASE_DIR + '/trend/data/backend.pickle', 'rb') as f:
    passwords += pickle.load(f)

with open(BASE_DIR + '/trend/data/frontend.pickle', 'rb') as f:
    passwords += pickle.load(f)

with open(BASE_DIR + '/trend/data/language.pickle', 'rb') as f:
    passwords += pickle.load(f)

with open(BASE_DIR + '/trend/data/lib.pickle', 'rb') as f:
    passwords += pickle.load(f)


# function for read only alphabets, numbers and hangeuls
def remove_others(text):
    return re.sub(r'[^A-Za-z0-9ㄱ-힣%\-\'\[{()}\]]', r' ', text)


# patch tags to post
def add_tags():
    global BASE_DIR, passwords

    # find un patched posts
    posts = Post.objects.filter(is_taged=0)

    words = []
    for post in tqdm(posts):
        # find keywords with textrank system
        textrank = TextRank(remove_others(post.contents))
        keywords = textrank.keywords(-1)
        tags = [
            word for word in keywords if word in passwords]
        words.append(tags.copy())

        # patch most important 12 tags
        for word in tags[:12]:
            tag = Tag.objects.get_or_create(name=word)[0]
            post.tags.add(tag)
        post.is_taged = True
        post.save()

    if 'new_words.pkl' in os.listdir(BASE_DIR + '/crawling/data/'):
        with open(BASE_DIR + '/crawling/data/new_words.pkl', 'rb') as f:
            old_words = pickle.load(f)
        words += old_words

    # save all keywords as pickle
    with open(BASE_DIR + '/crawling/data/new_words.pkl', 'wb') as f:
        pickle.dump(words, f)


# crawling companies` blog
def crawling():
    global BASE_DIR, companies

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

    add_tags()
