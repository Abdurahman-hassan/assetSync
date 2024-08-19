from django.db import models
from user.models import User


class Device(models.Model):
    # STATUS_CHOICES = [
    #     ('active', 'Active'),
    #     ('inactive', 'Inactive'),
    # ]
    
    # DEVICE_TYPE_CHOICES = [
    #     ('phone', 'Phone'),
    #     ('laptop', 'Laptop'),
    # ]
    serial_number = models.CharField(max_length=255, unique=True)
    manufacturer = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    os_type = models.CharField(max_length=255)
    os_version = models.CharField(max_length=255)
    cpu = models.CharField(max_length=255)
    ram = models.CharField(max_length=255)
    storage = models.CharField(max_length=255)
    photo_url = models.URLField(blank=True, null=True)
    status = models.CharField(max_length=50, choices=[('active', 'Active'), ('inactive', 'Inactive')])
    date_added = models.DateTimeField(auto_now_add=True)

    
    class Meta:
        ordering = ['date_added']
