from django.db import models
from django.conf import settings


class Company(models.Model):
    name = models.CharField(max_length=100)
    url = models.TextField(null=True)
    logo = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(null=True)
    
    def __str__(self):
        return self.name


class Post(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='posts', blank=True, null=True,)
    title = models.CharField(max_length=500)
    date = models.CharField(max_length=100)
    contents = models.TextField(null=True)  # 나중에 AI 요약
    image = models.TextField(null=True)
    url = models.TextField(null=True)
    is_liked = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='posts', blank=True, null=True)
    
    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-date']


class Tag(models.Model):
    name = models.CharField(max_length=100)
    tag_post = models.ManyToManyField(Post, related_name="tags", blank=True, null=True)
    
    def __str__(self):
        return f'{self.id} {self.name}'


# class Log(models.Model):
