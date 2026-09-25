from django.urls import path

from .views import LandingPageDetailView


urlpatterns = [
    path("site-pages/<slug:slug>/", LandingPageDetailView.as_view(), name="site-content-detail"),
]
