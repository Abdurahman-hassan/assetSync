from rest_framework import serializers
from Assets.models import Device

class DeviceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Device
        fields = ['id', 'serial_number', 'manufacturer', 'model', 'os_type', 'os_version', 'cpu', 'ram', 'storage', 'photo_url', 'status', 'date_added']
