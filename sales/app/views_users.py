from rest_framework.decorators import api_view
from django.shortcuts import HttpResponse
from rest_framework import status
from django.forms.models import model_to_dict
from django.core.exceptions import ObjectDoesNotExist
from app.user_model import User
import json
import datetime

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

    user = User()

    errors = []
    first_name = request.data.get("first_name", "")
    last_name = request.data.get("last_name", "")
    email = request.data.get("email", "")
    phone = request.data.get("phone", "")
    password = request.data.get("password", "")
    address = request.data.get("address", "")
    city = request.data.get("city", "")
    country = request.data.get("country", "")
    if first_name == "":
        errors.append({"first_name": "This field is required"})

    if len(errors) > 0:
        return HttpResponse("First Name error")

    if len(errors) > 0:
        return HttpResponse(json.dumps(
            {
                "errors": errors
            }), status=status.HTTP_400_BAD_REQUEST)

    try:
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.phone = phone
        user.password = password
        user.address = address
        user.city = city
        user.country = country
        user.save()
    except Exception as e:
        return HttpResponse(json.dumps(
            {
                "errors": {"User": str(e)}
            }), status=status.HTTP_400_BAD_REQUEST)

    return HttpResponse(json.dumps({"data": serialize_user(user)}), status=success_status)


@csrf_exempt
@api_view(['GET', 'POST'])
def signup(request):
    print(request.data)
    print(request.data.get("email"))
    if request.method == "POST":
        return save_user(request, status.HTTP_200_OK)


@csrf_exempt
@api_view(['GET', 'POST'])
def login(request):

    if request.method == "POST":
        errors = []
        email = request.data.get("email", "")
        password = request.data.get("password", "")
        if email == "":
            errors.append({"email": "This field is required"})

        try:
            check_user = User.objects.filter(
                email=email, password=password).first()
            if check_user:
                return HttpResponse(json.dumps({"data":  serialize_user(check_user)}), status.HTTP_200_OK)
            else:
                return HttpResponse(json.dumps({"data": "not_found"}), status.HTTP_200_OK)
        except User.DoesNotExist:
            return HttpResponse(json.dumps({"data": "error"}), status.HTTP_200_OK)


@csrf_exempt
@api_view(['GET', 'POST'])
def user_data(request, user_id):

    if request.method == "GET":
        errors = []
        #user_id = request.data.get("user_id", "")
        if user_id == "":
            errors.append({"user_id": "This field is required"})

        try:
            check_user = User.objects.filter(
                id=user_id).first()
            if check_user:
                return HttpResponse(json.dumps({"data":  serialize_user(check_user)}), status.HTTP_200_OK)
            else:
                return HttpResponse(json.dumps({"data": "not_found"}), status.HTTP_200_OK)
        except User.DoesNotExist:
            return HttpResponse(json.dumps({"data": "error"}), status.HTTP_200_OK)
