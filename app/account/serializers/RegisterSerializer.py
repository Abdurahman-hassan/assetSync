from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.utils.translation import gettext_lazy as _
import re
from app.user.models import User
from app.user.choices import TEAM_CHOICES, ROLE_TEAM_MAP
from .UserSerializer import UserSerializer

password_pattern = r"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"


class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(required=True, max_length=128, write_only=True)
    password = serializers.CharField(required=True, max_length=128, write_only=True)
    department = serializers.ChoiceField(choices=User._meta.get_field('department').choices, required=True)
    team = serializers.CharField(required=True)
    role = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ["id", "name", "username", "email", "password", "password2", "department", "team", "role"]
        extra_kwargs = {
            "email": {"required": True},
        }

    def validate_password(self, value):
        password = value
        password2 = self.initial_data.get("password2")
        if password != password2:
            raise serializers.ValidationError(_("Password fields didn't match"))

        if not re.match(password_pattern, value):
            raise serializers.ValidationError(
                _(
                    "The password must be at least 6 characters long and contain at least one uppercase letter, "
                    "one lowercase letter, one digit, and one special character (#?!@$%^&*-)."
                )
            )
        return value

    def validate(self, data):
        department = data.get("department")
        team = data.get("team")
        role = data.get("role")

        # Validate team against department
        if department and team:
            allowed_teams = [team_key for team_key, _ in TEAM_CHOICES.get(department, [])]
            if team not in allowed_teams:
                raise serializers.ValidationError(
                    {"team": f"Team '{team}' is not valid for department '{department}'."})

        # Validate role against team
        if team and role:
            allowed_roles = ROLE_TEAM_MAP.get(team, [])
            if role not in allowed_roles:
                raise serializers.ValidationError({"role": f"Role '{role}' is not valid for team '{team}'."})

        return data

    def create(self, validated_data):
        # Remove password2 from validated_data as it's not part of the User model
        validated_data.pop('password2', None)

        # Hash the password
        validated_data['password'] = make_password(validated_data.get('password'))

        # Create the user
        user = User.objects.create(**validated_data)

        return user

    def to_representation(self, instance):
        return UserSerializer(instance).data
