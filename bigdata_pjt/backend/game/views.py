import json

from django.http import JsonResponse
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response  # api
from rest_framework import status
from rest_framework import viewsets
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .serializer import GameInfoSerializer
from .service import get_content_based_result, get_search_list_by_game_name, get_user_rated_game_list, get_high_rated, \
    get_many_reviewed, get_high_play_hour_reviewed, get_game_list_by_category, get_game_info_by_gameId, \
    get_word_cloud_by_game_id, get_colaborative_based_result

# Create your views here.
from accounts.models import User
from rate.models import RateGame
from rate.serializer import GameSerializer


class GameRecommendSet(viewsets.ModelViewSet):
    """
          게임 평가
          ---
          # 내용
              - gameid : 게임 아이디
              - like : 싫어요(0)/좋아요(1)
      """

    # serializer_class = GameInfoSerializer

    @authentication_classes([JSONWebTokenAuthentication])
    @permission_classes([IsAuthenticated])
    @swagger_auto_schema(operation_description="컨텐츠 기반 추천 결과 리스트 조회")
    def getContentBasedResult(self, request):
        ##### 해야 될 일
        # jwt 토큰 사용해서 사용자 확인
        # 예외처리 추가

        # user_pk로 유저 정보 가져오기
        user = get_object_or_404(User, id=request.user.pk)

        # game_rate 에서 해당 유저 아이디로 검색
        games = RateGame.objects.all().filter(user=user)
        serializer = GameSerializer(games, many=True)

        print("####")
        print(serializer.data)
        user_game_list_good = list()
        user_game_list_bad = list()
        for item in serializer.data:
            if item['like'] == 1:
                # print(item['gameid'])
                user_game_list_good.append(item['gameid'])
            else:
                user_game_list_bad.append(item['gameid'])
        # print(user_game_list_good)
        # print(user_game_list_bad)
        temp = get_content_based_result(user_game_list_good)
        result = temp.to_json(orient='records')
        return JsonResponse(json.loads(result), safe=False, status=status.HTTP_200_OK)


