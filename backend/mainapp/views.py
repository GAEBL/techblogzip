from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.db.models import Q, Count

from .models import *
from .serializers import *

from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

import math


@api_view(['GET'])
@permission_classes([AllowAny, ])
def posts(request):
    # request.GET == request.query_params
    company = request.query_params.get('company')  # ex) 삼성SDS
    sort = request.query_params.get('sort')
    page = request.query_params.get('page')

    try:
        company_id = get_object_or_404(Company, name=company)
        company_id = company_id.id
    except:
        company_id = 0

    if sort == 'likes':
        if company_id == 0:
            posts = Post.objects.annotate(like_count=Count(
                'is_liked')).order_by('-like_count', '-date')
        else:
            posts = posts.annotate(like_count=Count(
                'is_liked')).filter(company=company_id).order_by('-like_count', '-date')
    elif sort == 'user_recommendation':  # IsAuthenticated
        pass
    else:
        if company_id == 0:
            posts = Post.objects.all()
        else:
            posts = Post.objects.filter(company=company_id)

    post_count = posts.count() / 10
    lastPage = math.ceil(post_count)
    paginator = PageNumberPagination()
    results = paginator.paginate_queryset(posts, request)
    serializer = PostSerializer(results, many=True)
    return JsonResponse({'lastPage': lastPage, 'data': serializer.data})


@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def like(request, id):
    posts = get_object_or_404(Post, id=id)
    user = request.user
    if user not in posts.is_liked.all():
        posts.is_liked.add(user)
        on_like = True
    else:
        posts.is_liked.remove(user)
        on_like = False
    return JsonResponse({'id':id, 'result': 'true', 'count_like': posts.is_liked.all().count(), 'on_like': on_like})


@api_view(['GET'])
@permission_classes([AllowAny, ])
def company(request, id):  # 기업 블로그
    company = get_object_or_404(Company, id=id)
    serializer = CompanySerializer(company)
    return JsonResponse({'data': serializer.data})


@api_view(['GET'])
@permission_classes([AllowAny, ])
def search(request):
    company = request.query_params.get('company')
    query = request.query_params.get('query')

    try:
        company_id = get_object_or_404(Company, name=company).id
        posts = Post.objects.filter(company=company_id)
    except:
        posts = Post.objects.all()

    if query:
        posts = posts.filter(
            Q(title__icontains=query) | Q(tags__name__icontains=query)).distinct()

        post_count = posts.count() / 10
        lastPage = math.ceil(post_count)
        paginator = PageNumberPagination()
        results = paginator.paginate_queryset(posts, request)
        serializer = PostSerializer(results, many=True)
        return JsonResponse({'result': 'true', 'lastPage': lastPage, 'data': serializer.data})
    return JsonResponse({'result': 'false'})


@api_view(['GET'])
@permission_classes([AllowAny, ])
def main(request):
    company_count = Company.objects.all().count()
    posts_count = Post.objects.all().count()
    posts = Post.objects.all()[:5]
    serializer = MainPostSerializer(posts, many=True)
    return JsonResponse({'company_count': company_count,
                         'posts_count': posts_count, 'data': serializer.data})


@api_view(['POST'])
@permission_classes([AllowAny, ])
def trend(request):
    company = request.data.get('company')
    start_date = request.data.get('start_date')
    end_date = request.data.get('end_date')
    # target_data = request.data.get('target_data')
    tag_count = request.data.get('tag_count')

    try:
        company_id = get_object_or_404(Company, name=company).id
        posts = Post.objects.annotate(tags_count=Count(
            'tags')).filter(company=company_id, date__range=[start_date, end_date], tags_count__range=[0, tag_count])
    except:
        company_id = 0
        posts = Post.objects.annotate(tags_count=Count(
            'tags')).filter(date__range=[start_date, end_date], tags_count__range=[0, tag_count])

    post_count = posts.count() / 10
    lastPage = math.ceil(post_count)
    paginator = PageNumberPagination()
    results = paginator.paginate_queryset(posts, request)
    serializer = PostSerializer(results, many=True)
    return JsonResponse({'lastPage': lastPage, 'company': company, 'data': serializer.data})


@api_view(['POST'])
@permission_classes([AllowAny, ])
def sort_tag(request):  # posts 업데이트 전
    company = request.data.get('company')

    try:
        company_id = get_object_or_404(Company, name=company).id
        posts = Post.objects.filter(company=company_id)
    except:
        company_id = 0
        posts = Post.objects.all()

    tag_dict = {}
    if posts.exists():
        for post in posts.iterator():
            tags = post.tags
            if tags.exists():
                for tag in tags.values():
                    tag_id = tag['name']  # id, name
                    if tag_id in tag_dict:
                        tag_dict[tag_id] += 1
                    else:
                        tag_dict[tag_id] = 1

    tag_dict = sorted(tag_dict.items(), key=lambda x: x[1], reverse=True)
    return JsonResponse({'company': company, 'data': tag_dict})
