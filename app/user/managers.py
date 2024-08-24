from typing import TYPE_CHECKING
from django.core.exceptions import ValidationError
from django.contrib.auth.models import UserManager as DjangoUserManager

if TYPE_CHECKING:
    from .models import User  # noqa: F401

from app.user.models import TEAM_CHOICES, ROLE_TEAM_MAP

class UserManager(DjangoUserManager["User"]):
    """Custom manager for the User model."""

    def _create_user(self, email: str, password: str | None, **extra_fields):
        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError("The given email must be set")

        email = self.normalize_email(email)

        # Validate team and role against department, only if the user is not a superuser
        if not extra_fields.get('is_superuser', False):
            if 'department' in extra_fields and 'team' in extra_fields:
                if extra_fields['team'] not in dict(TEAM_CHOICES).get(extra_fields['department'], []):
                    raise ValidationError(f"Team '{extra_fields['team']}' is not valid for department '{extra_fields['department']}'.")

            if 'team' in extra_fields and 'role' in extra_fields:
                if extra_fields['role'] not in ROLE_TEAM_MAP.get(extra_fields['team'], []):
                    raise ValidationError(f"Role '{extra_fields['role']}' is not valid for team '{extra_fields['team']}'.")

        user = self.model(email=email, password=password, **extra_fields)
        user.save(using=self._db)
        return user

    def create_user(self, email: str, password: str | None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email: str, password: str | None, **extra_fields):
        if self.model.objects.filter(is_superuser=True).exists():
            raise ValidationError("There can be only one superuser.")

        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("department", "engineering")
        extra_fields.setdefault("team", "it")
        extra_fields.setdefault("role", "it_manager")

        return self._create_user(email, password, **extra_fields)
