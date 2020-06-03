from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup),
    path('login/', views.login),
    path('check/', views.check),
    path('myinfo/', views.myinfo),
    path('user/likes/', views.like_post),
]
