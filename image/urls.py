from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register(r'upload', views.ImageViewUpload, basename="upload")
# router.register(r'delete', views.ImageViewDelete, basename="delete")
# router.register(r'update', views.ImageViewUpdate, basename="update")
# router.register(r'get', views.ImageViewGet, basename="get")

urlpatterns = [
    path('', include(router.urls))
]
