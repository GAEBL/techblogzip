from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.db.models import Q, Count

from accounts.models import User
from mainapp.models import Post
from mainapp.views import pagination
from mainapp.serializers import PostSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny


@api_view(['GET'])
@permission_classes([AllowAny, ])
def posts(request):
    company = request.query_params.get('company')
    querys = request.query_params.get('query').replace(',', ' ').split()

    try:
        company_id = get_object_or_404(Company, name=company).id
        posts = Post.objects.filter(company=company_id)
    except:
        posts = Post.objects.all()

    if len(querys) > 0:
        for idx, query in enumerate(querys):
            if idx == 0:
                post_search = posts.filter(
                    Q(title__icontains=query) | Q(tags__name__icontains=query) | Q(company__name__icontains=query) | Q(contents__icontains=query)).distinct()
            else:
                post_multi_search = posts.filter(
                    Q(title__icontains=query) | Q(tags__name__icontains=query) | Q(company__name__icontains=query) | Q(contents__icontains=query)).distinct()
                post_search = post_search.union(post_multi_search)

        post_search = post_search.order_by('-date')

        all_query_count, last_page, results = pagination(post_search, request)
        serializer = PostSerializer(
            results, context={'request': request}, many=True)

        return JsonResponse({'result': 'true', 'lastPage': last_page, 'resultNum': all_query_count, 'data': serializer.data})
    return JsonResponse({'result': 'false'})


@api_view(['GET'])
@permission_classes([AllowAny, ])
def tag(request):
    tag = request.query_params.get('tag')

    posts = Post.objects.filter(Q(tags__name__icontains=tag)).order_by('-date')

    if len(posts) == 0:
        return HttpResponse(status=204)

    all_query_count, last_page, results = pagination(posts, request)
    serializer = PostSerializer(
        results, context={'request': request}, many=True)

    return JsonResponse({'lastPage': last_page, 'resultNum': all_query_count, 'data': serializer.data})
