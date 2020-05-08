# Generated by Django 3.0.5 on 2020-05-08 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='HashTag',
            fields=[
                ('tag', models.CharField(max_length=30, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='Unknown Picture', max_length=30)),
                ('description', models.TextField(default='')),
                ('published', models.DateField(blank=True, null=True)),
                ('image', models.ImageField(upload_to='', verbose_name='media')),
                ('hashtag', models.ManyToManyField(blank=True, to='image.HashTag')),
            ],
        ),
    ]
