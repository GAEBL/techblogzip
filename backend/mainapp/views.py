from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response
from django.db.models import Q, F, Sum, Count, Case, When
from .models import *
from .serializers import *
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.settings import api_settings


@api_view(['POST'])
@permission_classes([AllowAny, ])
def posts(request):
    request.data.get()
    company = request.POST['company']  # ex) 삼성SDS
    sort = request.POST['sort']
    try:
        company_id = Company.objects.get_object_or_404(name=company)
        company_id = company_id.id
    except:
        company_id = 0

    if sort == 'likes':
        if company_id == 0:
            posts = Post.objects.annotate(like_count=Count(
                'is_liked')).order_by('-like_count', '-date')
        else:
            posts = Post.objects.filter(company=company_id)
            posts = posts.annotate(like_count=Count(
                'is_liked')).order_by('-like_count', '-date')
    elif sort == 'user_recommendation':  # IsAuthenticated
        pass
    else:
        if company_id == 0:
            posts = Post.objects.all()
        else:
            posts = Post.objects.filter(company=company_id)
    serializer = PostSerializer(posts, many=True)
    return JsonResponse({'data': serializer.data})


@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def like(request, id):
    posts = Post.objects.get(id=id)
    user = request.user
    if user not in posts.is_liked.all():
        posts.is_liked.add(user)
        on_like = True
    else:
        posts.is_liked.remove(user)
        on_like = False
    return JsonResponse({'result': 'true', 'count_like': posts.is_liked.all().count(), 'on_like': on_like})


@api_view(['GET'])
@permission_classes([AllowAny, ])
def company(request, id):  # 기업 블로그
    company = Company.objects.get(id=id)
    serializer = CompanySerializer(company)
    return JsonResponse({'data': serializer.data})


@api_view(['POST'])
@permission_classes([AllowAny, ])
def search(request):
    posts = Post.objects.all()
    query = request.POST['query']
    if query:
        posts = posts.filter(
            Q(title__icontains=query) | Q(tags__name__icontains=query)).distinct()
        serializer = PostSerializer(posts, many=True)
        return JsonResponse({'result': 'true', 'data': serializer.data})
    return JsonResponse({'result': 'false'})


@api_view(['GET'])
@permission_classes([AllowAny, ])
def main(request):
    samsung = Company.objects.get(name='SAMSUNG SDS')
    yanolja = Company.objects.get(name='YANOLJA')
    spoqa = Company.objects.get(name='SPOQA')
    tmon = Company.objects.get(name='TMON DEV')
    coupang = Company.objects.get(name='COUPANG TECH')
    line = Company.objects.get(name='LINE ENGINEERING')
    woowabro = Company.objects.get(name='WOOWABROS')
    toast = Company.objects.get(name='TOAST')
    kakao = Company.objects.get(name='KAKAO TECH')
    naver = Company.objects.get(name='NAVER D2')

    samsung_posts_count = Post.objects.filter(company=samsung).count()
    yanolja_posts_count = Post.objects.filter(company=yanolja).count()
    spoqa_posts_count = Post.objects.filter(company=spoqa).count()
    tmon_posts_count = Post.objects.filter(company=tmon).count()
    coupang_posts_count = Post.objects.filter(company=coupang).count()
    line_posts_count = Post.objects.filter(company=line).count()
    woowabro_posts_count = Post.objects.filter(company=woowabro).count()
    toast_posts_count = Post.objects.filter(company=toast).count()
    kakao_posts_count = Post.objects.filter(company=kakao).count()
    naver_posts_count = Post.objects.filter(company=naver).count()

    company_post_count = [samsung_posts_count, yanolja_posts_count, spoqa_posts_count, tmon_posts_count,
                          coupang_posts_count, line_posts_count, woowabro_posts_count,
                          toast_posts_count, kakao_posts_count, naver_posts_count]

    company_count = Company.objects.count()
    posts_count = Post.objects.count()
    posts = Post.objects.all()[:5]
    serializer = MainPostSerializer(posts, many=True)
    return JsonResponse({'company_count': company_count,
                         'posts_count': posts_count, 'company_post_count': company_post_count, 'data': serializer.data})
