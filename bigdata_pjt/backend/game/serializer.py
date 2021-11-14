from rest_framework import serializers

class GameInfoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['id', 'app_name', 'genres', 'tags', 'review_count', 'good_rate', 'play_hour', 'similarity']