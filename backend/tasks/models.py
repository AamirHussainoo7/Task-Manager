from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    STAGE_CHOICES = [
        ('TODO', 'Todo'),
        ('IN_PROGRESS', 'In Progress'),
        ('DONE', 'Done'),
    ]

    PRIORITY_CHOICES = [
        ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High'),
        ('URGENT', 'Urgent'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, default='')
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES, default='TODO')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='MEDIUM')
    due_date = models.DateField(null=True, blank=True)
    position = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['position', '-created_at']
        indexes = [
            models.Index(fields=['user', 'stage']),
            models.Index(fields=['user', 'priority']),
            models.Index(fields=['user', 'created_at']),
        ]

    def __str__(self):
        return self.title
