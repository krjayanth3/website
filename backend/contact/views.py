import hashlib
from rest_framework import serializers, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView
from .models import ConsultationRequest
from .notifications import notify_consultation


class ConsultationSerializer(serializers.Serializer):
    submission_id = serializers.UUIDField()
    name = serializers.CharField(max_length=120)
    email = serializers.EmailField(max_length=254)
    service = serializers.CharField(max_length=120)
    preferred_time = serializers.CharField(max_length=200)


class ConsultationThrottle(AnonRateThrottle):
    rate = "5/hour"

    def get_cache_key(self, request, view):
        # The Next server proxies requests; do not rate-limit all visitors as one IP.
        email = str(request.data.get("email", "")).strip().lower() if isinstance(request.data, dict) else ""
        identity = hashlib.sha256(email.encode()).hexdigest() if email else self.get_ident(request)
        return f"consultation:{identity}"


class ConsultationCreateView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    throttle_classes = [ConsultationThrottle]

    def post(self, request):
        serializer = ConsultationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        values = dict(serializer.validated_data)
        submission_id = values.pop("submission_id")
        item, created = ConsultationRequest.objects.get_or_create(
            submission_id=submission_id, defaults=values,
        )
        if not created and any(getattr(item, key) != value for key, value in values.items()):
            return Response({"detail": "Please refresh and submit a new request."}, status=409)
        if created:
            notify_consultation(item)
        return Response({"reference": str(item.reference)}, status=status.HTTP_201_CREATED if created else 200)
