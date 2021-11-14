from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response  # api
from rest_framework import status
from rest_framework import viewsets

# Create your views here.
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from accounts.models import User
from .models import RateGame
from .serializer import GameSerializer, GameLikeSerializer


class GameViewSet(viewsets.ModelViewSet):
    """
          게임 평가
          ---
          # 내용
              - gameid : 게임 아이디
              - like : 싫어요(0)/좋아요(1)
      """
    serializer_class = GameSerializer

    @authentication_classes([JSONWebTokenAuthentication])
    @permission_classes([IsAuthenticated])
    def create(self, request):
        ##### 해야 될 일
        # jwt 토큰 사용해서 사용자 확인
        # 같은 유저 id로 같은 game id값 들어올 경우, update하기

        # userid로 user 얻기
        user = get_object_or_404(User, id=request.user.pk)
        # print(request.data['gameid'])

        # GameSerializer 통해 데이터 직렬화
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            game = RateGame.objects.filter(user=user, gameid=request.data['gameid'])

            if game.count() == 0:
                serializer.save(user=user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

    @authentication_classes([JSONWebTokenAuthentication])
    @permission_classes([IsAuthenticated])
    @swagger_auto_schema(operation_description="유저가 작성한 게임 평가 리스트 가져오기")
    def getGameListByUserId(self, request):
        ##### 해야 될 일
        # jwt 토큰 사용해서 사용자 확인
        # 예외처리 추가

        # user_pk로 유저 정보 가져오기
        user = get_object_or_404(User, id=request.user.pk)

        # game_rate 에서 해당 유저 아이디로 검색
        games = RateGame.objects.all().filter(user=user)
        serializer = GameSerializer(games, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # user_pk, game_id에 해당하는 값 like 변경
    @authentication_classes([JSONWebTokenAuthentication])
    @permission_classes([IsAuthenticated])
    @swagger_auto_schema(request_body=GameLikeSerializer, operation_description="유저가 작성한 게임 평가 내용 변경")
    def update(self, request, game_id):
        print("update")
        ##### 해야 될 일
        # jwt 토큰 사용해서 사용자 확인
        # 예외처리
        # like 값 잘못들어오는 경우 등

        # 유저 정보
        user = get_object_or_404(User, id=request.user.pk)

        # user, game_id에 해당하는 rate 정보
        game = RateGame.objects.get(user=user, gameid=game_id)

        serializer = GameLikeSerializer(instance=game, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(game=game)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # user_pk, game_id에 해당하는 값 like 변경
    @authentication_classes([JSONWebTokenAuthentication])
    @permission_classes([IsAuthenticated])
    @swagger_auto_schema(operation_description="유저가 작성한 게임 평가 내용 변경")
    def delete(self, request, game_id):
        print("delete")
        ##### 해야 될 일
        # jwt 토큰 사용해서 사용자 확인
        # 예외처리
        # like 값 잘못들어오는 경우 등

        # 유저 정보
        user = get_object_or_404(User, id=request.user.pk)

        # user, game_id에 해당하는 rate 정보
        game = RateGame.objects.get(user=user, gameid=game_id)
        game.delete()
        data = {
            'success': True,
        }
        return Response(data, status=status.HTTP_200_OK)
