from django.contrib.auth.models import User
from rest_framework import serializers

from .models import (
    StudentProfile,
    Hostel,
    Block,
    Room,
    Bed,
)


# =========================================
# STUDENT REGISTER SERIALIZER
# =========================================

class StudentRegisterSerializer(serializers.Serializer):

    full_name = serializers.CharField(
        max_length=150
    )

    username = serializers.CharField(
        max_length=150
    )

    phone = serializers.CharField(
        max_length=20
    )

    email = serializers.EmailField()

    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    confirm_password = serializers.CharField(
        write_only=True
    )

    def validate_username(self, value):

        if User.objects.filter(
            username=value
        ).exists():

            raise serializers.ValidationError(
                "Username already exists."
            )

        return value

    def validate_email(self, value):

        if User.objects.filter(
            email=value
        ).exists():

            raise serializers.ValidationError(
                "Email already exists."
            )

        return value

    def validate(self, data):

        if data["password"] != data["confirm_password"]:

            raise serializers.ValidationError(
                {
                    "confirm_password":
                    "Passwords do not match."
                }
            )

        return data

    def create(self, validated_data):

        validated_data.pop("confirm_password")

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        StudentProfile.objects.create(
            user=user,
            full_name=validated_data["full_name"],
            phone=validated_data["phone"],
            role="STUDENT",
        )

        return user


# =========================================
# BED SERIALIZER
# =========================================

class BedSerializer(serializers.ModelSerializer):

    class Meta:

        model = Bed

        fields = [
            "id",
            "bed_number",
            "status",
        ]


# =========================================
# ROOM SERIALIZER
# =========================================

class RoomSerializer(serializers.ModelSerializer):

    beds = BedSerializer(
        many=True,
        read_only=True
    )

    class Meta:

        model = Room

        fields = [
            "id",
            "room_number",
            "capacity",
            "is_active",
            "beds",
        ]


# =========================================
# BLOCK SERIALIZER
# =========================================

class BlockSerializer(serializers.ModelSerializer):

    rooms = RoomSerializer(
        many=True,
        read_only=True
    )

    class Meta:

        model = Block

        fields = [
            "id",
            "name",
            "is_active",
            "rooms",
        ]


# =========================================
# HOSTEL SERIALIZER
# =========================================

class HostelSerializer(serializers.ModelSerializer):

    blocks = BlockSerializer(
        many=True,
        read_only=True
    )

    class Meta:

        model = Hostel

        fields = [
            "id",
            "name",
            "description",
            "is_active",
            "blocks",
        ]


# =========================================
# STUDENT PROFILE SERIALIZER
# =========================================

class StudentProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    email = serializers.EmailField(
        source="user.email",
        read_only=True
    )

    class Meta:
        model = StudentProfile

        fields = [
            "id",
            "full_name",
            "username",
            "phone",
            "email",
            "role",
            "created_at"
        ]