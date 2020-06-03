from django.urls import path
from . import views

urlpatterns = [
    path('posts/<int:id>/', views.like),
    path('user/posts/', views.like_post),
]
