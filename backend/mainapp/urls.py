from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.posts),
    path('home/', views.home),
    path('trend/', views.trend),
    path('company/<int:id>/', views.company),
    path('company/tag/<int:id>/', views.sort_tag),  # 0: 업데이틍 전, 1: 업데이트 후
]
