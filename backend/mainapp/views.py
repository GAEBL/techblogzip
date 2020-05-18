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


@api_view(['GET', 'POST'])
@permission_classes([AllowAny, ])
def posts(request):
    company = request.POST['company']  # ex) 삼성SDS
    sort = request.POST['sort']
    try:
        company_id = Company.objects.get(name=company)
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


@api_view(['GET'])
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
   return
