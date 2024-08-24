from django.urls import path
from .views import DeviceListView, DeviceDetailView, DeviceHardwareRecevier

urlpatterns = [
    path('devices/', DeviceListView.as_view(), name='device_list'),
    path('devices/<uuid:pk>/', DeviceDetailView.as_view(), name='device_detail'),
    path('devices/hardware/recevie', DeviceHardwareRecevier.as_view(), name='device_hardware_data'),
]
