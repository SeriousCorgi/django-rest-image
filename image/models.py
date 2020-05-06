from django.db import models

# Create your models here.


class Image(models.Model):
    # name = models.TextField()
    # description = models.TextField()
    # hashtag = models.TextField()
    image = models.ImageField('media')

    # def __str__(self):
    #     return self.name
