import pickle
import operator
import math
from functools import reduce
from collections import Counter

from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.db.models import Q, Count

from .models import *
from .serializers import *

from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny


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


@api_view(['GET'])
@permission_classes([AllowAny, ])
def home(request):
    company_count = Company.objects.all().count()
    posts_count = Post.objects.all().count()
    posts = Post.objects.all().order_by('-date')[:5]
    serializer = MainPostSerializer(posts, many=True)
    return JsonResponse({'company_count': company_count,
                         'posts_count': posts_count, 'data': serializer.data})


@api_view(['GET'])
@permission_classes([AllowAny, ])
def company(request, id):
    company = get_object_or_404(Company, id=id)
    serializer = CompanySerializer(company)
    return JsonResponse({'data': serializer.data})


def post_update_count(company_id):
    if company_id != 0:
        posts = Post.objects.filter(company=company_id).order_by('-date')
    else:
        posts = Post.objects.all.order_by('-date')

    post_count = {}
    if posts.exists():
        for post in posts.iterator():
            date = post.date.replace('.', '-')
            if date in post_count:
                post_count[date] += 1
            else:
                post_count[date] = 1

    post_json = []
    for key, val in post_count.items():
        post_json.append({
            'day': key,
            'value': val
        })

    start_day = post_json[0]['day']
    end_day = post_json[-1]['day']

    return post_json, start_day, end_day


def target_count(company_id, start_date, end_date):
    with open('language.pickle', 'rb') as f:
        language_tag = pickle.load(f)
    with open('lib.pickle', 'rb') as f:
        lib_tag = pickle.load(f)
    with open('frontend.pickle', 'rb') as f:
        frontend_tag = pickle.load(f)
    with open('backend.pickle', 'rb') as f:
        backend_tag = pickle.load(f)

    language, lib, frontend, backend = {}, {}, {}, {}
    for target_tag in [language_tag, lib_tag, frontend_tag, backend_tag]:
        query = reduce(operator.or_, (Q(tags__name__icontains=target)
                                      for target in target_tag))

        if company_id != 0:
            posts = Post.objects.filter(query, company=company_id, date__range=[
                                        start_date, end_date]).order_by('-date')
        else:
            posts = Post.objects.filter(query,
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

            tag_count = dict(
                sorted(tag_count.items(), key=lambda x: x[1], reverse=True))

            trend_dict = {}
            trend_dict['data'] = []
            for key, val in tag_count.items():
                trend_dict['data'].append({
                    'id': key,
                    'name': key,
                    'value': val
                })
        else:
            trend_dict = {}

        if target_tag == language_tag:
            language = trend_dict
        elif target_tag == lib_tag:
            lib = trend_dict
        elif target_tag == frontend_tag: 
            frontend = trend_dict
        elif target_tag == backend_tag:
            backend = trend_dict

    return language, lib, frontend, backend


@api_view(['GET'])
@permission_classes([AllowAny, ])
def trend(request):
    company = request.query_params.get('company')
    start_date = request.query_params.get('startdate')
    end_date = request.query_params.get('enddate')

    try:
        company_id = get_object_or_404(Company, name=company).id
    except:
        company_id = 0

    post_json, start_day, end_day = post_update_count(company_id)
    language, lib, frontend, backend = target_count(company_id, start_date, end_date)

    return JsonResponse({'startDay': start_day, 'endDay': end_day, 'postingDate':post_json, 'language': language, 'lib': lib, 'frontend': frontend, 'backend': backend})


