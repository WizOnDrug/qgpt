from django.urls import path
from . import views

app_name = "TitleApi"

urlpatterns = [
    path("", views.getchatresponse, name="titleapi_response")
]
