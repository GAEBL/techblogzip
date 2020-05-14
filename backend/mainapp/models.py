from django.db import models
from django.conf import settings


class Company(models.Model):
    name = models.CharField(max_length=100)
    url = models.CharField(max_length=100)
    logo = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(null=True)  
    def __str__(self):
        return self.name


class Post(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='company_post', blank=True, null=True,)
    title = models.CharField(max_length=100)
    data = models.CharField(max_length=100)
    contents = models.CharField(max_length=100)  # 나중에 AI 요약
    image = models.CharField(max_length=100)
    url = models.CharField(max_length=100)
    is_liked = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='user_post', blank=True, null=True)
    def __str__(self):
        return self.title


class Tag(models.Model):
    name = models.CharField(max_length=100)
    tag_post = models.ManyToManyField(Post, related_name="post_tag", blank=True, null=True)
    def __str__(self):
        return self.name


# class Log(models.Model):
