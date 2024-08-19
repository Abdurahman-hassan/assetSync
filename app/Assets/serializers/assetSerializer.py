from rest_framework import serializers
from Assets.models import Asset

class AssetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Asset
        fields = ['id', 'serial_number', 'device_type', 'model', 'os_type', 'cpu', 'ram', 'storage', 'date_added', 'status', 'photo_url', 'assigned_to']
