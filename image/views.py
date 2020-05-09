from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import ImageSerializer
from .models import Image
from datetime import datetime

# Create your views here.


class ImageUploadView(viewsets.ModelViewSet):
    """
    API endpoint
    """
    serializer_class = ImageSerializer

    def get_queryset(self):
        queryset = Image.objects.all()

        published = self.request.query_params.get('published', None)
        if published is not None:
            if (published == "true"):
                queryset = queryset.filter(published__isnull=False)
            else:
                queryset = queryset.filter(published__isnull=True)

        hashtag = self.request.query_params.get('hashtag', None)
        if hashtag is not None:
            queryset = queryset.filter(hashtag=hashtag)

        return queryset

    def update(self, request, *args, **kwargs):
        image = self.get_object()
        published = self.request.data.get("published", None)
        title = self.request.data.get("title", None)
        description = self.request.data.get("description", None)

        if published is not None:
            image.published = datetime.now()

        if title is not None:
            image.title = title

        if description is not None:
            image.description = description
            image.hashtag.clear()

        image.save()

        return HttpResponse(image)
