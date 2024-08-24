from django.urls import path

from .views import AssignmentListView, AssignmentDetailView

urlpatterns = [
    path('assignments/', AssignmentListView.as_view(), name='assignment_list'),
    path('assignments/<uuid:pk>/', AssignmentDetailView.as_view(), name='assignment_detail'),
]
