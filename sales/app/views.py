from django.shortcuts import render


def index_view(request):
    context = {}
    return render(request, "login.html", context=context)


def profile_view(request):
    context = {}
    return render(request, "profile.html", context=context)


def signup_view(request):
    context = {}
    return render(request, "signup.html", context=context)


""" def user_login_view(request):
    context = {}
    return render(request, "user_login.html", context=context)
 """


def sales_view(request):
    context = {}
    return render(request, "sales.html", context=context)
