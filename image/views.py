from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import ImageSerializer
from .models import Image

# Create your views here.


class ImageViewUpload(viewsets.ModelViewSet):
    """
    API endpoint 
    """
    permission_classes = (permissions.AllowAny,)
    serializer_class = ImageSerializer
