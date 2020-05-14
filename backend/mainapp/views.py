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
    return Response(serializer.data)

# def post
