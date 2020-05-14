from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404
from django.contrib import auth
from django.contrib.auth.hashers import check_password

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_jwt.settings import api_settings

from .serializers import UserSerializer
from .models import User



@api_view(['POST'])
@permission_classes([AllowAny,])
def signup(request):
    serializer = UserSerializer(data=request.POST)  
    # 1.입력받은 password를 암호화하기 위해 
    if serializer.is_valid(raise_exception=True):
        password = serializer.validated_data.get('password')
        # 2.user에 원래 password를 저장하고
        user = serializer.save()
        # 3.set_password함수를 통해 암호화한 후 저장한다.
        user.set_password(raw_password=password)
        user.save()
        return JsonResponse(serializer.data)
    return HttpResponse(status=400)


@api_view(['POST'])
@permission_classes([AllowAny, ])
def login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = get_object_or_404(User, username=username)
    if check_password(password, user.password) == True:
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER   
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return JsonResponse({'result': 'ture', 'token': token})
    else:
        return HttpResponse(status=400)
    

