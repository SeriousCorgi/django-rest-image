# Generated by Django 3.0.5 on 2020-05-09 02:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('image', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='thumbnail',
            field=models.ImageField(blank=True, upload_to=''),
        ),
    ]