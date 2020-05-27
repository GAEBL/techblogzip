from django.db import models
from django.contrib.auth import get_user_model


class Company(models.Model):
    name = models.CharField(max_length=100)
    url = models.TextField(null=True)
    logo = models.CharField(max_length=100, null=True)
    description = models.TextField(null=True)

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Post(models.Model):
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name='posts', null=True)
    title = models.CharField(max_length=500)
    date = models.CharField(max_length=100)
    contents = models.TextField(null=True)  # 나중에 AI 요약
    image = models.TextField(null=True)
    url = models.TextField(null=True)
    is_taged = models.BooleanField(default=False)
    is_liked = models.ManyToManyField(
        get_user_model(), related_name='posts')
    tags = models.ManyToManyField(Tag, related_name='posts')

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return self.title


# class Log(models.Model):
