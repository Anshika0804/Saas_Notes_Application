from rest_framework import generics, permissions
from .permissions import IsCreatorOrTenantAdmin
from rest_framework.exceptions import PermissionDenied
from .models import Note
from .serializers import NoteSerializer

class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(tenant=self.request.user.tenant)

    def perform_create(self, serializer):
        tenant = self.request.user.tenant
        
        if tenant.plan == "free" and tenant.notes.count() >= 3:
            raise PermissionDenied("Free plan limit reached (max 3 notes). Please upgrade to Pro.")

        serializer.save(
            created_by=self.request.user,
            tenant=tenant
        )

class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated, IsCreatorOrTenantAdmin]

    def get_queryset(self):
        # Tenant isolation
        return Note.objects.filter(tenant=self.request.user.tenant)
