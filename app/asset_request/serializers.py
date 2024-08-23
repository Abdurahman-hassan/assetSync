from rest_framework import serializers
from .models import AssetRequest


class AssetRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetRequest
        fields = ['id', 'user', 'request_type', 'device', 'description', 'status', 'requested_at', 'processed_at']
        read_only_fields = ['id', 'user', 'requested_at', 'processed_at', 'status']

    def create(self, validated_data):
        request = self.context['request']
        validated_data['user'] = request.user
        return super().create(validated_data)
