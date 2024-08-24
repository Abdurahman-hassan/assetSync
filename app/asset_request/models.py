import uuid

from django.contrib.auth import get_user_model
from django.db import models

from app.device.models import Device

custom_user = get_user_model()


class AssetRequest(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    REQUEST_TYPES = [
        ('new_device', 'New Device'),
        ('repair', 'Repair'),
        ('upgrade', 'Upgrade'),
        ('leave_company', 'Leave Company'),
    ]
    user = models.ForeignKey(custom_user, on_delete=models.CASCADE)
    request_type = models.CharField(max_length=50, choices=REQUEST_TYPES)
    device = models.ForeignKey(Device, on_delete=models.SET_NULL, blank=True, null=True)
    description = models.TextField()
    status = models.CharField(
        max_length=50,
        choices=[('pending', 'Pending'), ('approved', 'Approved'), ('denied', 'Denied')],
        default='pending'
    )
    requested_at = models.DateTimeField(auto_now_add=True)
    processed_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.request_type} request by {self.user} on {self.requested_at}"
