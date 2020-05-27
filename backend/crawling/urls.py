from django.urls import path
from . import views

urlpatterns = [
    path('', views.crawling),
    path('add-tags/', views.add_tags)
]
