from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.posts),
    path('posts/like/<int:id>/', views.like),
    path('company/<int:id>/', views.company),
    path('search/', views.search),
    path('main/', views.main),
    path('trend/', views.trend),
    path('temp/', views.temp),
]
