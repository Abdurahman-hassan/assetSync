from django.urls import path
from django.conf import settings
from . import views

urlpatterns = [
    # =======
    path('api/devices/', views.DeviceList.as_view(), name='device-list'),
    path('api/devices/<int:pk>/', views.DeviceDetail.as_view(), name='device-detail'),
]
