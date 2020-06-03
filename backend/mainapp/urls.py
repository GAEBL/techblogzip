from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.posts),
    path('home/', views.home),
    path('trend/', views.trend),
    path('tag/', views.tag_mention_count),
    path('company/<int:id>/', views.company),
]
