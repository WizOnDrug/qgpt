from django.urls import path
from . import views

app_name = "Qgpt"

urlpatterns = [
    path("", views.getchatresponse, name="gpt_response")
]
