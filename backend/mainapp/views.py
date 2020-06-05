import math

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
    query_page = all_query_count / 12
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
