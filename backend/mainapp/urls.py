from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.posts),
    path('home/', views.home),
    path('trend/', views.trend),
    path('company/<int:id>/', views.company),
]
