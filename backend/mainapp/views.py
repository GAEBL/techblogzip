from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.db.models import Q, Count
from .models import *
from .serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny


@api_view(['GET'])
@permission_classes([AllowAny, ])
def posts(request):
    # request.GET == request.query_params
    company = request.query_params.get('company')  # ex) 삼성SDS
    sort = request.query_params.get('sort')

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
    posts = get_object_or_404(Post, id=id)
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
    company = get_object_or_404(Company, id=id)
    serializer = CompanySerializer(company)
    return JsonResponse({'data': serializer.data})


@api_view(['POST'])
@permission_classes([AllowAny, ])
def search(request):
    posts = Post.objects.all()
    query = request.data.get('query')
    if query:
        posts = posts.filter(
            Q(title__icontains=query) | Q(tags__name__icontains=query)).distinct()
        serializer = PostSerializer(posts, many=True)
        return JsonResponse({'result': 'true', 'data': serializer.data})
    return JsonResponse({'result': 'false'})


@api_view(['GET'])
@permission_classes([AllowAny, ])
def main(request):
    name = ['SAMSUNG SDS', 'YANOLJA', 'SPOQA', 'COUPANG TECH',
            'LINE ENGINEERING', 'WOOWABROS', 'TOAST', 'KAKAO TECH', 'NAVER D2']
    company_count = len(name)

    company_post_count = []
    for idx in range(company_count):
        company = get_object_or_404(Company, name=name[idx])
        company_post_count.append(Post.objects.filter(company=company).count())

    posts_count = sum(company_post_count)
    posts = Post.objects.all()[:5]
    serializer = MainPostSerializer(posts, many=True)
    return JsonResponse({'company_count': company_count,
                         'posts_count': posts_count, 'company_post_count': company_post_count, 'data': serializer.data})


@api_view(['POST'])
def trend(request):
    company = request.data.get('company')
    start_date = request.data.get('start_date')
    end_date = request.data.get('end_date')
    # target_data = request.data.get('target_data')
    tag_count = request.data.get('tag_count')

    try:
        company_id = get_object_or_404(Company, name=company)
        company_id = company_id.id
    except:
        company_id = 0

    if company_id == 0:
        posts = Post.objects.annotate(tags_count=Count(
            'tags')).filter(date__range=[start_date, end_date], tags_count__range=[tag_count, 10]).order_by('-date')
    else:
        posts = Post.objects.annotate(tags_count=Count(
            'tags')).filter(company=company_id, date__range=[start_date, end_date], tags_count__range=[tag_count, 10]).order_by('-date')

    serializer = PostSerializer(posts, many=True)
    return JsonResponse({'company': company, 'data': serializer.data})
