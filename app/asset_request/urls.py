from django.urls import path
from .views import AssetRequestListView, AssetRequestDetailView, MyAssetRequestListView, AssetRequestView

urlpatterns = [
    path('asset-requests/', AssetRequestListView.as_view(), name='asset_request_list'),
    path('asset-requests/my/', MyAssetRequestListView.as_view(), name='my_asset_request_list'),
    path('asset-requests/<uuid:pk>/', AssetRequestDetailView.as_view(), name='asset_request_detail'),
    path('asset-requests/process/', AssetRequestView.as_view(), name='asset_request_process'),
]
