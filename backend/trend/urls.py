from django.urls import path
from . import views

urlpatterns = [
    path('', views.trend),
    path('tag/', views.tag_mention_count),
    path('posts/data/', views.post_mention_count),
]
