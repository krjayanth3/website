from django.contrib import admin, messages
from .models import ConsultationRequest
from .notifications import notify_consultation


@admin.register(ConsultationRequest)
class ConsultationRequestAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "service", "preferred_time", "status", "created_at", "notification_sent_at")
    list_filter = ("status", "created_at", "service")
    search_fields = ("name", "email", "service", "preferred_time")
    readonly_fields = ("reference", "submission_id", "name", "email", "service", "preferred_time", "created_at", "notification_sent_at")
    actions = ["retry_notifications"]

    def has_add_permission(self, request):
        return False

    @admin.action(description="Retry unsent email notifications")
    def retry_notifications(self, request, queryset):
        sent = sum(notify_consultation(item) for item in queryset.filter(notification_sent_at__isnull=True))
        self.message_user(request, f"{sent} notification(s) sent. Unsent requests remain saved.", messages.INFO)
