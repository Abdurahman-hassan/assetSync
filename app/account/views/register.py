from drf_spectacular.utils import extend_schema
from rest_framework.generics import CreateAPIView
from app.device.models import Device
from app.notification.models import Notification
from rest_framework import status
from app.utils.permissions import NotAuthenticatedPermission
from app.user.models import User
from app.assignment.models import Assignment
from app.account.serializers import RegisterSerializer, UserSerializer


class Register(CreateAPIView):
    """
    API view for user registration.
    Allows new users to create an account.
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [NotAuthenticatedPermission]

    @extend_schema(
        operation_id="Register a user account",
        summary="Register a new user account.",
        responses=UserSerializer,
    )
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_201_CREATED:
            user = User.objects.get(id=response.data['id'])
            self.assign_device_to_user(user)
        return response

    def assign_device_to_user(self, user):
        if user.department and user.team:
            suitable_devices = Device.objects.filter(status='available')
            device = None

            if user.department == 'engineering':
                # Special case for iOS team in Engineering department
                if user.team == 'ios':
                    device = suitable_devices.filter(os_type='MacOS').first()
                else:
                    device = self.get_suitable_device_for_engineering(user.team, suitable_devices)
            else:
                device = self.get_suitable_device_for_department(user.department, user.team, suitable_devices)

            if device:
                assignment = Assignment.objects.create(user=user, device=device, status='active')
                device.status = 'assigned'
                device.save()

                # Create notification for successful device assignment
                Notification.objects.create(
                    recipient=user,
                    message=f"Device {device.manufacturer} {device.model} has been assigned to you.",
                    type="device_assignment"
                )
            else:
                # Send notification to IT admin if no suitable device is found
                it_admins = User.objects.filter(is_staff=True, is_superuser=True)
                for admin in it_admins:
                    Notification.objects.create(
                        recipient=admin,
                        message=f"No suitable devices available for {user.name} ({user.team}). Please arrange a device.",
                        type="device_unavailable"
                    )

    def get_suitable_device_for_engineering(self, team, devices):
        """
        Logic to assign devices within the Engineering department (excluding iOS).
        """
        if team in ['android', 'backend', 'data_science']:
            # High-performance teams require high RAM and CPU
            return devices.filter(ram_total_gb__gte=16, cpu_cores__gte=4).first()

        elif team in ['frontend', 'ui_ux']:
            # Frontend and UI/UX teams need decent RAM and display, prefer Windows
            return devices.filter(ram_total_gb__gte=8, os_type='Windows').first()

        elif team in ['devops', 'cloud', 'sre']:
            # DevOps, Cloud, and SRE teams need powerful CPUs
            return devices.filter(cpu_cores__gte=8).first()

        elif team in ['qa']:
            # QA teams need machines that can handle multiple environments (VMs)
            return devices.filter(ram_total_gb__gte=12).first()

        elif team in ['security']:
            # Security teams may need specific OS like Linux
            return devices.filter(os_type='Linux').first()

        # Default fallback for Engineering department
        return devices.first()

    def get_suitable_device_for_department(self, department, team, devices):
        """
        Logic to assign devices based on department (excluding Engineering).
        """
        if department == 'sales':
            if team == 'sales':
                return devices.filter(ram_total_gb__gte=8).first()
            elif team == 'customer_support':
                return devices.filter(ram_total_gb__lte=8).first()

        elif department == 'hr':
            if team == 'hr':
                return devices.filter(ram_total_gb__lte=8).first()
            elif team == 'it_support':
                return devices.filter(cpu_cores__gte=4, ram_total_gb__gte=8).first()

        elif department == 'business':
            if team == 'business_analysis':
                return devices.filter(ram_total_gb__gte=8).first()
            elif team in ['marketing', 'product_management', 'project_management']:
                return devices.filter(ram_total_gb__gte=8).first()

        # Default fallback for all other departments
        return devices.first()
