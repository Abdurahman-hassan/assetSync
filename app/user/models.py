from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from typing import ClassVar

from .choices import DEPARTMENT_CHOICES, ROLE_TEAM_MAP, TEAM_CHOICES
from .managers import UserManager


class User(AbstractUser):
    first_name = None  # type: ignore[assignment]
    last_name = None  # type: ignore[assignment]
    name = models.CharField(_("Name of User"), blank=False, max_length=90)
    email = models.EmailField(
        _("Email Address"),
        blank=False,
        unique=True,
    )
    email_verified = models.BooleanField(_("Email Verified"), default=False)
    avatar = models.ImageField(_("Avatar"), default="avatar.svg", upload_to="avatar/")
    department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES, blank=True, null=True)
    team = models.CharField(max_length=255, blank=True, null=True)
    role = models.CharField(max_length=50, blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects: ClassVar[UserManager] = UserManager()

    class Meta:
        ordering = ["-email"]
        indexes = [
            models.Index(fields=["email"]),
        ]

    def save(self, *args, **kwargs):
        if self.department:
            allowed_teams = TEAM_CHOICES.get(self.department, [])
            if self.team and (self.team not in [team for team, _ in allowed_teams]):
                raise ValidationError(f"Team '{self.team}' is not allowed in department '{self.department}'")
            if self.team:
                allowed_roles = ROLE_TEAM_MAP.get(self.team, [])
                if self.role and (self.role not in allowed_roles):
                    raise ValidationError(f"Role '{self.role}' is not allowed in team '{self.team}'")
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email
