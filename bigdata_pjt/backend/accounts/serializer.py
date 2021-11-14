from django.core import serializers
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'nickname', 'gender']


class UserSignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'password_confirmation', 'nickname', 'gender']


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'nickname', 'gender']


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['nickname', 'gender']
