from django.db import models
from django.contrib import admin

class weatherModel(models.Model):
    variableData = models.CharField(max_length=200)

class Album(models.Model):
    variableData = models.CharField(max_length=200)

admin.site.register(Album)

