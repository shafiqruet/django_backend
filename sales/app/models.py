from django.db import models
from django.contrib import admin
from django_admin_listfilter_dropdown.filters import DropdownFilter


class Order(models.Model):
    date = models.DateField(blank=False)
    item = models.CharField(max_length=100, blank=False)
    price = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    quantity = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    amount = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return f"{self.date}: {self.item}"

    class Meta:
        ordering = ["-id"]


class AdminOrder(admin.ModelAdmin):
    list_display = ("item", "price", "quantity", "amount", "created_at")
    search_fields = ["price", "item"]
    list_filter = (("item", DropdownFilter), ("price", DropdownFilter))
    date_hierarchy = "date"
