# 주의: 임시로 request를 활용하여 crawling하는 과정이며 모두 완성된 경우 crontab으로 자동 crawling 제작 예정
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .crawlers import naver_crawler, kakao_crawler, toast_crawler, woowabros_crawler, line_crawler, coupang_crawler
import json

with open('./crawling/datas/techblog_list.json', 'r', encoding='utf-8') as f:
    companies = json.load(f)


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
            pass
        elif company == 'YANOLJA':
            pass
        elif company == 'SAMSUNG SDS':
            pass
        return JsonResponse(data)

    return HttpResponse(status=400)
