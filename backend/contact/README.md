# Consultation requests

Visitors submit from `/contact` to the same-origin Next endpoint `/api/consultations`, which forwards validated requests to Django `/api/contact/consultations/`. Requests are stored in the configured Django database. There is no public listing endpoint.

Open `/dashboard/contact/consultationrequest/` on the Django server and sign in with an existing staff account. Search by name/email/service, filter by status/date, and update status or internal notes. Original submission details are read-only. UUID submission keys prevent duplicate records after a network retry.

## Email notifications

Alerts are disabled by default until an email provider is configured. Set the following in backend `.env`, using the provider's verified sender and credentials, then restart Django:

```
CONSULTATION_EMAIL_ENABLED=True
CONSULTATION_NOTIFICATION_EMAIL=directors@abcx.co.in
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=<provider SMTP host>
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=<provider username>
EMAIL_HOST_PASSWORD=<provider password or app password>
DEFAULT_FROM_EMAIL=<verified sender address>
```

Do not put credentials in frontend variables or source control. The email Reply-To is the visitor's validated email. A failed alert never removes the stored request. Select unsent records in the admin and choose “Retry unsent email notifications” after fixing delivery. The notification timestamp records SMTP/backend acceptance, not guaranteed inbox delivery.

This collects requests; it does not reserve calendar slots or send visitor booking confirmations. For production traffic, use shared Django cache and gateway rate limits; the built-in per-email throttle is a basic safeguard, not complete spam protection.

Tests: `../test/bin/python manage.py test contact`
Migration: `../test/bin/python manage.py migrate`
