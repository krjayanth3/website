from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import LandingPage


class LandingPageDetailView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get_queryset(self):
        return LandingPage.objects.prefetch_related(
            "navigation_links",
            "hero_focus_areas",
            "delivery_cadence_items",
            "service_categories__service_items",
            "industry_sectors__focus_areas",
            "process_steps",
            "work_samples__technologies",
            "about_principles",
            "about_people_highlights",
            "career_roles",
            "footer_quick_links",
            "footer_service_focuses",
            "footer_social_links",
        )

    def get(self, request, slug: str) -> Response:
        locale = request.query_params.get("locale", "en")
        landing_page = get_object_or_404(
            self.get_queryset(),
            slug=slug,
            locale=locale,
            is_published=True,
        )
        return Response(landing_page.to_payload())
