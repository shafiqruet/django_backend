import email
from django.db import models


class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    address = models.CharField(max_length=250)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=50)
    status = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.first_name}"

    class Meta:
        ordering = ["-id"]
