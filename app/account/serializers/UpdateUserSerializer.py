from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.utils.translation import gettext_lazy as _
import re
from app.user.models import User
from app.user.choices import TEAM_CHOICES, ROLE_TEAM_MAP

password_pattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"


class UpdateUserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        required=False, max_length=128, min_length=5, write_only=True
    )
    password = serializers.CharField(
        required=False, max_length=128, min_length=5, write_only=True
    )
    department = serializers.ChoiceField(choices=User._meta.get_field('department').choices, required=False, allow_null=True)
    team = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    role = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = User
        fields = ["id", "name", "username", "email", "password", "password2", "avatar", "department", "team", "role"]
        extra_kwargs = {
            "email": {"required": False},
            "name": {"required": False},
            "username": {"required": False},
        }

    def validate_password(self, value):
        password = value
        password2 = self.initial_data.get("password2")

        if password != password2:
            raise serializers.ValidationError(_("Password fields didn't match"))

        password_check = re.match(password_pattern, value)
        if password_check is None:
            raise serializers.ValidationError(
                _(
                    "The password must be at least 6 characters long and contain at least one uppercase letter, "
                    "one lowercase letter, one digit, and one special character (#?!@$%^&*-)."
                )
            )

        return make_password(value)

    def validate(self, data):
        department = data.get("department")
        team = data.get("team")
        role = data.get("role")

        # Validate team against department
        if department and team:
            allowed_teams = [team for team, _ in TEAM_CHOICES.get(department, [])]
            if team not in allowed_teams:
                raise serializers.ValidationError({"team": f"Team '{team}' is not valid for department '{department}'."})

        # Validate role against team
        if team and role:
            allowed_roles = ROLE_TEAM_MAP.get(team, [])
            if role not in allowed_roles:
                raise serializers.ValidationError({"role": f"Role '{role}' is not valid for team '{team}'."})

        return data

