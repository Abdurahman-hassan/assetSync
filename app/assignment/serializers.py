from rest_framework import serializers
from .models import Assignment


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['id', 'device', 'user', 'assigned_at', 'status', 'returned_at']
        read_only_fields = ['id', 'assigned_at']
