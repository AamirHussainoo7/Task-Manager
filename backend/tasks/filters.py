import django_filters
from .models import Task


class TaskFilter(django_filters.FilterSet):
    stage = django_filters.ChoiceFilter(choices=Task.STAGE_CHOICES)
    priority = django_filters.ChoiceFilter(choices=Task.PRIORITY_CHOICES)
    search = django_filters.CharFilter(field_name='title', lookup_expr='icontains')
    due_before = django_filters.DateFilter(field_name='due_date', lookup_expr='lte')
    due_after = django_filters.DateFilter(field_name='due_date', lookup_expr='gte')

    class Meta:
        model = Task
        fields = ['stage', 'priority', 'search', 'due_before', 'due_after']
