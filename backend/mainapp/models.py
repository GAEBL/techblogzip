from django.db import models
from django.contrib.auth import get_user_model


class Company(models.Model):
    name = models.CharField(max_length=100)
    url = models.TextField(default='')
    description = models.TextField(default='')
    tag_dict = models.TextField(default='')

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Post(models.Model):
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=500)
    date = models.CharField(max_length=100)
    contents = models.TextField(default='')
    image = models.TextField(default='')
    url = models.TextField(default='')
    is_taged = models.BooleanField(default=False)
    is_liked = models.ManyToManyField(
        get_user_model(), related_name='liked_posts')
    is_viewed = models.ManyToManyField(
        get_user_model(), related_name='viewed_posts')
    tags = models.ManyToManyField(Tag, related_name='posts')
    likeCount = models.IntegerField(default=0)

    def __str__(self):
        return self.title


# class Log(models.Model):
