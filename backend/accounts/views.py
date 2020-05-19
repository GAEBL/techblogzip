from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404  
from django.contrib.auth.hashers import check_password

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_jwt.settings import api_settings

from .serializers import UserSerializer, SignupSerializer
from .models import User

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER  

@api_view(['POST'])
@permission_classes([AllowAny,])
def signup(request):
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

        serializer = SignupSerializer(user)
        return JsonResponse({'token':token, 'user':serializer.data,})
    return HttpResponse(status=400)


@api_view(['POST'])
@permission_classes([AllowAny, ])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = get_object_or_404(User, username=username)
    if check_password(password, user.password) == True: 
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return JsonResponse({'result': 'true', 'token': token})
    else:
        return HttpResponse(status=400)
    

