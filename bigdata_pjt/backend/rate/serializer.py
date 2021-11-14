from django.core import serializers
from rest_framework import serializers
from .models import RateGame


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = RateGame
        fields = ['gameid', 'like']


class GameLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RateGame
        fields = ['like']
