import uuid
from unittest.mock import patch
from django.core import mail
from django.core.cache import cache
from django.test import TestCase, override_settings
from rest_framework.test import APIClient
from .models import ConsultationRequest


@override_settings(EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend", CONSULTATION_EMAIL_ENABLED=True)
class ConsultationTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = APIClient()
        self.payload = dict(submission_id=str(uuid.uuid4()), name="Test Enquiry", email="test@example.com", service="Data & AI", preferred_time="Tuesday 10 AM IST")

    def submit(self, **changes):
        return self.client.post("/api/contact/consultations/", self.payload | changes, format="json")

    def test_save_notify_and_retry_without_duplicate(self):
        response = self.submit()
        self.assertEqual(response.status_code, 201)
        self.assertTrue(response.data["reference"])
        self.assertEqual(ConsultationRequest.objects.count(), 1)
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].reply_to, ["test@example.com"])
        self.assertEqual(self.submit().status_code, 200)
        self.assertEqual(ConsultationRequest.objects.count(), 1)
        self.assertEqual(len(mail.outbox), 1)

    def test_invalid_fields_not_saved(self):
        self.assertEqual(self.submit(email="invalid", name="   ").status_code, 400)
        self.assertFalse(ConsultationRequest.objects.exists())

    def test_email_failure_preserves_submission(self):
        with patch("contact.notifications.EmailMessage.send", side_effect=OSError):
            self.assertEqual(self.submit().status_code, 201)
        self.assertIsNone(ConsultationRequest.objects.get().notification_sent_at)

    def test_no_public_listing(self):
        self.assertEqual(self.client.get("/api/contact/consultations/").status_code, 405)
        self.assertEqual(self.client.get("/dashboard/contact/consultationrequest/").status_code, 302)

    def test_changed_retry_rejected(self):
        self.submit()
        self.assertEqual(self.submit(name="Different person").status_code, 409)
        self.assertEqual(ConsultationRequest.objects.count(), 1)

    def test_throttling(self):
        for _ in range(5):
            self.submit()
        self.assertEqual(self.submit().status_code, 429)
