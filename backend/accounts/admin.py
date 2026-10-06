from django.contrib import admin

from .models import (
    StudentProfile,
    Hostel,
    Block,
    Room,
    Bed,
    RoomAllocation,
    Payment,
)


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "phone",
        "role",
        "created_at",
    )


@admin.register(Hostel)
class HostelAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "is_active",
        "created_at",
    )


@admin.register(Block)
class BlockAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "hostel",
        "is_active",
        "created_at",
    )


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = (
        "room_number",
        "block",
        "capacity",
        "is_active",
        "created_at",
    )


@admin.register(Bed)
class BedAdmin(admin.ModelAdmin):
    list_display = (
        "bed_number",
        "room",
        "status",
        "created_at",
    )


@admin.register(RoomAllocation)
class RoomAllocationAdmin(admin.ModelAdmin):
    list_display = (
        "student",
        "bed",
        "start_date",
        "end_date",
        "status",
        "created_at",
    )


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = (
        "student",
        "amount",
        "control_number",
        "payment_date",
        "status",
        "rental_start",
        "rental_end",
        "created_at",
    )