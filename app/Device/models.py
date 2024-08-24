import uuid

from django.db import models


class Device(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    hostname = models.CharField(max_length=255, unique=True, blank=True, null=True)
    serial_number = models.CharField(max_length=250, unique=True)
    manufacturer = models.CharField(max_length=250)
    model = models.CharField(max_length=250)
    os_type = models.CharField(max_length=250)
    os_version = models.CharField(max_length=250)
    cpu = models.CharField(max_length=250)
    cpu_cores = models.IntegerField(null=True, blank=True)
    cpu_threads = models.IntegerField(null=True, blank=True)
    ram_total_gb = models.IntegerField(null=True, blank=True)
    disk_total_gb = models.IntegerField(null=True, blank=True)
    photo_url = models.URLField(max_length=200, blank=True, null=True)
    status = models.CharField(
        max_length=50,
        choices=[('available', 'Available'), ('assigned', 'Assigned'), ('repair', 'In Repair')],
        default='available'
    )
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['date_added']

    def __str__(self):
        return f"{self.manufacturer} {self.model} ({self.serial_number})"
