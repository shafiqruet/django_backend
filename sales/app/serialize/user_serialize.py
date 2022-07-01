from pkg_resources import require
from rest_framework import serializers
from app.user_model import User
from django.forms.models import model_to_dict


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ["id"]

    # print((serializers))

    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    email = serializers.CharField(required=False)
    phone = serializers.CharField(required=False)
    password = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    city = serializers.CharField(required=False)
    state = serializers.CharField(required=False)
    country = serializers.CharField(required=False)
    status = serializers.BooleanField(required=False)
    created_at = serializers.DateTimeField(required=False)
    updated_at = serializers.DateTimeField(required=False)
