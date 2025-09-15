from django.db import models
from django.contrib.auth.models import AbstractUser

class Tenant(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)  # "acme", "globex"
    plan = models.CharField(max_length=20, choices=[("free", "Free"), ("pro", "Pro")], default="free")

    def __str__(self):
        return self.name


class User(AbstractUser):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, null=True, blank=True, related_name="users")
    role = models.CharField(
        max_length=20,
        choices=[("admin", "Admin"), ("member", "Member")],
        default="member"
    )

    def __str__(self):
        tenant_name = self.tenant.name if self.tenant else "No Tenant"
        return f"{self.username} ({tenant_name})"

