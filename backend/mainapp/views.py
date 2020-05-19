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
    query = request.POST.get('query')
    if query:
        posts = posts.filter(
            Q(title__icontains=query) | Q(tags__name__icontains=query)).distinct()
        serializer = PostSerializer(posts, many=True)
        return JsonResponse({'result': 'true', 'data': serializer.data})
    return JsonResponse({'result': 'false'})


@api_view(['GET'])
@permission_classes([AllowAny, ])
def main(request):
    samsung = get_object_or_404(Company, name='SAMSUNG SDS')
    yanolja = get_object_or_404(Company, name='YANOLJA')
    spoqa = get_object_or_404(Company, name='SPOQA')
    tmon = get_object_or_404(Company, name='TMON DEV')
    coupang = get_object_or_404(Company, name='COUPANG TECH')
    line = get_object_or_404(Company, name='LINE ENGINEERING')
    woowabro = get_object_or_404(Company, name='WOOWABROS')
    toast = get_object_or_404(Company, name='TOAST')
    kakao = get_object_or_404(Company, name='KAKAO TECH')
    naver = get_object_or_404(Company, name='NAVER D2')

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
