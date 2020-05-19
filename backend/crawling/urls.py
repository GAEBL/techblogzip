from django.urls import path
from . import views

urlpatterns = [
    path('', views.crawling),
    path('check/', views.check)
]
