from django.db import models

# Create your models here.
from django.conf import settings


class RateGame(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="rate_game_user")
    gameid = models.IntegerField()
    like = models.IntegerField()


class RateRecommendation(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                             related_name="rate_recommendation_user")
    gameid = models.IntegerField()
