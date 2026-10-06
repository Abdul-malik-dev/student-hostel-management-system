from django.db import models
from django.contrib.auth.models import User


# =========================================
# STUDENT PROFILE
# =========================================

class StudentProfile(models.Model):

    ROLE_CHOICES = [
        ("STUDENT", "Student"),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="student_profile"
    )

    full_name = models.CharField(
        max_length=150
    )

    phone = models.CharField(
        max_length=20
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="STUDENT"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.full_name


# =========================================
# HOSTEL
# =========================================

class Hostel(models.Model):

    name = models.CharField(
        max_length=100,
        unique=True
    )

    description = models.TextField(
        blank=True
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name


# =========================================
# BLOCK
# =========================================

class Block(models.Model):

    hostel = models.ForeignKey(
        Hostel,
        on_delete=models.CASCADE,
        related_name="blocks"
    )

    name = models.CharField(
        max_length=100
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["hostel", "name"],
                name="unique_block_per_hostel"
            )
        ]

    def __str__(self):
        return f"{self.hostel.name} - {self.name}"


# =========================================
# ROOM
# =========================================

class Room(models.Model):

    block = models.ForeignKey(
        Block,
        on_delete=models.CASCADE,
        related_name="rooms"
    )

    room_number = models.CharField(
        max_length=20
    )

    capacity = models.PositiveIntegerField(
        default=2
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["block", "room_number"],
                name="unique_room_per_block"
            )
        ]

    def __str__(self):
        return (
            f"{self.block.name} - "
            f"Room {self.room_number}"
        )


# =========================================
# BED
# =========================================

class Bed(models.Model):

    STATUS_CHOICES = [
        ("AVAILABLE", "Available"),
        ("OCCUPIED", "Occupied"),
        ("MAINTENANCE", "Maintenance"),
        ("INACTIVE", "Inactive"),
    ]

    room = models.ForeignKey(
        Room,
        on_delete=models.CASCADE,
        related_name="beds"
    )

    bed_number = models.CharField(
        max_length=20
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="AVAILABLE"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["room", "bed_number"],
                name="unique_bed_per_room"
            )
        ]

    def __str__(self):
        return (
            f"Room {self.room.room_number} "
            f"- Bed {self.bed_number}"
        )


# =========================================
# ROOM ALLOCATION
# =========================================

class RoomAllocation(models.Model):

    STATUS_CHOICES = [
        ("ACTIVE", "Active"),
        ("COMPLETED", "Completed"),
        ("CANCELLED", "Cancelled"),
    ]

    student = models.ForeignKey(
        StudentProfile,
        on_delete=models.CASCADE,
        related_name="room_allocations"
    )

    bed = models.ForeignKey(
        Bed,
        on_delete=models.PROTECT,
        related_name="allocations"
    )

    start_date = models.DateField()

    end_date = models.DateField(
        null=True,
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="ACTIVE"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["student"],
                condition=models.Q(status="ACTIVE"),
                name="one_active_allocation_per_student"
            ),
            models.UniqueConstraint(
                fields=["bed"],
                condition=models.Q(status="ACTIVE"),
                name="one_active_allocation_per_bed"
            ),
        ]

    def __str__(self):
        return (
            f"{self.student.full_name} - "
            f"{self.bed}"
        )
class Payment(models.Model):
    
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("VERIFIED", "Verified"),
        ("REJECTED", "Rejected"),
        ("OVERDUE", "Overdue"),
    ]

    student = models.ForeignKey(
            StudentProfile,
            on_delete=models.CASCADE,
            related_name="payments"
        )

    amount = models.DecimalField(
            max_digits=10,
            decimal_places=2
        )

    control_number = models.CharField(
            max_length=50,
            blank=True,
            null=True
        )

    payment_date = models.DateField(
            null=True,
            blank=True
        )

    status = models.CharField(
            max_length=20,
            choices=STATUS_CHOICES,
            default="PENDING"
        )

    rental_start = models.DateField(
        null=True,
        blank=True
    )

    rental_end = models.DateField(
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.student.full_name} - {self.amount} - {self.status}"