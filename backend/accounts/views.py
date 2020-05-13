from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

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
        user.is_active = True
        user.save()
        return JsonResponse(serializer.data)
    return HttpResponse(status=400)


@api_view(['POST'])
@permission_classes([AllowAny, ])
def login(request):
    return

