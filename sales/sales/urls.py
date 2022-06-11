from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

from django.contrib import admin
from django.urls import path
from app import views_orders
from app import views_users
from app import views
from sales import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/orders/', views_orders.orders),
    path('api/orders/<int:order_id>/', views_orders.order),
    path('', views.index_view),
    path('orderPage', views.sales_view),
    path('profile', views.profile_view),
    path('signup', views.signup_view),
    path('api/signup/', views_users.signup),
    path('api/login/', views_users.login),
    path('api/user_data/<int:user_id>/', views_users.user_data),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
