from django.contrib import admin
from app.models import Order, AdminOrder
from app.user_model import User, UserAdmin


admin.site.register(Order, AdminOrder)
admin.site.register(User, UserAdmin)
