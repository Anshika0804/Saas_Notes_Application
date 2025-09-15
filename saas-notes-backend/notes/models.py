from django.db import models
from core.models import User, Tenant

# Create your models here.
class Note(models.Model):
    tenant = models.ForeignKey(
        Tenant,
        on_delete=models.CASCADE,
        related_name="notes"
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="notes"
    )
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  

    def __str__(self):
        tenant_name = self.tenant.name if self.tenant else "No Tenant"
        return f"{self.title} - {tenant_name}"
