from django.urls import path

from .views import NotificationListView, NotificationCreateView, NotificationDetailView

urlpatterns = [
    path('notifications/', NotificationListView.as_view(), name='notification_list'),
    path('notifications/create/', NotificationCreateView.as_view(), name='notification_create'),
    path('notifications/<uuid:pk>/', NotificationDetailView.as_view(), name='notification_detail'),
]
