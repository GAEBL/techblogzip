from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField('email')
    is_subscribed = models.BooleanField(default=False)
