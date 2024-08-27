from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import generics, permissions, status, serializers

from .models import AssetRequest
from .serializers import AssetRequestSerializer
from ..notification.models import Notification
from ..assignment.models import Assignment

User = get_user_model()


class AssetRequestListView(generics.ListCreateAPIView):
    serializer_class = AssetRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return AssetRequest.objects.all()
        return AssetRequest.objects.filter(user=user)

    def perform_create(self, serializer):
        request_type = self.request.data.get('request_type')
        user = self.request.user
        device = serializer.validated_data.get('device')

        # Check if there is already an active request for the same device
        existing_request = AssetRequest.objects.filter(user=user, device=device, status='pending').exists()
        if existing_request:
            raise serializers.ValidationError({"error": "You already have a pending request for this device."})

        assignment = Assignment.objects.filter(user=user, status='active').first()

        if request_type != 'new_device' and not assignment:
            raise serializers.ValidationError({"error": "No active device assignment found for this user."})

        device = assignment.device if assignment else None

        if request_type == 'new_device':
            if device:
                # Unassign the current device
                device.status = 'available'
                device.save()

                assignment.status = 'returned'
                assignment.returned_at = timezone.now()
                assignment.save()

                # Notifications
                Notification.objects.create(
                    recipient=user,
                    message=f"Your device {device.hostname} has been unassigned and is now available."
                )

                it_admins = User.objects.filter(is_staff=True)
                for admin in it_admins:
                    Notification.objects.create(
                        recipient=admin,
                        message=f"{user.username} has requested a new device. Their current device {device.hostname} has been unassigned."
                    )

        elif request_type == 'repair':
            if not device:
                raise serializers.ValidationError({"error": "You need an active device to request a repair."})

            # Mark the device as 'in repair'
            device.status = 'repair'
            device.save()

            # Notifications
            Notification.objects.create(
                recipient=user,
                message=f"Your device {device.hostname} is now in repair."
            )

            it_admins = User.objects.filter(is_staff=True)
            for admin in it_admins:
                Notification.objects.create(
                    recipient=admin,
                    message=f"Repair request for {device.hostname} has been submitted by {user.username}."
                )

        elif request_type == 'leave_company':
            if not device:
                raise serializers.ValidationError({"error": "You need an active device to request leave."})

            # Mark the assignment as 'returned' and device as 'available'
            assignment.status = 'returned'
            assignment.returned_at = timezone.now()
            assignment.save()

            device.status = 'available'
            device.save()

            # Notifications
            Notification.objects.create(
                recipient=user,
                message=f"You have requested to leave the company. Your device {device.hostname} is now available."
            )

            it_admins = User.objects.filter(is_staff=True)
            for admin in it_admins:
                Notification.objects.create(
                    recipient=admin,
                    message=f"{user.username} has initiated a leave company request. Their device {device.hostname} has been returned."
                )

        # Create the asset request
        serializer.save(user=user)
