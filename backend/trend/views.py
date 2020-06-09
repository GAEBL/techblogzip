import os
import pickle
import operator
from functools import reduce

from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.db.models import Q

from techblog.settings import BASE_DIR
from mainapp.models import Post, Company
from mainapp.serializers import PostSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

PATH = BASE_DIR


@api_view(['GET'])
@permission_classes([AllowAny, ])
def target_count(request):
    global PATH

    company = request.query_params.get('company')
    target_data = request.query_params.get('target')
    start_date = request.query_params.get('startdate')
    end_date = request.query_params.get('enddate')

    target_tag = 0
    if target_data == 'language':
        with open(PATH + '/trend/data/language.pickle', 'rb') as f:
            target_tag = pickle.load(f)
    elif target_data == 'lib':
        with open(PATH + '/trend/data/lib.pickle', 'rb') as f:
            target_tag = pickle.load(f)
    elif target_data == 'frontend':
        with open(PATH + '/trend/data/frontend.pickle', 'rb') as f:
            target_tag = pickle.load(f)
    elif target_data == 'backend':
        with open(PATH + '/trend/data/backend.pickle', 'rb') as f:
            target_tag = pickle.load(f)

    query = reduce(operator.or_, (Q(tags__name__icontains=target)
                                  for target in target_tag))

    try:
        company_id = get_object_or_404(Company, name=company).id
        posts = Post.objects.filter(query, company=company_id, date__range=[
                                    start_date, end_date]).order_by('-date')
    except:
        posts = Post.objects.filter(
            query, date__range=[start_date, end_date]).order_by('-date')

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

    trend_dict = []
    for key, val in tag_count.items():
        trend_dict.append({
            'id': key,
            'name': key,
            'value': val
        })

    return JsonResponse({'data': trend_dict})


@api_view(['GET'])
@permission_classes([AllowAny, ])
def post_mention_count(request):
    company = request.query_params.get('company')

    try:
        company_id = get_object_or_404(Company, name=company).id
        posts = Post.objects.filter(company=company_id).order_by('-date')
    except:
        posts = Post.objects.order_by('-date')

    end_posts = posts.count()

    post_count = {}
    if posts.exists():
        for post in posts.iterator():
            post_date = post.date
            if post_date != '':
                date = post_date.replace('.', '-')
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

    return JsonResponse({'startDay': start_day, 'endDay': end_day, 'data': post_json})


@api_view(['GET'])
@permission_classes([AllowAny, ])
def tag_mention_count(request):
    company = request.query_params.get('company')
    tag = request.query_params.get('tag').replace(',', ' ').split()

    try:
        company_id = get_object_or_404(Company, name=company).id
        posts = Post.objects.filter(company=company_id)
    except:
        posts = Post.objects.all()

    tag_mention = []
    for idx, tag in enumerate(tag):
        posts = posts.filter(Q(tags__name__icontains=tag)).order_by('date')

        tag_date_count = {}
        if posts.exists():
            for post in posts.iterator():
                post_date = post.date
                if post_date != '':
                    date = post_date.replace('.', '-')
                    if date in tag_date_count:
                        tag_date_count[date] += 1
                    else:
                        tag_date_count[date] = 1

        tag_dict = {}
        tag_dict['id'] = tag
        tag_dict['data'] = []
        for key, val in tag_date_count.items():
            tag_dict['data'].append({
                'x': key,
                'y': val,
            })
        tag_mention.append(tag_dict)
    return JsonResponse({'data': tag_mention})


@api_view(['GET'])
@permission_classes([AllowAny, ])
def company_rank_tag(request):
    tags = request.query_params.getlist('tags[]')
    company = {'SAMSUNG SDS': '삼성 SDS', 'YANOLJA': '야놀자', 'SPOQA': '스포카', 'COUPANG TECH': '쿠팡',
               'LINE ENGINEERING': 'LINE', 'WOOWABROS': '우아한 형제들', 'TOAST': 'TOAST', 'KAKAO TECH': '카카오', 'NAVER D2': '네이버'}

    tag_rank_dict = []
    for idx, tag in enumerate(tags):
        posts = Post.objects.filter(Q(tags__name__icontains=tag))

        tag_date_count = {}
        tag_date_count['tag'] = tag
        if posts.exists():
            for post in posts.iterator():
                post_company = str(post.company)
                change_company_name = company[post_company]
                if change_company_name in tag_date_count:
                    tag_date_count[change_company_name] += 1
                else:
                    tag_date_count[change_company_name] = 1
        tag_rank_dict.append(tag_date_count)
    return JsonResponse({'data': tag_rank_dict})
