from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Tenant

User = get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password") 
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        tenant = validated_data.pop("tenant", None)  
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.role = "member"
        if tenant:
            user.tenant = tenant
        user.set_password(password)
        user.save()
        return user


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "role")
