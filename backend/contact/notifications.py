import logging
from django.conf import settings
from django.core.mail import EmailMessage
from django.utils import timezone

logger = logging.getLogger(__name__)


def notify_consultation(item):
    if not settings.CONSULTATION_EMAIL_ENABLED or item.notification_sent_at:
        return False
    try:
        message = EmailMessage(
            subject="New ABCX consultation request",
            body=(f"Reference: {item.reference}\nName: {item.name}\nEmail: {item.email}\n"
                  f"Service: {item.service}\nPreferred time: {item.preferred_time}\n\n"
                  "Review this request in the ABCX dashboard under Contact > Consultation requests."),
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.CONSULTATION_NOTIFICATION_EMAIL],
            reply_to=[item.email],
        )
        if message.send() != 1:
            return False
        item.notification_sent_at = timezone.now()
        item.save(update_fields=["notification_sent_at"])
        return True
    except Exception:
        # Delivery failures must not lose an enquiry or expose personal data in logs.
        logger.warning("Consultation notification failed for request %s", item.reference)
        return False
