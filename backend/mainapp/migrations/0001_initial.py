# Generated by Django 3.0.5 on 2020-05-14 01:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('url', models.CharField(max_length=100)),
                ('logo', models.CharField(blank=True, max_length=100, null=True)),
                ('description', models.TextField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('data', models.CharField(max_length=100)),
                ('contents', models.CharField(max_length=100)),
                ('image', models.CharField(max_length=100)),
                ('url', models.CharField(max_length=100)),
                ('company', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='company_post', to='mainapp.Company')),
                ('is_liked', models.ManyToManyField(blank=True, null=True, related_name='user_post', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('tag_post', models.ManyToManyField(blank=True, null=True, related_name='post_tag', to='mainapp.Post')),
            ],
        ),
    ]
