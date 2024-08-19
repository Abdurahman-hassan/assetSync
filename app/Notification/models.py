from django.db import models
from user.models import User


class Notification(models.Model):
    notification_type = models.CharField(max_length=20)
    sent_at = models.DateTimeField(auto_now_add=True)
    recipient = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True) # foreign key from the user model
    message = models.TextField()
