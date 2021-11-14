from django.contrib import admin
from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

from . import views
from .views import UserSignUp
from .views import UserDetail

urlpatterns = [
    # path('', views.user_view),
    path('user/', UserSignUp.as_view({"post": "signup"}), name='sign-up'),
    path('my-profile/', UserDetail.as_view({"get": "getMyProfile"}), name="profile"),
    path('api-token-auth/', obtain_jwt_token),
    path('<int:user_pk>/', UserDetail.as_view({"get": "readUserInfo", "put": "updateUserInfo"}), name="user-info")
    # path('login/', views.login, name='get'),
]