class GameSearchSet(viewsets.ModelViewSet):
    @swagger_auto_schema(operation_description="게임 검색 결과 조회")
    def searchGameByGameName(self, request, game_name):
        game_list = get_search_list_by_game_name(game_name)
        result = game_list.to_json(orient='records')
        return JsonResponse(json.loads(result), safe=False, status=status.HTTP_200_OK)

    @authentication_classes([JSONWebTokenAuthentication])
    @permission_classes([IsAuthenticated])
    @swagger_auto_schema(operation_description="유저의 게임 평가 리스트 조회")
    def getUserRatedGameList(self, request):
        # user_pk로 유저 정보 가져오기
        user = get_object_or_404(User, id=request.user.pk)

        # game_rate 에서 해당 유저 아이디로 검색
        games = RateGame.objects.all().filter(user=user)
        serializer = GameSerializer(games, many=True)

        user_game_list_good = list()
        user_game_list_bad = list()
        for item in serializer.data:
            if item['like'] == 1:
                # print(item['gameid'])
                user_game_list_good.append(item['gameid'])
            else:
                user_game_list_bad.append(item['gameid'])
        user_rated_game_list = get_user_rated_game_list(user_game_list_good, user_game_list_bad)
        # return Response(user_rated_game_list, status=status.HTTP_200_OK)
        result = user_rated_game_list.to_json(orient='records')
        return JsonResponse(json.loads(result), safe=False, status=status.HTTP_200_OK)

    @authentication_classes([JSONWebTokenAuthentication])
    @permission_classes([IsAuthenticated])
    @swagger_auto_schema(operation_description="평점 좋은 게임 리스트 조회")
    def getHighRatedGameList(self, request):
        # user_pk로 유저 정보 가져오기
        user = get_object_or_404(User, id=request.user.pk)

        # game_rate 에서 해당 유저 아이디로 검색
        games = RateGame.objects.all().filter(user=user)
        user_game_list = GameSerializer(games, many=True)
        user_game_list = user_game_list.data

        game_list = get_high_rated(user_game_list)
        # return Response(game_list, status=status.HTTP_200_OK)
        result = game_list.to_json(orient='records')
        return JsonResponse(json.loads(result), safe=False, status=status.HTTP_200_OK)

    @authentication_classes([JSONWebTokenAuthentication])
    @permission_classes([IsAuthenticated])
    @swagger_auto_schema(operation_description="리뷰 많은 게임 리스트 조회")
    def getManyReviewedGameList(self, request):
        # user_pk로 유저 정보 가져오기
        user = get_object_or_404(User, id=request.user.pk)

        # game_rate 에서 해당 유저 아이디로 검색
        games = RateGame.objects.all().filter(user=user)
        user_game_list = GameSerializer(games, many=True)
        user_game_list = user_game_list.data

        game_list = get_many_reviewed(user_game_list)
        # return Response(game_list, status=status.HTTP_200_OK)
        result = game_list.to_json(orient='records')
        return JsonResponse(json.loads(result), safe=False, status=status.HTTP_200_OK)

    @authentication_classes([JSONWebTokenAuthentication])
    @permission_classes([IsAuthenticated])
    @swagger_auto_schema(operation_description="플레이시간 많은 게임 리스트 조회")
    def getHighPlayHourGameList(self, request):
        # user_pk로 유저 정보 가져오기
        user = get_object_or_404(User, id=request.user.pk)

        # game_rate 에서 해당 유저 아이디로 검색
        games = RateGame.objects.all().filter(user=user)
        user_game_list = GameSerializer(games, many=True)
        user_game_list = user_game_list.data

        game_list = get_high_play_hour_reviewed(user_game_list)
        # return Response(game_list, status=status.HTTP_200_OK)
        result = game_list.to_json(orient='records')
        return JsonResponse(json.loads(result), safe=False, status=status.HTTP_200_OK)

    @authentication_classes([JSONWebTokenAuthentication])
    @permission_classes([IsAuthenticated])
    @swagger_auto_schema(operation_description="설문조사 바탕으로 게임 추천")
    def getGameListByCategory(self, request, categories):
        category_list = categories.split('-')
        if category_list[0] == "Empty":
            print("없어요")
            category_list = ["FPS", "Action", "Sports", "Racing", "Horror", "Puzzle", "RPG", "Simulation", "Casual",
                             "Open World", "Music"]
        print(category_list)
        game_list = get_game_list_by_category(category_list)
        # return Response(game_list, status=status.HTTP_200_OK)
        result = game_list.to_json(orient='records')
        return JsonResponse(json.loads(result), safe=False, status=status.HTTP_200_OK)

    @authentication_classes([JSONWebTokenAuthentication])
    @permission_classes([IsAuthenticated])
    @swagger_auto_schema(operation_description="게임 상세 정보 얻어오기")
    def getGameInfoByGameId(self, request, game_id):
        # user_pk로 유저 정보 가져오기
        user = get_object_or_404(User, id=request.user.pk)

        # game_rate 에서 해당 유저 아이디로 검색
        games = RateGame.objects.all().filter(user=user)
        user_game_list = GameSerializer(games, many=True)
        user_game_list = user_game_list.data

        result = get_game_info_by_gameId(game_id, user_game_list)
        # return Response(result, status=status.HTTP_200_OK)
        result = result.to_json(orient='records')
        return JsonResponse(json.loads(result), safe=False, status=status.HTTP_200_OK)

    @swagger_auto_schema(operation_description="Word Cloud 정보 얻어오기")
    def getWordCloudByGameId(self, request, game_id):
        get_word_cloud_by_game_id(game_id)
        return Response(status=status.HTTP_200_OK)

    @authentication_classes([JSONWebTokenAuthentication])
    @permission_classes([IsAuthenticated])
    @swagger_auto_schema(operation_description="협업 기반 추천 결과 리스트 조회")
    def getColaborativeBasedResult(self, request):
        ##### 해야 될 일
        # jwt 토큰 사용해서 사용자 확인
        # 예외처리 추가

        # user_pk로 유저 정보 가져오기
        user = get_object_or_404(User, id=request.user.pk)

        # game_rate 에서 해당 유저 아이디로 검색
        games = RateGame.objects.all().filter(user=user)
        serializer = GameSerializer(games, many=True)

        print("####")
        print(serializer.data)
        user_game_list_good = list()
        user_game_list_bad = list()
        for item in serializer.data:
            if item['like'] == 1:
                # print(item['gameid'])
                user_game_list_good.append(item['gameid'])
            else:
                user_game_list_bad.append(item['gameid'])
        # print(user_game_list_good)
        # print(user_game_list_bad)
        temp = get_colaborative_based_result(user_game_list_good, user_game_list_bad)
        print(temp)
        # temp = temp[['id', 'app_name', 'genres', 'tags', 'review_count', 'good_rate', 'play_hour', 'similarity']]
        print(temp)
        # return Response(temp, status=status.HTTP_200_OK)
        result = temp.to_json(orient='records')
        return JsonResponse(json.loads(result), safe=False, status=status.HTTP_200_OK)
