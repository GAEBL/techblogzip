# Generated by Django 3.0.6 on 2020-05-28 05:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='tag_dict',
            field=models.TextField(default=''),
        ),
    ]
