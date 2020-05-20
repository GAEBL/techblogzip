from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import check_password

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer

from .serializers import UserSerializer
from .models import User


jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER


@api_view(['POST'])
@permission_classes([AllowAny, ])
def signup(request):
    global jwt_payload_handler, jwt_encode_handler

    username = request.data.get('username')

    user = User.objects.filter(username=username)
    if user:
        return HttpResponse(status=409)

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        password = request.data.get('password')
        user = serializer.save()
        user.set_password(raw_password=password)
        user.save()

        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)

        return JsonResponse({'token': token, 'user': {'id': user.id, 'username': user.username}})
    return HttpResponse(status=400)


@api_view(['POST'])
@permission_classes([AllowAny, ])
def login(request):
    global jwt_payload_handler, jwt_encode_handler

    username = request.data.get('username')
    password = request.data.get('password')

    user = get_object_or_404(User, username=username)
    if check_password(password, user.password) == True:
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return JsonResponse({'token': token, 'user': {'id': user.id, 'username': user.username}})
    else:
        return HttpResponse(status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
@authentication_classes([JSONWebTokenAuthentication, ])
def check(request):
    global jwt_decode_handler

    token = request.headers.get('Authorization', None)
    if token == None:
        return HttpResponse(status=401)

    user = jwt_decode_handler(token.split(' ')[1])
    return JsonResponse({'user': {'id': user.get('user_id'), 'username': user.get('username')}})


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, ])
@authentication_classes([JSONWebTokenAuthentication, ])
def mypage(request):
    global jwt_decode_handler

    token = request.headers.get('Authorization', None)
    print(token)
    if token == None:
        return HttpResponse(status=401)

    user = jwt_decode_handler(token.split(' ')[1])
    user_id = user.get('user_id')
    user = get_object_or_404(User, id=user_id)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        user.username = request.data.get('username')
        password = request.data.get('password')
        user.email = request.data.get('email')
        user.is_subscribed = request.data.get('is_subscribed')
        user.save()
        return JsonResponse({'username': user.username, 'password': user.password, 'email': user.email, 'subscribed': user.is_subscribed})
    elif request.method == 'DELETE':
        user.delete()
        return JsonResponse({'result': '삭제되었습니다.'})
