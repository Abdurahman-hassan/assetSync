from rest_framework import generics
from .models import Assignment
from .serializers import AssignmentSerializer
from ..utils.permissions import IsStaff, ModelPermissions, IsOwnerOrAdmin


# List all assignments (Admin) or the user's own assignments
class AssignmentListView(generics.ListCreateAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return Assignment.objects.all()
        return Assignment.objects.filter(user=user)


# Retrieve, update, or delete a specific assignment (Admin or the user)
class AssignmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return Assignment.objects.all()
        return Assignment.objects.filter(user=user)
