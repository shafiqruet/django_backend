import email
from django.db import models
from django.contrib import admin
from django_admin_listfilter_dropdown.filters import DropdownFilter


class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    address = models.CharField(max_length=250)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100, null=True)
    country = models.CharField(max_length=50)
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    class Meta:
        verbose_name = "Client Setting"
        verbose_name_plural = "Client Settings"

    def __str__(self):
        return f"{self.first_name}   {self.last_name}  {self.email}  {self.address}"

    class Meta:
        ordering = ["-id"]


class UserAdmin(admin.ModelAdmin):
    # date_hierarchy = 'last_name'
    search_fields = ["last_name", "email"]
    list_filter = (("email", DropdownFilter), ("phone", DropdownFilter))
    list_display = (
        "id",
        "first_name",
        "last_name",
        "email",
        "address",
        "phone",
        "created_at",
    )
