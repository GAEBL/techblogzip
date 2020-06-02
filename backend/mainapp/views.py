from functools import reduce
import operator
from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.db.models import Q, Count

from .models import *
from .serializers import *

from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

import math
import json
from collections import Counter


def pagination(query, request):
    all_query_count = query.count()
    query_page = all_query_count / 10
    last_page = math.ceil(query_page)
    paginator = PageNumberPagination()
    results = paginator.paginate_queryset(query, request)
    return all_query_count, last_page, results


@api_view(['GET'])
@permission_classes([AllowAny, ])
def posts(request):
    # request.GET == request.query_params
    company = request.query_params.get('company')
    sort = request.query_params.get('sort')

    try:
        company_id = get_object_or_404(Company, name=company)
        company_id = company_id.id
    except:
        company_id = 0

    if sort == 'likes':
        if company_id == 0:
            posts = Post.objects.annotate(like_counts=Count(
                'is_liked')).order_by('-like_counts', '-date')
        else:
            posts = Post.objects.annotate(like_counts=Count(
                'is_liked')).filter(company=company_id).order_by('-like_counts', '-date')
    elif sort == 'user_recommendation':  # IsAuthenticated
        pass
    else:
        if company_id == 0:
            posts = Post.objects.all().order_by('-date')
        else:
            posts = Post.objects.filter(company=company_id).order_by('-date')

    all_query_count, last_page, results = pagination(posts, request)
    serializer = PostSerializer(
        results, context={'request': request}, many=True)

    mains = Post.objects.all().order_by('-date')[:5]
    main_serializer = PostSerializer(mains, many=True)

    return JsonResponse({'lastPage': last_page, 'resultNum': all_query_count, 'data': serializer.data, 'main': main_serializer.data})


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
    posts.like_count = posts.is_liked.all().count()
    posts.save()
    return JsonResponse({'id': id, 'result': 'true', 'count_like': posts.like_count, 'on_like': on_like})


@api_view(['GET'])
@permission_classes([AllowAny, ])
def company(request, id):
    company = get_object_or_404(Company, id=id)
    serializer = CompanySerializer(company)
    return JsonResponse({'data': serializer.data})


@api_view(['GET'])
@permission_classes([AllowAny, ])
def search(request):
    company = request.query_params.get('company')
    querys = request.query_params.get('query').replace(',', ' ').split()

    try:
        company_id = get_object_or_404(Company, name=company).id
        posts = Post.objects.filter(company=company_id)
    except:
        posts = Post.objects.all()

    if len(querys) > 0:
        for idx, query in enumerate(querys):
            if idx == 0:
                post_search = posts.filter(
                    Q(title__icontains=query) | Q(tags__name__icontains=query) | Q(company__name__icontains=query) | Q(contents__icontains=query)).distinct()
            else:
                post_multi_search = posts.filter(
                    Q(title__icontains=query) | Q(tags__name__icontains=query) | Q(company__name__icontains=query) | Q(contents__icontains=query)).distinct()
                post_search = post_search.union(post_multi_search)

        post_search = post_search.order_by('-date')

        all_query_count, last_page, results = pagination(post_search, request)
        serializer = PostSerializer(
            results, context={'request': request}, many=True)

        return JsonResponse({'result': 'true', 'lastPage': last_page, 'resultNum': all_query_count, 'data': serializer.data})
    return JsonResponse({'result': 'false'})


@api_view(['GET'])
@permission_classes([AllowAny, ])
def tag(request):
    tag = request.query_params.get('tag')

    posts = Post.objects.filter(Q(tags__name__icontains=tag)).order_by('-date')

    if len(posts) == 0:
        return HttpResponse(status=204)

    all_query_count, last_page, results = pagination(posts, request)
    serializer = PostSerializer(
        results, context={'request': request}, many=True)

    return JsonResponse({'lastPage': last_page, 'resultNum': all_query_count, 'data': serializer.data})


@api_view(['GET'])
@permission_classes([AllowAny, ])
def main(request):
    company_count = Company.objects.all().count()
    posts_count = Post.objects.all().count()
    posts = Post.objects.all().order_by('-date')[:5]
    serializer = MainPostSerializer(posts, many=True)
    return JsonResponse({'company_count': company_count,
                         'posts_count': posts_count, 'data': serializer.data})


@api_view(['GET'])
@permission_classes([AllowAny, ])
def trend(request):
    company = request.query_params.get('company')
    start_date = request.query_params.get('startdate')
    end_date = request.query_params.get('enddate')
    target_data = request.query_params.get('targetdata')  # backend

    language_tag = []
    lib_tag = []
    front_tag = ['사회', '과학']
    backend_tag = ['국어', '수학']

    if target_data == 'language':
        target_tag = language_tag
    elif target_data == 'lib':
        target_tag = lib_tag
    elif target_data == 'frontend':
        target_tag = frontend_tag
    elif target_data == 'backend':
        target_tag = backend_tag

    query = reduce(operator.or_, (Q(tags__name__icontains=target)
                                  for target in target_tag))

    try:
        company_id = get_object_or_404(Company, name=company).id
        posts = Post.objects.filter(query, company=company_id, date__range=[
                                    start_date, end_date]).order_by('-date')
    except:
        company_id = 0
        posts = Post.objects.filter(
            date__range=[start_date, end_date]).order_by('-date')

    tag_count = {}
    if posts.exists():
        for post in posts.iterator():
            tags = post.tags
            if tags.exists():
                for tag in tags.values():
                    tag_id = tag['name']  # id, name
                    if tag_id in tag_count:
                        tag_count[tag_id] += 1
                    else:
                        tag_count[tag_id] = 1
    else:
        return JsonResponse({'result': 'noData'})

    trend_dict = {}
    for key, val in tag_count.items():
        trend_dict['name'] = key
        trend_dict['value'] = val

    return JsonResponse({'data': tag_count})


@api_view(['GET'])
@permission_classes([AllowAny, ])
def sort_tag(request, id):  # 0: 업데이틍 전, 1: 업데이트 후
    company_name = request.query_params.get('company', None)

    try:
        company = get_object_or_404(Company, name=company_name)
        company_id = company.id
        posts = Post.objects.filter(company=company_id)

        tag_dict = company.tag_dict

        if id == 1:  # 업데이트 후
            tag_count = {}
            if posts.exists():
                for post in posts.iterator():
                    tags = post.tags
                    if tags.exists():
                        for tag in tags.values():
                            tag_id = tag['name']  # id, name
                            if tag_id in tag_count:
                                tag_count[tag_id] += 1
                            else:
                                tag_count[tag_id] = 1

            tag_count = dict(
                sorted(tag_count.items(), key=lambda x: x[1], reverse=True))
            result = json.dumps(tag_count, ensure_ascii=False)
            company.tag_dict = result
            company.save()
        elif id == 0:  # 업데이트 전
            tag_count = json.loads(tag_dict)
    except:
        companys = Company.objects.all()

        dictionary = {}
        tag_count = Counter(dictionary)
        for company in companys.iterator():
            python_tag_dict = json.loads(company.tag_dict)
            tag_dict = Counter(python_tag_dict)
            tag_count += tag_dict

        tag_count = dict(
            sorted(tag_count.items(), key=lambda x: x[1], reverse=True))

    return JsonResponse({'company': company_name, 'data': tag_count})
