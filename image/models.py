import re
from django.db import models


def get_hashtag(des):
    HASHTAG_REGEX = r"\#([a-zA-Z]+)"
    return re.findall(HASHTAG_REGEX, des)


class HashTag(models.Model):
    tag = models.CharField(max_length=30, primary_key=True)


class Image(models.Model):
    title = models.CharField(max_length=30, default="Unknown Picture")
    description = models.TextField(default="")
    hashtag = models.ManyToManyField(HashTag, blank=True)
    # date_added = models.DateField()
    image = models.ImageField('media')

    def __str__(self):
        return self.title

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        super(Image, self).save()
        hashtag_list = get_hashtag(self.description)
        for ht in hashtag_list:
            ht_model = HashTag()
            if HashTag.objects.filter(tag=ht).exists():
                continue

            ht_model.tag = ht
            ht_model.save()
            self.hashtag.add(ht)
