from django.urls import path
from . import views

from django.urls import path
from .views import UserCreateView, TenantUpgradeView, MeView, UserCreateView, HealthView

urlpatterns = [
    path("health/", HealthView.as_view(), name="health"),
    path("users/create/", UserCreateView.as_view(), name="user-create"),
    path("me/", MeView.as_view(), name="me"),
    path("tenants/<slug:slug>/upgrade/", TenantUpgradeView.as_view(), name="tenant-upgrade"),
]


