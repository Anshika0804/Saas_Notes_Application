from rest_framework import permissions

class IsCreatorOrTenantAdmin(permissions.BasePermission):
    """
    Only allow the note creator or a tenant admin to update/delete.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.user.role == "ADMIN" and request.user.tenant == obj.tenant:
            return True

        return obj.created_by == request.user
