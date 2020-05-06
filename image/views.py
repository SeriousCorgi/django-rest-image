from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import ImageSerializer
from .models import Image

# Create your views here.


class ImageUploadView(viewsets.ModelViewSet):
    """
    API endpoint
    """
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
