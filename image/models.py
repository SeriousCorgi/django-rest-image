from django.db import models

# Create your models here.


def imageFile(instance, filename):
    return '/'.join(['images', str(instance.id), filename])


class Image(models.Model):
    name = models.TextField()
    # description = models.TextField()
    # hashtag = models.TextField()
    image = models.ImageField(upload_to=imageFile)

    def __str__(self):
        return self.name
