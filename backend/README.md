# Backend Setup

The Django backend now uses PostgreSQL only.

## Environment

1. Copy `.env.example` to `.env`.
2. Use either:
   - Individual variables: `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`
   - Or one connection string: `DATABASE_URL`

Examples:

```env
DB_ENGINE=django.db.backends.postgresql
DB_NAME=abcx_website
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=127.0.0.1
DB_PORT=5432
```

```env
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/abcx_website
```

Supabase-style example:

```env
DATABASE_URL=postgresql://postgres.your-project:your-password@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require
```

## Run On PostgreSQL

After your PostgreSQL database exists:

```bash
cd backend
../test/bin/python manage.py migrate
../test/bin/python manage.py sync_site_content
../test/bin/python manage.py createsuperuser
../test/bin/python manage.py runserver
```

## Seed Content

The site content now lives in PostgreSQL and can be refreshed from the checked-in seed data with:

```bash
cd backend
../test/bin/python manage.py sync_site_content
```
