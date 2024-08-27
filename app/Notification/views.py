from rest_framework import generics, permissions
from .models import Notification
from .serializers import NotificationSerializer
from ..utils.permissions import IsOwnerOrAdmin, ModelPermissions, IsStaff


# List all notifications for the authenticated user
class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Notification.objects.all()
        return Notification.objects.filter(recipient=user)


# Create a new notification (Admin only)
class NotificationCreateView(generics.CreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsStaff, ModelPermissions]


# Retrieve or delete a specific notification
class NotificationDetailView(generics.RetrieveDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsOwnerOrAdmin, ModelPermissions]

    def get_queryset(self):
        return Notification.objects.filter(recipient=self.request.user)
