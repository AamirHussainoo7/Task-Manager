from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count, Q
from .models import Task
from .serializers import TaskSerializer, TaskStageUpdateSerializer, TaskReorderSerializer
from .filters import TaskFilter


class TaskViewSet(viewsets.ModelViewSet):
    """
    Full CRUD for tasks. All queries are scoped to the authenticated user.
    
    Endpoints:
        GET    /api/tasks/            — list tasks (supports filtering & search)
        POST   /api/tasks/            — create a task
        GET    /api/tasks/{id}/       — retrieve a task
        PUT    /api/tasks/{id}/       — update a task
        PATCH  /api/tasks/{id}/       — partial update
        DELETE /api/tasks/{id}/       — delete a task
        PATCH  /api/tasks/{id}/stage/ — update stage (for drag-and-drop)
        POST   /api/tasks/reorder/    — batch update positions
        GET    /api/tasks/statistics/ — dashboard stats
    """
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_class = TaskFilter
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'updated_at', 'priority', 'due_date', 'position']

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Place new tasks at the top of their column
        stage = serializer.validated_data.get('stage', 'TODO')
        max_position = (
            Task.objects.filter(user=self.request.user, stage=stage)
            .count()
        )
        serializer.save(user=self.request.user, position=max_position)

    @action(detail=True, methods=['patch'], url_path='stage')
    def update_stage(self, request, pk=None):
        """Update a task's stage and position — used for drag-and-drop."""
        task = self.get_object()
        serializer = TaskStageUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        task.stage = serializer.validated_data['stage']
        task.position = serializer.validated_data.get('position', 0)
        task.save(update_fields=['stage', 'position', 'updated_at'])

        return Response(TaskSerializer(task).data)

    @action(detail=False, methods=['post'], url_path='reorder')
    def reorder(self, request):
        """Batch update task positions after drag-and-drop."""
        serializer = TaskReorderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        task_updates = serializer.validated_data['tasks']
        user_task_ids = set(
            Task.objects.filter(user=request.user).values_list('id', flat=True)
        )

        for item in task_updates:
            task_id = item.get('id')
            position = item.get('position', 0)
            if task_id in user_task_ids:
                Task.objects.filter(id=task_id).update(position=position)

        return Response({'message': 'Tasks reordered.'})

    @action(detail=False, methods=['get'], url_path='statistics')
    def statistics(self, request):
        """Dashboard statistics for the authenticated user."""
        qs = Task.objects.filter(user=request.user)
        stats = qs.aggregate(
            total=Count('id'),
            todo=Count('id', filter=Q(stage='TODO')),
            in_progress=Count('id', filter=Q(stage='IN_PROGRESS')),
            done=Count('id', filter=Q(stage='DONE')),
            high_priority=Count('id', filter=Q(priority__in=['HIGH', 'URGENT'])),
        )
        return Response(stats)
