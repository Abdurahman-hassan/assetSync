from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status, serializers
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import AssetRequest
from .serializers import AssetRequestSerializer
from ..device.models import Device
from ..notification.models import Notification
from ..assignment.models import Assignment

from ..utils.permissions import IsStaff, ModelPermissions, IsOwnerOrAdmin

user = get_user_model()

# # List all asset requests (Admin only)
# class AssetRequestListView(generics.ListCreateAPIView):
#     queryset = AssetRequest.objects.all()
#     serializer_class = AssetRequestSerializer
#     permission_classes = [IsStaff, ModelPermissions]
class AssetRequestListView(generics.ListCreateAPIView):
    serializer_class = AssetRequestSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return AssetRequest.objects.all()
        return AssetRequest.objects.filter(user=user)

    def perform_create(self, serializer):
        user = self.request.user
        device = serializer.validated_data.get('device')
        # Ensure the device is assigned to the user
        if not Assignment.objects.filter(user=user, device=device, status='active').exists():
            raise serializers.ValidationError("You can only request devices assigned to you.")
        serializer.save(user=user)

# List asset requests made by the current user
class MyAssetRequestListView(generics.ListAPIView):
    serializer_class = AssetRequestSerializer
    permission_classes = [IsOwnerOrAdmin, ModelPermissions]

    def get_queryset(self):
        return AssetRequest.objects.filter(user=self.request.user)


# Retrieve a specific asset request
class AssetRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AssetRequest.objects.all()
    serializer_class = AssetRequestSerializer
    permission_classes = [IsOwnerOrAdmin, ModelPermissions]

    def get_queryset(self):
        # Admins can view all requests; users can only view their own requests
        if self.request.user.is_staff:
            return AssetRequest.objects.all()
        return AssetRequest.objects.filter(user=self.request.user)


class AssetRequestView(APIView):
    """Handle different asset requests, such as leave company and repairs."""
    def post(self, request, *args, **kwargs):
        request_type = request.data.get('request_type')
        if request_type == 'leave_company':
            device = Device.objects.filter(assigned_to=request.user).first()
            if device:
                device.status = 'returned'
                device.assigned_to = None
                device.save()

                it_admins = user.objects.filter(is_staff=True, is_superuser=True)
                for admin in it_admins:
                    Notification.objects.create(
                        recipient=admin,
                        message=f"{request.user.name} has initiated a leave company request.",
                        type="leave_request"
                    )

        elif request_type == 'repair':
            device_id = request.data.get('device_id')
            device = Device.objects.get(id=device_id)
            if device:
                device.status = 'in repair'
                device.save()

                it_admins = user.objects.filter(is_staff=True, is_superuser=True)
                for admin in it_admins:
                    Notification.objects.create(
                        recipient=admin,
                        message=f"Repair request for {device.hostname} has been submitted.",
                        type="repair_request"
                    )

        return Response({"status": "Request processed"}, status=status.HTTP_200_OK)
