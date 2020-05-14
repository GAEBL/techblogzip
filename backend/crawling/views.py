# 주의: 임시로 request를 활용하여 crawling하는 과정이며 모두 완성된 경우 crontab으로 자동 crawling 제작 예정
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .crawlers import naver_crawler, kakao_crawler
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
        if company == '네이버':
            data = naver_crawler.get_posts(url)
        elif company == '카카오':
            data = kakao_crawler.get_posts(url)
        elif company == 'TOAST':
            pass
        elif company == '우아한형제들':
            pass
        elif company == 'LINE':
            pass
        elif company == '쿠팡':
            pass
        elif company == '티몬':
            pass
        elif company == 'spoqa':
            pass
        elif company == '야놀자':
            pass
        elif company == '삼성SDS':
            pass
        return JsonResponse(data)

    return HttpResponse(status=400)
