from django.urls import path
from . import views

urlpatterns = [
    path('', views.target_count),
    path('tag/', views.tag_mention_count),
    path('posts/date/', views.post_mention_count),
    path('company/tag/', views.company_rank_tag),
]
