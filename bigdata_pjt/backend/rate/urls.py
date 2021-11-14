from django.urls import path

from .views import GameViewSet

urlpatterns = [
    path('', GameViewSet.as_view({"post": "create", "get": "getGameListByUserId"})),
    path('<int:game_id>/', GameViewSet.as_view({"patch": "update", "delete": "delete"})),
]
