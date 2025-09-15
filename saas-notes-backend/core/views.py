from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from .models import Tenant

User = get_user_model()

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.IsAuthenticated] 

    def perform_create(self, serializer):
        if self.request.user.role != "admin":
            raise PermissionDenied("Only tenant admins can invite users.")
        serializer.save(tenant=self.request.user.tenant)



class TenantUpgradeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, slug):
        tenant = Tenant.objects.get(slug=slug)

        # Only Admins of this tenant can upgrade
        if request.user.role != "admin" or request.user.tenant != tenant:
            raise PermissionDenied("Only tenant admins can upgrade the subscription.")

        tenant.plan = "pro"
        tenant.save()

        return Response(
            {"message": f"{tenant.name} upgraded to Pro plan successfully."},
            status=status.HTTP_200_OK
        )
    

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        tenant = user.tenant
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "tenant": {
                "id": tenant.id if tenant else None,
                "name": tenant.name if tenant else None,
                "slug": tenant.slug if tenant else None,
                "plan": tenant.plan if tenant else None,
            }
        })
