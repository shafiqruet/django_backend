from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

from django.contrib import admin
from django.urls import path
from app import views_orders
from app import views_users
from sales import settings
from django.conf.urls.static import static
from django.views.generic.base import RedirectView
from django.contrib.staticfiles.storage import staticfiles_storage

admin.site.site_header = "Admin Panel"
admin.site.site_title = " Admin Portal"
admin.site.index_title = "Welcome to admin Portal"


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path(
        "favicon.ico",
        RedirectView.as_view(url=staticfiles_storage.url("/images/favicon.ico")),
    ),
    path("api/orders/", views_orders.orders),
    path("api/orders/<int:order_id>/", views_orders.order),
    path("api/signup/", views_users.signup),
    path("api/login/", views_users.login),
    path("api/user_data/<int:user_id>/", views_users.user_data),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
