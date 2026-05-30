from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Task
        fields = (
            'id', 'title', 'description', 'stage', 'priority',
            'due_date', 'position', 'user', 'created_at', 'updated_at',
        )
        read_only_fields = ('id', 'user', 'created_at', 'updated_at')

    def validate_title(self, value):
        if len(value.strip()) < 1:
            raise serializers.ValidationError("Title cannot be empty.")
        return value.strip()


class TaskStageUpdateSerializer(serializers.Serializer):
    """Lightweight serializer for drag-and-drop stage changes."""
    stage = serializers.ChoiceField(choices=Task.STAGE_CHOICES)
    position = serializers.IntegerField(required=False, default=0)


class TaskReorderSerializer(serializers.Serializer):
    """Serializer for batch position updates."""
    tasks = serializers.ListField(
        child=serializers.DictField(
            child=serializers.IntegerField(),
        )
    )
