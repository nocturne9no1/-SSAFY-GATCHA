# Create your models here.
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.conf import settings


class User(AbstractUser):
    nickname = models.CharField(max_length=45)
    gender = models.IntegerField()


