from django.contrib import admin
from .models import Note

# Register your models here.
@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ("title", "tenant", "created_by", "created_at")
    search_fields = ("title", "content")
    list_filter = ("tenant",)