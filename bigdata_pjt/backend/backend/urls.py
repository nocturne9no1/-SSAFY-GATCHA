"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_url_patterns = [path('admin/', admin.site.urls),
                       path('accounts/', include('accounts.urls')),
                       path('rate/', include('rate.urls')),
                       path('game/', include('game.urls'))]
schema_view_v1 = get_schema_view(
    openapi.Info(title="GATCHA - 스팀 게임 추천 시스템", default_version='v1', description="리뷰 기반 스팀 게임 추천 시스템 API",
                 terms_of_service="https://www.google.com/policies/terms/", ), public=True,
    permission_classes=(AllowAny,), patterns=schema_url_patterns, )

urlpatterns = [
    # path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('rate/', include('rate.urls')),
    path('game/', include('game.urls')),

    # swagger
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view_v1.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view_v1.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view_v1.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
