from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.posts),
    path('posts/like/<int:id>/', views.like),
    path('company/<int:id>/', views.company),
]
