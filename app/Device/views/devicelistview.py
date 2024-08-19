from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from app.Device.models import Device
from app.Device.serializers import DeviceSerializer
from rest_framework import status

class DeviceList(APIView):
    """
    List the assets on the system
    """
    def get(self, request, format=None):
        devices = Device.objects.all()
        serializer = DeviceSerializer(devices, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = DeviceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
