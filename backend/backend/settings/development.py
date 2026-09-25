from .base import *  # noqa: F403

from decouple import config


SECRET_KEY = config(
    "SECRET_KEY",
    default="django-insecure-change-me-before-sharing-dev-builds",
)
DEBUG = True

ALLOWED_HOSTS = list(  # type: ignore[assignment]  # noqa: F405
    dict.fromkeys([*ALLOWED_HOSTS, "127.0.0.1", "localhost", "0.0.0.0"])  # noqa: F405
)
CORS_ALLOWED_ORIGINS = CORS_ALLOWED_ORIGINS or [  # type: ignore[assignment]  # noqa: F405
    "http://127.0.0.1:3000",
    "http://localhost:3000",
]
CSRF_TRUSTED_ORIGINS = CSRF_TRUSTED_ORIGINS or [  # type: ignore[assignment]  # noqa: F405
    "http://127.0.0.1:3000",
    "http://localhost:3000",
]

SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
SECURE_SSL_REDIRECT = False

EMAIL_BACKEND = config("EMAIL_BACKEND", default="django.core.mail.backends.console.EmailBackend")
