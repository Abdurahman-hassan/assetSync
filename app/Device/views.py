from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from app.device.models import Device
from app.assignment.models import Assignment
from .serializers import DeviceHardwareDataSerializer


class DeviceListView(generics.ListCreateAPIView):
    """ API view to list all devices or create a new device if admin or return the
    device related to the user """
    serializer_class = DeviceHardwareDataSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned devices to the ones assigned to
        the currently authenticated user.
        """
        user = self.request.user
        if user.is_superuser:
            return Device.objects.all()
        # Filter devices based on the assignments
        assigned_device_ids = Assignment.objects.filter(user=user).values_list('device_id', flat=True)
        return Device.objects.filter(id__in=assigned_device_ids)

    def perform_create(self, serializer):
        """
        Save the user who created the device.
        """
        if not self.request.user.is_superuser:
            raise PermissionDenied("You do not have permission to create a device.")
        serializer.save()

    def post(self, request, *args, **kwargs):
        """
        Handle the POST request to create a device.
        """
        if not request.user.is_superuser:
            return Response({"detail": "You do not have permission to create a device."}, status=status.HTTP_403_FORBIDDEN)
        return super().post(request, *args, **kwargs)


class DeviceDetailView(generics.RetrieveUpdateDestroyAPIView):
    """" API view to retrieve, update, or delete a specific device (Admin only)"""
    serializer_class = DeviceHardwareDataSerializer

    def get_queryset(self):
        """
        Restrict the queryset to the device being accessed.
        """
        user = self.request.user
        device_id = self.kwargs.get('pk')
        if user.is_superuser:
            return Device.objects.filter(id=device_id)
        assigned_device_ids = Assignment.objects.filter(user=user).values_list('device_id', flat=True)
        return Device.objects.filter(id=device_id, id__in=assigned_device_ids)


class DeviceHardwareRecevier(APIView):
    """ API view to receive hardware data from a device """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = DeviceHardwareDataSerializer(data=request.data)
        if serializer.is_valid():
            device = Device.objects.filter(serial_number=serializer.validated_data['serial_number']).first()
            if device:
                return Response({"message": "Device already exists"}, status=status.HTTP_200_OK)
            else:
                # Create a new device if the serial number does not exist
                Device.objects.create(**serializer.validated_data)
                return Response({"message": "New device created"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
