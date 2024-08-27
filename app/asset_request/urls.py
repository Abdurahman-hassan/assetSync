from django.urls import path
from .views import (
    AssetRequestListView
)

urlpatterns = [
    path('asset-requests/', AssetRequestListView.as_view(), name='asset_request_list'),
]
