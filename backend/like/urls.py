from django.urls import path
from . import views

urlpatterns = [
    path('posts/<int:post_id>/', views.like),
    path('user/posts/', views.like_post),
]
