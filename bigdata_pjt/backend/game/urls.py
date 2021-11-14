from django.urls import path

from .views import GameRecommendSet, GameSearchSet

urlpatterns = [
    path('content-based/', GameRecommendSet.as_view({"get": "getContentBasedResult"})),
    path('search/<str:game_name>/', GameSearchSet.as_view({"get": "searchGameByGameName"})),
    path('user-rated/', GameSearchSet.as_view({"get": "getUserRatedGameList"})),
    path('high-rated/', GameSearchSet.as_view({"get": "getHighRatedGameList"})),
    path('many-review/', GameSearchSet.as_view({"get": "getManyReviewedGameList"})),
    path('high-play-hour/', GameSearchSet.as_view({"get": "getHighPlayHourGameList"})),
    path('category/<str:categories>/', GameSearchSet.as_view({"get": "getGameListByCategory"})),
    path('detail/<int:game_id>/', GameSearchSet.as_view({"get": "getGameInfoByGameId"})),
    path('word-cloud/<int:game_id>/', GameSearchSet.as_view({"get": "getWordCloudByGameId"})),
    path('colaborative/', GameSearchSet.as_view({"get": "getColaborativeBasedResult"})),
]
