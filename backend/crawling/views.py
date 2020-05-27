# 주의: 임시로 request를 활용하여 crawling하는 과정이며 모두 완성된 경우 crontab으로 자동 crawling 제작 예정
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from .crawlers import naver_crawler, kakao_crawler, toast_crawler, woowabros_crawler, line_crawler, coupang_crawler, spoqa_crawler, yanolja_crawler, samsung_crawler
from mainapp.models import Company, Post, Tag
from crawling.textrank.textrank import TextRank
from .crawlers.config import SUCESS_MESSAGE, ERROR_MESSAGE
import pandas as pd
import json
import re

with open('./crawling/datas/techblog_list.json', 'r', encoding='utf-8') as f:
    companies = json.load(f)


def remove_emoji(text):
    remover = re.compile('[\U00010000-\U0010ffff]', flags=re.UNICODE)
    return remover.sub(r'', text)


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
        data.append(crawler.get_posts(companies.get(company)))

    sucess, error = 0, 0
    for msg in data:
        if msg.get('status') is 200:
            sucess += 1
        else:
            error += 1

    if sucess is len(data):
        return JsonResponse(SUCESS_MESSAGE)
    else:
        return JsonResponse(ERROR_MESSAGE)


@api_view(['GET'])
@permission_classes([IsAdminUser, ])
@authentication_classes([JSONWebTokenAuthentication, ])
def add_tags(request):
    posts = Post.objects.filter(is_taged=0)
    for post in posts:
        textrank = TextRank(remove_emoji(post.contents))
        keywords = textrank.keywords(20)
        for word in keywords:
            tag = Tag.objects.get_or_create(name=word)[0]
            post.tags.add(tag)
        post.is_taged = True
        post.save()
    return JsonResponse({'status': 200})


@api_view(['GET'])
@permission_classes([AllowAny])
def check(request):
    posts = Post.objects.filter(
        company__name=request.query_params.get('company'))
    cnt = 0
    for post in posts:
        if len(Post.objects.filter(title=post.title)) > 1:
            cnt += 1
    return JsonResponse({'count': cnt})
