from octo import logging
from rest_framework import generics, permissions
from ..utils.permissions import IsSuperUser, ModelPermissions
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from app.device.models import Device
from .serializers import DeviceHardwareDataSerializer

log = logging.Logger(__name__).get()


class DeviceListView(generics.ListCreateAPIView):
    """ API view to list all devices or create a new device (Admin only) """
    queryset = Device.objects.all()
    serializer_class = DeviceHardwareDataSerializer
    permission_classes = [IsSuperUser, ModelPermissions]


class DeviceDetailView(generics.RetrieveUpdateDestroyAPIView):
    """" API view to retrieve, update, or delete a specific device (Admin only)"""
    queryset = Device.objects.all()
    serializer_class = DeviceHardwareDataSerializer
    permission_classes = [IsSuperUser, ModelPermissions]


class DeviceHardwareRecevier(APIView):
    """ API view to receive hardware data from a device """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = DeviceHardwareDataSerializer(data=request.data)
        if serializer.is_valid():
            log.debug(f"Received serial_number: {serializer.validated_data['serial_number']}")
            device = Device.objects.filter(serial_number=serializer.validated_data['serial_number']).first()
            if device:
                log.debug("Device already exists")
                return Response({"message": "Device already exists"}, status=status.HTTP_200_OK)
            else:
                # Create a new device if the serial number does not exist
                Device.objects.create(**serializer.validated_data)
                log.debug("New device created")
                return Response({"message": "New device created"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
