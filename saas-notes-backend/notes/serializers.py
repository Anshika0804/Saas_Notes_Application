from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'tenant', 'created_by', 'title', 'content', 'created_at', 'updated_at']
        read_only_fields = ['id', 'tenant', 'created_by', 'created_at', 'updated_at']
