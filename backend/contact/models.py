import uuid
from django.db import models


class ConsultationRequest(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "New"
        CONTACTED = "contacted", "Contacted"
        SCHEDULED = "scheduled", "Scheduled"
        CLOSED = "closed", "Closed"

    reference = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    submission_id = models.UUIDField(unique=True)
    name = models.CharField(max_length=120)
    email = models.EmailField()
    service = models.CharField(max_length=120)
    preferred_time = models.CharField(max_length=200)
    status = models.CharField(max_length=12, choices=Status.choices, default=Status.NEW)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    notification_sent_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} — {self.service}"
