from rest_framework import serializers

from app.device.models import Device


class DeviceHardwareDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = [
            'hostname', 'serial_number', 'manufacturer', 'model',
            'os_type', 'os_version', 'cpu', 'cpu_cores',
            'cpu_threads', 'ram_total_gb', 'disk_total_gb',
            'photo_url', 'status'
        ]
