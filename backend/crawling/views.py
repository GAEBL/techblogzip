# 주의: 임시로 request를 활용하여 crawling하는 과정이며 모두 완성된 경우 crontab으로 자동 crawling 제작 예정
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from .crawlers import naver_crawler, kakao_crawler, toast_crawler, woowabros_crawler, line_crawler, coupang_crawler, spoqa_crawler, yanolja_crawler, samsung_crawler
from mainapp.models import Company, Post, Tag
from crawling.textrank.textrank import TextRank
from tqdm import tqdm
import pandas as pd
import pickle
import nltk
import json
import re

with open('./crawling/datas/techblog_list.json', 'r', encoding='utf-8') as f:
    companies = json.load(f)

with open('./crawling/datas/korean_stopwords.pkl', 'rb') as f:
    korean_stopwords = pickle.load(f)

try:
    english_stopwords = nltk.corpus.stopwords.words('english')
except:
    nltk.download('stopwords')
    english_stopwords = nltk.corpus.stopwords.words('english')


def remove_others(text):
    return re.sub(r'[^A-Za-z0-9ㄱ-힣%\-\'\[{()}\]]', r' ', text)


@api_view(['GET'])
@permission_classes([IsAdminUser, ])
@authentication_classes([JSONWebTokenAuthentication, ])
def crawling(request):
    global companies

    crawlers = [
        naver_crawler, kakao_crawler, toast_crawler,
        woowabros_crawler, line_crawler, coupang_crawler,
        spoqa_crawler, yanolja_crawler, samsung_crawler
    ]

    data = []
    for crawler, company in zip(crawlers, companies):
        data.append(crawler.get_posts(companies.get(company)).copy())

    sucess, error = 0, 0
    for msg in data:
        if msg.get('status') == 200:
            sucess += 1
        else:
            error += 1

    if sucess == len(data):
        return JsonResponse({'status': 200, 'result': data})
    else:
        return JsonResponse({'status': 500, 'result': data})


@api_view(['GET'])
@permission_classes([IsAdminUser, ])
@authentication_classes([JSONWebTokenAuthentication, ])
def add_tags(request):
    posts = Post.objects.filter(is_taged=1)
    for post in posts:
        post.is_taged = False
        post.save()

    posts = Post.objects.filter(is_taged=0)
    for post in tqdm(posts):
        textrank = TextRank(remove_others(post.contents))
        keywords = textrank.keywords(12)
        passwords = [
            word for word in keywords if word not in korean_stopwords and word not in english_stopwords]
        for word in passwords:
            tag = Tag.objects.get_or_create(name=word)[0]
            post.tags.add(tag)
        post.is_taged = True
        post.save()

    return JsonResponse({'status': 200})


@api_view(['GET'])
@permission_classes([AllowAny, ])
def check(request):
    posts = Post.objects.filter(
        company__name=request.query_params.get('company'))
    cnt = 0
    for post in posts:
        if len(Post.objects.filter(title=post.title)) > 1:
            cnt += 1
    return JsonResponse({'count': cnt})
