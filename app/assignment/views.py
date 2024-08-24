from rest_framework import generics, permissions
from .models import Assignment
from .serializers import AssignmentSerializer
from ..utils.permissions import IsStaff, ModelPermissions, IsOwnerOrAdmin


# List all assignments or create a new assignment (Admin only)
class AssignmentListView(generics.ListCreateAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [IsStaff, ModelPermissions]


# Retrieve, update, or delete a specific assignment (Admin only)
class AssignmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [IsOwnerOrAdmin, ModelPermissions]
