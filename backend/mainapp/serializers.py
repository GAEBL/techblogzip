from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Company, Post, Tag


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'password', 'email', 'is_subscribed']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name',]

class PostSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    class Meta:
        model = Post
        fields = ['company', 'title', 'date', 'image', 'url', 'tags', 'is_liked']
        # fields = ['company', 'title', 'date', 'contents', 'image', 'url', 'tags', 'is_liked']

class CompanySerializer(serializers.ModelSerializer):
    post = PostSerializer(source='posts', many=True)
    class Meta:
        model = Company
        fields = ['name', 'url', 'logo', 'description', 'post']


