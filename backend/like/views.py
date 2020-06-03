from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponse

from accounts.models import User
from mainapp.models import Post
from mainapp.views import pagination
from mainapp.serializers import PostSerializer

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.settings import api_settings


@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def like(request, id):
    posts = get_object_or_404(Post, id=id)
    user = request.user
    if user not in posts.is_liked.all():
        posts.is_liked.add(user)
        on_like = True
    else:
        posts.is_liked.remove(user)
        on_like = False
    posts.like_count = posts.is_liked.all().count()
    posts.save()
    return JsonResponse({'id': id, 'result': 'true', 'count_like': posts.like_count, 'on_like': on_like})


@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
@authentication_classes([JSONWebTokenAuthentication, ])
def like_post(request):
    token = request.headers.get('Authorization', None)

    if token == None:
        return HttpResponse(status=401)

    jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
    user = jwt_decode_handler(token.split(' ')[1])
    user_id = user.get('user_id')
    user = get_object_or_404(User, id=user_id)
    posts = user.liked_posts.all()

    all_query_count, last_page, results = pagination(posts, request)
    serializer = PostSerializer(
        results, context={'request': request}, many=True)

    return JsonResponse({'lastPage': last_page, 'resultNum': all_query_count, 'data': serializer.data})
