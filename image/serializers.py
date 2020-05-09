from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Image, HashTag


class HashTagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = HashTag
        fields = ('tag',)


class ImageSerializer(serializers.HyperlinkedModelSerializer):
    hashtag = HashTagSerializer(read_only=True, many=True)

    class Meta:
        model = Image
        fields = ('id', 'title', 'description',
                  'hashtag', 'published', 'image',)
        read_only_fields = ('hashtag', 'published')
