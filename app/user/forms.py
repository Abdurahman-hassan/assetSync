from django import forms
from django.contrib.auth import forms as admin_forms
from django.forms import EmailField
from django.utils.translation import gettext_lazy as _
from .models import User

from .choices import TEAM_CHOICES, ROLE_TEAM_MAP

class UserAdminChangeForm(admin_forms.UserChangeForm):
    class Meta(admin_forms.UserChangeForm.Meta):  # type: ignore[name-defined]
        model = User
        field_classes = {"email": EmailField}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Check if 'team' and 'role' fields are present before trying to access them
        if 'team' in self.fields:
            self.fields['team'].choices = []
            if self.instance and self.instance.department:
                self.fields['team'].choices = TEAM_CHOICES.get(self.instance.department, [])

        if 'role' in self.fields:
            self.fields['role'].choices = []
            if self.instance and self.instance.team:
                self.fields['role'].choices = [(role, role.replace('_', ' ').title()) for role in
                                               ROLE_TEAM_MAP.get(self.instance.team, [])]

    def clean(self):
        cleaned_data = super().clean()
        department = cleaned_data.get('department')
        team = cleaned_data.get('team')
        role = cleaned_data.get('role')

        if department and team:
            allowed_teams = [team for team, _ in TEAM_CHOICES.get(department, [])]
            if team not in allowed_teams:
                raise forms.ValidationError(f"Team '{team}' is not valid for department '{department}'.")

        if team and role:
            allowed_roles = ROLE_TEAM_MAP.get(team, [])
            if role not in allowed_roles:
                raise forms.ValidationError(f"Role '{role}' is not valid for team '{team}'.")

        return cleaned_data


class UserAdminCreationForm(admin_forms.UserCreationForm):
    """
    Form for User Creation in the Admin Area.
    To change user signup, see UserSignupForm and UserSocialSignupForm.
    """

    class Meta(admin_forms.UserCreationForm.Meta):  # type: ignore[name-defined]
        model = User
        fields = ("email",)
        field_classes = {"email": EmailField}
        error_messages = {
            "email": {"unique": _("This email has already been taken.")},
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Check if 'team' and 'role' fields are present before trying to access them
        if 'team' in self.fields:
            self.fields['team'].choices = []
            if self.instance and self.instance.department:
                self.fields['team'].choices = TEAM_CHOICES.get(self.instance.department, [])

        if 'role' in self.fields:
            self.fields['role'].choices = []
            if self.instance and self.instance.team:
                self.fields['role'].choices = [(role, role.replace('_', ' ').title()) for role in
                                               ROLE_TEAM_MAP.get(self.instance.team, [])]

    def clean(self):
        cleaned_data = super().clean()
        department = cleaned_data.get('department')
        team = cleaned_data.get('team')
        role = cleaned_data.get('role')

        if department and team:
            allowed_teams = [team for team, _ in TEAM_CHOICES.get(department, [])]
            if team not in allowed_teams:
                raise forms.ValidationError(f"Team '{team}' is not valid for department '{department}'.")

        if team and role:
            allowed_roles = ROLE_TEAM_MAP.get(team, [])
            if role not in allowed_roles:
                raise forms.ValidationError(f"Role '{role}' is not valid for team '{team}'.")

        return cleaned_data
