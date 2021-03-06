import re
import os

from django.conf import settings
from django.db import models
from PIL import Image as pil


def get_hashtag(des):
    HASHTAG_REGEX = r"\#([a-zA-Z]+)"
    return re.findall(HASHTAG_REGEX, des)


def create_thumbnail(image, name, thumbnail_size=(256, 256)):
    if not image or image == "":
        return
    image = pil.open(image)

    image.thumbnail(thumbnail_size, pil.ANTIALIAS)

    filename = name
    arrdata = filename.split(".")
    extension = arrdata.pop()
    basename = "".join(arrdata)
    new_filename = basename + "_thumb." + extension

    image.save(os.path.join(settings.MEDIA_ROOT, new_filename))

    return new_filename


class HashTag(models.Model):
    tag = models.CharField(max_length=30, primary_key=True)


class Image(models.Model):
    title = models.CharField(
        max_length=30, default="Unknown Picture")
    description = models.TextField(default="")
    hashtag = models.ManyToManyField(HashTag, blank=True)
    published = models.DateField(null=True, blank=True)
    thumbnail = models.ImageField(blank=True)
    image = models.ImageField('media')

    def __str__(self):
        return self.title

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        """
        TODO: add thumbnail generating func, then add thumbnail to read_only in serializer
        """
        self.thumbnail = create_thumbnail(self.image, self.image.name)

        super(Image, self).save(force_update=force_update)

        hashtag_list = get_hashtag(self.description)
        for ht in hashtag_list:
            ht_model = HashTag()
            if not HashTag.objects.filter(tag=ht).exists():
                ht_model.tag = ht
                ht_model.save()

            self.hashtag.add(HashTag.objects.get(tag=ht))
