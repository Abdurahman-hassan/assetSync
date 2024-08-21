from django.db import models
from user.models import User


class Asset(models.Model):
    # STATUS_CHOICES = [
    #     ('active', 'Active'),
    #     ('inactive', 'Inactive'),
    # ]
    
    # DEVICE_TYPE_CHOICES = [
    #     ('phone', 'Phone'),
    #     ('laptop', 'Laptop'),
    # ]

    serial_number = models.CharField(max_length=100, unique=True)
    device_type = models.CharField(max_length=50)
    model = models.CharField(max_length=100)
    os_type = models.CharField(max_length=50)
    cpu = models.CharField(max_length=50)
    ram = models.CharField(max_length=50)
    storage = models.CharField(max_length=50)
    date_added = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20)
    photo_url = models.URLField(max_length=200, blank=True, null=True)
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True) # foreign key from the user model
    
    class Meta:
        ordering = ['date_added']
