from urllib import response
from rest_framework.decorators import api_view
from django.shortcuts import HttpResponse
from rest_framework import status
from django.forms.models import model_to_dict
from django.core.exceptions import ObjectDoesNotExist
from app.user_model import User
import json
from datetime import datetime

from app.serialize.user_serialize import UserSerializer


from django.views.decorators.csrf import csrf_exempt


def serialize_user(user):
    serialized = model_to_dict(user)
    serialized["first_name"] = str(user.first_name)
    serialized["last_name"] = str(user.last_name)
    serialized["email"] = str(user.email)
    serialized["phone"] = str(user.phone)
    serialized["password"] = str(user.password)
    serialized["address"] = str(user.address)
    serialized["city"] = str(user.city)
    serialized["country"] = str(user.country)

    return serialized


@csrf_exempt
def save_user(request, success_status):

    try:
        response = UserSerializer(data=request.data)
        if response.is_valid():
            response.save()
            return HttpResponse(
                json.dumps({"data": response.data}), status=success_status
            )

    except Exception as e:
        return HttpResponse(
            json.dumps({"errors": {"User": str(e)}}), status=status.HTTP_400_BAD_REQUEST
        )


@csrf_exempt
@api_view(["GET", "POST"])
def signup(request):
    if request.method == "POST":
        return save_user(request, status.HTTP_200_OK)


@csrf_exempt
@api_view(["GET", "POST"])
def login(request):

    if request.method == "POST":
        errors = []
        email = request.data.get("email", "")
        password = request.data.get("password", "")
        if email == "":
            errors.append({"email": "This field is required"})

        try:
            check_user = User.objects.filter(email=email, password=password).values()
            if check_user:
                return HttpResponse(
                    json.dumps(
                        {"data": list(check_user)},
                        indent=1,
                        sort_keys=True,
                        default=str,
                    ),
                    status.HTTP_200_OK,
                )
            else:
                return HttpResponse(
                    json.dumps({"data": "not_found"}), status.HTTP_200_OK
                )
        except User.DoesNotExist:
            return HttpResponse(json.dumps({"data": "error"}), status.HTTP_200_OK)


@csrf_exempt
@api_view(["GET", "POST"])
def user_data(request, user_id):

    if request.method == "GET":
        errors = []
        if user_id == "":
            errors.append({"user_id": "This field is required"})

        try:
            check_user = User.objects.filter(id=user_id).values()
            if check_user:
                return HttpResponse(
                    json.dumps(
                        {"data": list(check_user)},
                        indent=1,
                        sort_keys=True,
                        default=str,
                    ),
                    status.HTTP_200_OK,
                )
            else:
                return HttpResponse(
                    json.dumps({"data": "not_found"}), status.HTTP_200_OK
                )
        except User.DoesNotExist:
            return HttpResponse(json.dumps({"data": "error"}), status.HTTP_200_OK)
