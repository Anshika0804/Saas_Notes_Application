# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Tenant, User


@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "plan")
    prepopulated_fields = {"slug": ("name",)}


class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ("Tenant Info", {"fields": ("tenant", "role")}),
    )
    list_display = ("username", "email", "tenant", "role", "is_staff", "is_active")


admin.site.register(User, UserAdmin)



