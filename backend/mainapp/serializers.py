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
        fields = ['name', ]


class TempCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['name', ]


class PostSerializer(serializers.ModelSerializer):
    company = TempCompanySerializer()
    tags = TagSerializer(many=True)
    check_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'company', 'title', 'date', 'contents',
                  'image', 'url', 'tags', 'like_count', 'check_liked']

    def get_current_user(self):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            return request.user
        return None

    def get_check_liked(self, obj):
        user = self.get_current_user()
        is_liked_member = obj.is_liked.all()
        if user in is_liked_member:
            return True
        return False


class UserPostSerializer(serializers.ModelSerializer):
    company = TempCompanySerializer()
    tags = TagSerializer(many=True)

    class Meta:
        model = Post
        fields = ['id', 'company', 'title', 'date',
                  'contents', 'image', 'url', 'tags', 'likeCount', ]


class MainPostSerializer(serializers.ModelSerializer):
    company = TempCompanySerializer()
    tags = TagSerializer(many=True)

    class Meta:
        model = Post
        fields = ['id', 'company', 'title', 'date', 'url', 'tags']


class CompanySerializer(serializers.ModelSerializer):
    post = PostSerializer(source='posts', many=True)

    class Meta:
        model = Company
        fields = ['name', 'url', 'logo', 'description', 'post']
