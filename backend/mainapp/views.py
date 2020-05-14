from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.settings import api_settings


@api_view(['GET']) 
@permission_classes([AllowAny, ])
def posts(request):
    posts = Post.objects.order_by('-date')
    serializer = PostSerializer(posts, many=True)
    return JsonResponse({'data' : serializer.data})


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
    return JsonResponse({"result":"true","count_like":posts.is_liked.all().count(),"on_like":on_like})


@api_view(['GET']) 
@permission_classes([AllowAny, ])
def company(request, id):
    company = Company.objects.get(id=id)
    serializer = CompanySerializer(company)
    return JsonResponse({'data' : serializer.data})


@api_view(['POST']) 
@permission_classes([AllowAny, ])
def search(request):
    return
