import uuid

from django.contrib.auth import get_user_model
from django.db import models

from app.device.models import Device

custom_user = get_user_model()


class Assignment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    user = models.ForeignKey(custom_user, on_delete=models.CASCADE)
    assigned_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=[('active', 'Active'), ('returned', 'Returned')])
    returned_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.device} assigned to {self.user} on {self.assigned_at}"
