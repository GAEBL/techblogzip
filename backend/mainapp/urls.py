from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.posts),
    path('home/', views.home),
    path('company/<int:id>/', views.company),
]
