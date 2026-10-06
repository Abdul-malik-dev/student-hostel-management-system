from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    StudentProfile,
    Hostel,
    Room,
    Bed,
    RoomAllocation,
    Payment,
)

from .serializers import (
    StudentRegisterSerializer,
    HostelSerializer,
    StudentProfileSerializer,
)


# =========================================
# STUDENT REGISTER
# =========================================

class StudentRegisterView(APIView):

    def post(self, request):

        serializer = StudentRegisterSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message":
                    "Student account created successfully."
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# =========================================
# LOGIN
# =========================================

class StudentLoginView(APIView):

    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(
            username=username,
            password=password
        )

        if user is None:

            return Response(
                {
                    "detail":
                    "Invalid username or password."
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        if user.is_superuser:

            role = "ADMIN"

        elif user.groups.filter(
            name="Warden"
        ).exists():

            role = "WARDEN"

        elif hasattr(
            user,
            "student_profile"
        ):

            role = "STUDENT"

        else:

            role = "UNKNOWN"

        return Response(
            {
                "message":
                "Login successful.",

                "username":
                user.username,

                "role":
                role,
            },

            status=status.HTTP_200_OK
        )


# =========================================
# STUDENT PROFILE
# =========================================

class StudentProfileView(APIView):

    def get(self, request):

        username = request.query_params.get("username")

        if not username:
            return Response(
                {
                    "detail": "Username is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            student = (
                StudentProfile.objects
                .select_related("user")
                .get(user__username=username)
            )

        except StudentProfile.DoesNotExist:
            return Response(
                {
                    "detail": "Student profile not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = StudentProfileSerializer(student)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


# =========================================
# WARDEN DASHBOARD
# =========================================

class WardenDashboardView(APIView):

    def get(self, request):

        total_students = (
            StudentProfile.objects.count()
        )

        total_rooms = (
            Room.objects
            .filter(is_active=True)
            .count()
        )

        total_beds = (
            Bed.objects
            .filter(
                status__in=[
                    "AVAILABLE",
                    "OCCUPIED"
                ]
            )
            .count()
        )

        occupied_beds = (
            RoomAllocation.objects
            .filter(status="ACTIVE")
            .count()
        )

        available_beds = (
            total_beds - occupied_beds
        )

        # =================================
        # CONFIRMED STUDENTS
        # =================================

        confirmed_students = []

        active_allocations = (
            RoomAllocation.objects
            .filter(status="ACTIVE")
            .select_related(
                "student",
                "bed",
                "bed__room"
            )
            .order_by("-created_at")[:10]
        )

        for allocation in active_allocations:

            payment = (
                Payment.objects
                .filter(
                    student=allocation.student,
                    status="VERIFIED"
                )
                .order_by(
                    "-payment_date",
                    "-created_at"
                )
                .first()
            )

            if payment:

                rental_period = "-"

                if (
                    payment.rental_start
                    and payment.rental_end
                ):

                    rental_period = (
                        f"{payment.rental_start.strftime('%d %b %Y')}"
                        f" – "
                        f"{payment.rental_end.strftime('%d %b %Y')}"
                    )

                confirmed_students.append(
                    {
                        "name":
                        allocation.student.full_name,

                        "room":
                        allocation.bed.room.room_number,

                        "bed":
                        allocation.bed.bed_number,

                        "payment":
                        "Verified",

                        "status":
                        "Ready",

                        "rental":
                        rental_period,
                    }
                )

        return Response(
            {
                "total_students":
                total_students,

                "total_rooms":
                total_rooms,

                "total_beds":
                total_beds,

                "occupied_beds":
                occupied_beds,

                "available_beds":
                available_beds,

                "confirmed_students":
                confirmed_students,
            }
        )


# =========================================
# WARDEN ROOMS & BEDS
# =========================================

class WardenRoomsBedsView(APIView):

    def get(self, request):

        hostels = (
            Hostel.objects
            .filter(is_active=True)
            .prefetch_related(
                "blocks__rooms__beds"
            )
        )

        serializer = HostelSerializer(
            hostels,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )