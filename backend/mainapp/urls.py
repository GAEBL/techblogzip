from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.posts),
    path('posts/like/<int:id>/', views.like),
    path('company/<int:id>/', views.company),
    path('search/', views.search),
    path('search/tag/', views.search_tag),
    path('main/', views.main),
    path('trend/', views.trend),
    path('company/tag/<int:id>/', views.sort_tag),  # 0: 업데이틍 전, 1: 업데이트 후
]
