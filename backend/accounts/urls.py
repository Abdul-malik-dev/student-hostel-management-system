from django.urls import path

from .views import (
    StudentRegisterView,
    StudentLoginView,
    StudentProfileView,
    WardenDashboardView,
    WardenRoomsBedsView,
)


urlpatterns = [

    # =========================
    # STUDENT AUTHENTICATION
    # =========================

    path(
        "register/",
        StudentRegisterView.as_view(),
        name="student-register"
    ),

    path(
        "login/",
        StudentLoginView.as_view(),
        name="student-login"
    ),

    # =========================
    # STUDENT PROFILE
    # =========================

    path(
        "student/profile/",
        StudentProfileView.as_view(),
        name="student-profile"
    ),

    # =========================
    # WARDEN
    # =========================

    path(
        "warden/dashboard/",
        WardenDashboardView.as_view(),
        name="warden-dashboard"
    ),

    path(
        "warden/rooms/",
        WardenRoomsBedsView.as_view(),
        name="warden-rooms"
    ),
]