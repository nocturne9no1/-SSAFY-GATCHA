from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response  # api
from rest_framework import status
from rest_framework import viewsets

# Create your views here.
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .models import User
from .serializer import UserSerializer, UserSignUpSerializer, UserInfoSerializer, UserUpdateSerializer


class UserSignUp(viewsets.ModelViewSet):
    """
          회원 가입
          ---
          # 내용
              - username : 유저 아이디
              - password : 비밀번호
              - nickname : 닉네임
              - gender : 남(0)/여(1)
      """

    serializer_class = UserSignUpSerializer

    def signup(self, request):
        print('회원가입')
        # 1-1. Client에서 온 데이터를 받아서
        password = request.data.get('password')
        password_confirmation = request.data.get('password_confirmation')

        # 1-2. 패스워드 일치 여부 체크
        if password != password_confirmation:
            return Response({'error': '비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        # 2. UserSerializer를 통해 데이터 직렬화
        serializer = UserSerializer(data=request.data)
        # 3. validation 작업 진행 -> password도 같이 직렬화 진행
        if serializer.is_valid(raise_exception=True):
            print('here')
            user = serializer.save()
            # 4. 비밀번호 해싱 후
            user.set_password(request.data.get('password'))
            user.save()
            # password는 직렬화 과정에는 포함 되지만 → 표현(response)할 때는 나타나지 않는다.
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserDetail(viewsets.ModelViewSet):
    """
          유저 상세 정보
          ---
          # 내용
              - username : 유저 아이디
              - nickname : 닉네임
              - gender : 남(0)/여(1)
      """

    serializer_class = UserInfoSerializer

    def readUserInfo(self, request, user_pk):
        print("read")
        user = get_object_or_404(User, id=user_pk)
        serializer = UserInfoSerializer(instance=user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @authentication_classes([JSONWebTokenAuthentication])
    @permission_classes([IsAuthenticated])
    def getMyProfile(self, request):
        user = get_object_or_404(User, id=request.user.pk)
        serializer = UserInfoSerializer(instance=user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=UserUpdateSerializer, operation_description="유저 정보 업데이트")
    def updateUserInfo(self, request, user_pk):
        print("update")
        user = get_object_or_404(User, id=user_pk)
        serializer = UserUpdateSerializer(instance=user, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_200_OK)
