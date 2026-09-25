from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse

from django.core.exceptions import ImproperlyConfigured
from decouple import Csv, config


BASE_DIR = Path(__file__).resolve().parent.parent.parent


def csv_setting(name: str, default: str = "") -> list[str]:
    return [value for value in config(name, default=default, cast=Csv()) if value]


def database_from_url(database_url: str) -> dict:
    parsed = urlparse(database_url)
    engine_map = {
        "postgres": "django.db.backends.postgresql",
        "postgresql": "django.db.backends.postgresql",
    }
    engine = engine_map.get(parsed.scheme)

    if not engine:
        raise ValueError(
            "DATABASE_URL must use a PostgreSQL scheme such as postgres:// or postgresql://."
        )

    options = {
        key: values[-1]
        for key, values in parse_qs(parsed.query).items()
        if values
    }

    return {
        "ENGINE": engine,
        "NAME": unquote(parsed.path.lstrip("/")) or config("DB_NAME", default="abcx_website"),
        "USER": unquote(parsed.username or config("DB_USER", default="postgres")),
        "PASSWORD": unquote(parsed.password or config("DB_PASSWORD", default="postgres")),
        "HOST": parsed.hostname or config("DB_HOST", default="127.0.0.1"),
        "PORT": parsed.port or config("DB_PORT", default=5432, cast=int),
        "CONN_MAX_AGE": config("DB_CONN_MAX_AGE", default=60, cast=int),
        "OPTIONS": options,
    }


INSTALLED_APPS = [
    "corsheaders",
    "rest_framework",
    "content",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "accounts",
    "blog",
    "careers",
    "contact",
    "portfolio",
    "services",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"
ASGI_APPLICATION = "backend.asgi.application"

DATABASE_URL = config("DATABASE_URL", default="")
DATABASE_ENGINE = config("DB_ENGINE", default="django.db.backends.postgresql")

if DATABASE_ENGINE in {"postgres", "postgresql"}:
    DATABASE_ENGINE = "django.db.backends.postgresql"

if DATABASE_URL:
    DATABASES = {"default": database_from_url(DATABASE_URL)}
else:
    if DATABASE_ENGINE == "django.db.backends.sqlite3":
        DATABASES = {
            "default": {
                "ENGINE": DATABASE_ENGINE,
                "NAME": config("DB_NAME", default=str(BASE_DIR / "db.sqlite3")),
            }
        }
    elif DATABASE_ENGINE != "django.db.backends.postgresql":
        raise ImproperlyConfigured(
            "Unsupported database engine. Use PostgreSQL via DATABASE_URL or "
            "DB_ENGINE=django.db.backends.postgresql, or explicitly set "
            "DB_ENGINE=django.db.backends.sqlite3 for local fallback."
        )
    else:
        database_options: dict[str, str] = {}
        db_sslmode = config("DB_SSLMODE", default="")
        if db_sslmode:
            database_options["sslmode"] = db_sslmode

        DATABASES = {
            "default": {
                "ENGINE": DATABASE_ENGINE,
                "NAME": config("DB_NAME", default="abcx_website"),
                "USER": config("DB_USER", default="postgres"),
                "PASSWORD": config("DB_PASSWORD", default="postgres"),
                "HOST": config("DB_HOST", default="127.0.0.1"),
                "PORT": config("DB_PORT", default=5432, cast=int),
                "CONN_MAX_AGE": config("DB_CONN_MAX_AGE", default=60, cast=int),
                "OPTIONS": database_options,
            }
        }

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = config("TIME_ZONE", default="UTC")
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

ALLOWED_HOSTS = csv_setting("ALLOWED_HOSTS")
CORS_ALLOWED_ORIGINS = csv_setting("CORS_ALLOWED_ORIGINS")
CSRF_TRUSTED_ORIGINS = csv_setting("CSRF_TRUSTED_ORIGINS")
CORS_ALLOW_CREDENTIALS = True

SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = config("SESSION_COOKIE_SAMESITE", default="Lax")
CSRF_COOKIE_SAMESITE = config("CSRF_COOKIE_SAMESITE", default="Lax")

SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_REFERRER_POLICY = "same-origin"
X_FRAME_OPTIONS = "DENY"

# Consultation alerts are opt-in; requests are always stored in the dashboard.
CONSULTATION_EMAIL_ENABLED = config("CONSULTATION_EMAIL_ENABLED", default=False, cast=bool)
CONSULTATION_NOTIFICATION_EMAIL = config("CONSULTATION_NOTIFICATION_EMAIL", default="directors@abcx.co.in")
EMAIL_BACKEND = config("EMAIL_BACKEND", default="django.core.mail.backends.smtp.EmailBackend")
EMAIL_HOST = config("EMAIL_HOST", default="localhost")
EMAIL_PORT = config("EMAIL_PORT", default=587, cast=int)
EMAIL_HOST_USER = config("EMAIL_HOST_USER", default="")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD", default="")
EMAIL_USE_TLS = config("EMAIL_USE_TLS", default=True, cast=bool)
EMAIL_TIMEOUT = 10
DEFAULT_FROM_EMAIL = config("DEFAULT_FROM_EMAIL", default="directors@abcx.co.in")
