# 주의: 임시로 request를 활용하여 crawling하는 과정이며 모두 완성된 경우 crontab으로 자동 crawling 제작 예정
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .crawlers import naver_crawler, kakao_crawler, toast_crawler, woowabros_crawler, line_crawler, coupang_crawler, spoqa_crawler, yanolja_crawler, samsung_crawler
from mainapp.models import Company, Post, Tag
from crawling.textrank.textrank import TextRank
import pandas as pd
import json
import re

with open('./crawling/datas/techblog_list.json', 'r', encoding='utf-8') as f:
    companies = json.load(f)


def remove_emoji(text):
    remover = re.compile('[\U00010000-\U0010ffff]', flags=re.UNICODE)
    return remover.sub(r'', text)


@api_view(['GET'])
@permission_classes([AllowAny, ])
def crawling(request):
    global companies

    company = request.GET.get('company')
    if company in companies.keys():
        data, url = {}, companies.get(company)
        if company == 'NAVER D2':
            data = naver_crawler.get_posts(url)
        elif company == 'KAKAO TECH':
            data = kakao_crawler.get_posts(url)
        elif company == 'TOAST':
            data = toast_crawler.get_posts(url)
        elif company == 'WOOWABROS':
            data = woowabros_crawler.get_posts(url)
        elif company == 'LINE ENGINEERING':
            data = line_crawler.get_posts(url)
        elif company == 'COUPANG TECH':
            data = coupang_crawler.get_posts(url)
        elif company == 'SPOQA':
            data = spoqa_crawler.get_posts(url)
        elif company == 'YANOLJA':
            data = yanolja_crawler.get_posts(url)
        elif company == 'SAMSUNG SDS':
            data = samsung_crawler.get_posts(url)
        return JsonResponse(data)

    return HttpResponse(status=400)


@api_view(['GET'])
@permission_classes([AllowAny, ])
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
