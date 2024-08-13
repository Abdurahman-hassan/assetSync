import pytest
from django.urls import reverse
from octo.utils.generate import generate_register, generate_image
from app.user.factories import password
from rest_framework import status
from app.user.models import User
from django.contrib.auth.hashers import check_password


@pytest.mark.asset_sync
def test_update_200(client, user):
    client.login(email=user.email, password=password)
    data_register = generate_register()

    data_register["avatar"] = generate_image()

    response = client.put(reverse("user_update"), data_register, format="multipart")

    assert response.status_code == status.HTTP_200_OK
    assert response.data["email"]["value"] == data_register["email"]
    assert not response.data["email"]["verified"]
    assert response.data["name"] == data_register["name"]
    assert response.data["username"] == data_register["username"]
    assert response.data["avatar"].split("/")[3] != "avatar.svg"

    _user = User.objects.get(id=user.id)
    assert check_password(data_register["password"], _user.password)
