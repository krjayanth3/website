from django.contrib import admin

from .models import (
    IndustryFocusArea,
    IndustrySector,
    LandingPage,
    LandingPageAboutPeopleHighlight,
    LandingPageAboutPrinciple,
    LandingPageCareerRole,
    LandingPageDeliveryCadenceItem,
    LandingPageFooterQuickLink,
    LandingPageFooterServiceFocus,
    LandingPageFooterSocialLink,
    LandingPageHeroFocusArea,
    LandingPageNavigationLink,
    LandingPageProcessStep,
    LandingPageWorkSample,
    ServiceCategory,
    ServiceItem,
    WorkSampleTechnology,
)


class OrderedInlineMixin:
    extra = 0
    ordering = ("order", "id")


class LandingPageNavigationLinkInline(OrderedInlineMixin, admin.TabularInline):
    model = LandingPageNavigationLink


class LandingPageHeroFocusAreaInline(OrderedInlineMixin, admin.TabularInline):
    model = LandingPageHeroFocusArea


class LandingPageDeliveryCadenceItemInline(OrderedInlineMixin, admin.StackedInline):
    model = LandingPageDeliveryCadenceItem


class LandingPageProcessStepInline(OrderedInlineMixin, admin.StackedInline):
    model = LandingPageProcessStep


class LandingPageAboutPrincipleInline(OrderedInlineMixin, admin.StackedInline):
    model = LandingPageAboutPrinciple


class LandingPageAboutPeopleHighlightInline(OrderedInlineMixin, admin.TabularInline):
    model = LandingPageAboutPeopleHighlight


class LandingPageCareerRoleInline(OrderedInlineMixin, admin.TabularInline):
    model = LandingPageCareerRole


class LandingPageFooterQuickLinkInline(OrderedInlineMixin, admin.TabularInline):
    model = LandingPageFooterQuickLink


class LandingPageFooterServiceFocusInline(OrderedInlineMixin, admin.TabularInline):
    model = LandingPageFooterServiceFocus


class LandingPageFooterSocialLinkInline(OrderedInlineMixin, admin.TabularInline):
    model = LandingPageFooterSocialLink


@admin.register(LandingPage)
class LandingPageAdmin(admin.ModelAdmin):
    list_display = ("admin_title", "slug", "locale", "is_published", "updated_at")
    list_filter = ("locale", "is_published")
    search_fields = ("admin_title", "slug", "company_name", "locale")
    readonly_fields = ("created_at", "updated_at")
    inlines = [
        LandingPageNavigationLinkInline,
        LandingPageHeroFocusAreaInline,
        LandingPageDeliveryCadenceItemInline,
        LandingPageProcessStepInline,
        LandingPageAboutPrincipleInline,
        LandingPageAboutPeopleHighlightInline,
        LandingPageCareerRoleInline,
        LandingPageFooterQuickLinkInline,
        LandingPageFooterServiceFocusInline,
        LandingPageFooterSocialLinkInline,
    ]
    fieldsets = (
        (
            "Publishing",
            {
                "fields": (
                    ("admin_title", "slug", "locale", "is_published"),
                    ("created_at", "updated_at"),
                )
            },
        ),
        (
            "Brand & Header",
            {
                "fields": (
                    "company_name",
                    "search_placeholder",
                    ("contact_email", "contact_phone"),
                    ("header_search", "header_contact_aria", "header_display_aria"),
                )
            },
        ),
        (
            "Theme Labels",
            {"fields": (("theme_mode_system_label", "theme_mode_light_label", "theme_mode_dark_label"),)},
        ),
        (
            "Hero",
            {
                "fields": (
                    "hero_eyebrow",
                    "hero_title",
                    "hero_description",
                    ("hero_primary_cta", "hero_secondary_cta"),
                )
            },
        ),
        (
            "Delivery",
            {
                "fields": (
                    ("delivery_eyebrow", "delivery_title", "delivery_badge"),
                )
            },
        ),
        (
            "Working Style",
            {
                "fields": (
                    "working_style_eyebrow",
                    "working_style_title",
                    "working_style_description",
                )
            },
        ),
        (
            "Services",
            {
                "fields": (
                    "services_eyebrow",
                    "services_title",
                    "services_description",
                    "services_overview_eyebrow",
                    "services_overview_title",
                    "services_overview_description",
                ),
                "description": "Manage service categories and service items from their dedicated admin sections.",
            },
        ),
        (
            "Process",
            {"fields": ("process_eyebrow", "process_title", "process_description")},
        ),
        (
            "Work",
            {
                "fields": ("work_eyebrow", "work_title"),
                "description": "Manage representative work samples and technologies from the dedicated work sample admin section.",
            },
        ),
        (
            "About",
            {
                "fields": (
                    "about_eyebrow",
                    "about_title",
                    "about_description",
                    "about_purpose_title",
                    "about_purpose_description",
                    "about_values_title",
                    "about_people_title",
                    "about_people_description",
                )
            },
        ),
        (
            "Careers",
            {
                "fields": (
                    "careers_eyebrow",
                    "careers_title",
                    "careers_description",
                    "careers_roles_title",
                    "careers_cta",
                    "careers_note",
                )
            },
        ),
        (
            "Contact",
            {
                "fields": (
                    "contact_eyebrow",
                    "contact_title",
                    "contact_description",
                    "contact_placeholder",
                )
            },
        ),
        (
            "Footer",
            {
                "fields": (
                    "footer_eyebrow",
                    "footer_title",
                    "footer_description",
                    ("footer_company_tag", "footer_cta"),
                    ("footer_quick_links_title", "footer_service_focus_title"),
                    ("footer_contact_title", "footer_contact_label"),
                    "footer_social_links_title",
                    "footer_note",
                    "footer_legal",
                )
            },
        ),
    )


class ServiceItemInline(OrderedInlineMixin, admin.TabularInline):
    model = ServiceItem


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ("title", "landing_page", "order", "is_featured")
    list_filter = ("landing_page", "is_featured")
    search_fields = ("title", "description", "landing_page__company_name")
    autocomplete_fields = ("landing_page",)
    inlines = [ServiceItemInline]


class IndustryFocusAreaInline(OrderedInlineMixin, admin.TabularInline):
    model = IndustryFocusArea


@admin.register(IndustrySector)
class IndustrySectorAdmin(admin.ModelAdmin):
    list_display = ("title", "landing_page", "order")
    list_filter = ("landing_page",)
    search_fields = ("title", "landing_page__company_name")
    autocomplete_fields = ("landing_page",)
    inlines = [IndustryFocusAreaInline]


class WorkSampleTechnologyInline(OrderedInlineMixin, admin.TabularInline):
    model = WorkSampleTechnology


@admin.register(LandingPageWorkSample)
class LandingPageWorkSampleAdmin(admin.ModelAdmin):
    list_display = ("title", "landing_page", "order", "label")
    list_filter = ("landing_page",)
    search_fields = ("title", "description", "label", "landing_page__company_name")
    autocomplete_fields = ("landing_page",)
    inlines = [WorkSampleTechnologyInline]
