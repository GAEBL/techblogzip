from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Company, Post, Tag


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'password', 'email', 'is_subscribed']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['company', 'title', 'date', 'contents', 'image', 'url']

class CompanySerializer(serializers.ModelSerializer):
    post = PostSerializer(source='company_post', many=True)
    class Meta:
        model = Company
        fields = ['name', 'url', 'logo', 'description', 'post']
