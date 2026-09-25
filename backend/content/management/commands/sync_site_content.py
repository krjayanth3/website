from django.core.management.base import BaseCommand
from django.db import transaction

from content.models import (
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
from content.seed import LANDING_PAGE_CONTENT


class Command(BaseCommand):
    help = "Seed or update site content records used by the frontend."

    def handle(self, *args, **options):
        with transaction.atomic():
            landing_page, created = LandingPage.objects.update_or_create(
                slug="landing-page",
                locale="en",
                defaults=self.build_landing_page_defaults(LANDING_PAGE_CONTENT),
            )

            self.sync_navigation(landing_page, LANDING_PAGE_CONTENT["navigation"])
            self.sync_hero_focus_areas(
                landing_page,
                LANDING_PAGE_CONTENT["hero"]["focusAreas"],
            )
            self.sync_delivery_cadence(
                landing_page,
                LANDING_PAGE_CONTENT["delivery"]["cadence"],
            )
            self.sync_services(
                landing_page,
                LANDING_PAGE_CONTENT["servicesSection"],
            )
            self.sync_industries(
                landing_page,
                LANDING_PAGE_CONTENT["industryCatalog"],
            )
            self.sync_process_steps(
                landing_page,
                LANDING_PAGE_CONTENT["processSection"]["steps"],
            )
            self.sync_work_samples(
                landing_page,
                LANDING_PAGE_CONTENT["workSection"]["samples"],
            )
            self.sync_about_principles(
                landing_page,
                LANDING_PAGE_CONTENT["aboutSection"]["principles"],
            )
            self.sync_people_highlights(
                landing_page,
                LANDING_PAGE_CONTENT["aboutSection"]["people"]["items"],
            )
            self.sync_career_roles(
                landing_page,
                LANDING_PAGE_CONTENT["careersSection"]["roles"],
            )
            self.sync_footer_quick_links(
                landing_page,
                LANDING_PAGE_CONTENT["footer"]["quickLinks"],
            )
            self.sync_footer_service_focus(
                landing_page,
                LANDING_PAGE_CONTENT["footer"]["serviceFocus"],
            )
            self.sync_footer_social_links(
                landing_page,
                LANDING_PAGE_CONTENT["footer"]["socialLinks"],
            )

        action = "Created" if created else "Updated"
        self.stdout.write(self.style.SUCCESS(f"{action} landing-page content records."))

    def build_landing_page_defaults(self, content: dict) -> dict:
        return {
            "admin_title": "Landing page",
            "company_name": content["companyName"],
            "search_placeholder": content["searchPlaceholder"],
            "contact_email": content["contactEmail"],
            "contact_phone": content["contactPhone"],
            "header_search": content["header"]["search"],
            "header_contact_aria": content["header"]["contactAria"],
            "header_display_aria": content["header"]["displayAria"],
            "theme_mode_system_label": content["display"]["themeModes"]["system"],
            "theme_mode_light_label": content["display"]["themeModes"]["light"],
            "theme_mode_dark_label": content["display"]["themeModes"]["dark"],
            "hero_eyebrow": content["hero"]["eyebrow"],
            "hero_title": content["hero"]["title"],
            "hero_description": content["hero"]["description"],
            "hero_primary_cta": content["hero"]["primaryCta"],
            "hero_secondary_cta": content["hero"]["secondaryCta"],
            "delivery_eyebrow": content["delivery"]["eyebrow"],
            "delivery_title": content["delivery"]["title"],
            "delivery_badge": content["delivery"]["badge"],
            "working_style_eyebrow": content["workingStyle"]["eyebrow"],
            "working_style_title": content["workingStyle"]["title"],
            "working_style_description": content["workingStyle"]["description"],
            "services_eyebrow": content["servicesSection"]["eyebrow"],
            "services_title": content["servicesSection"]["title"],
            "services_description": content["servicesSection"]["description"],
            "services_overview_eyebrow": content["servicesSection"]["overviewEyebrow"],
            "services_overview_title": content["servicesSection"]["overviewTitle"],
            "services_overview_description": content["servicesSection"]["overviewDescription"],
            "process_eyebrow": content["processSection"]["eyebrow"],
            "process_title": content["processSection"]["title"],
            "process_description": content["processSection"]["description"],
            "work_eyebrow": content["workSection"]["eyebrow"],
            "work_title": content["workSection"]["title"],
            "about_eyebrow": content["aboutSection"]["eyebrow"],
            "about_title": content["aboutSection"]["title"],
            "about_description": content["aboutSection"]["description"],
            "about_purpose_title": content["aboutSection"]["purpose"]["title"],
            "about_purpose_description": content["aboutSection"]["purpose"]["description"],
            "about_values_title": content["aboutSection"]["valuesTitle"],
            "about_people_title": content["aboutSection"]["people"]["title"],
            "about_people_description": content["aboutSection"]["people"]["description"],
            "careers_eyebrow": content["careersSection"]["eyebrow"],
            "careers_title": content["careersSection"]["title"],
            "careers_description": content["careersSection"]["description"],
            "careers_roles_title": content["careersSection"]["rolesTitle"],
            "careers_cta": content["careersSection"]["cta"],
            "careers_note": content["careersSection"]["note"],
            "contact_eyebrow": content["contactSection"]["eyebrow"],
            "contact_title": content["contactSection"]["title"],
            "contact_description": content["contactSection"]["description"],
            "contact_placeholder": content["contactSection"]["placeholder"],
            "footer_eyebrow": content["footer"]["eyebrow"],
            "footer_title": content["footer"]["title"],
            "footer_description": content["footer"]["description"],
            "footer_company_tag": content["footer"]["companyTag"],
            "footer_cta": content["footer"]["cta"],
            "footer_quick_links_title": content["footer"]["quickLinksTitle"],
            "footer_service_focus_title": content["footer"]["serviceFocusTitle"],
            "footer_contact_title": content["footer"]["contactTitle"],
            "footer_contact_label": content["footer"]["contactLabel"],
            "footer_social_links_title": content["footer"]["socialLinksTitle"],
            "footer_note": content["footer"]["note"],
            "footer_legal": content["footer"]["legal"],
            "is_published": True,
        }

    def replace_children(self, manager, model_class, rows):
        manager.all().delete()
        model_class.objects.bulk_create(rows)

    def sync_navigation(self, landing_page: LandingPage, items: list[dict]) -> None:
        self.replace_children(
            landing_page.navigation_links,
            LandingPageNavigationLink,
            [
                LandingPageNavigationLink(
                    landing_page=landing_page,
                    order=index,
                    label=item["label"],
                    href=item["href"],
                )
                for index, item in enumerate(items)
            ],
        )

    def sync_hero_focus_areas(self, landing_page: LandingPage, items: list[str]) -> None:
        self.replace_children(
            landing_page.hero_focus_areas,
            LandingPageHeroFocusArea,
            [
                LandingPageHeroFocusArea(
                    landing_page=landing_page,
                    order=index,
                    text=text,
                )
                for index, text in enumerate(items)
            ],
        )

    def sync_delivery_cadence(self, landing_page: LandingPage, items: list[dict]) -> None:
        self.replace_children(
            landing_page.delivery_cadence_items,
            LandingPageDeliveryCadenceItem,
            [
                LandingPageDeliveryCadenceItem(
                    landing_page=landing_page,
                    order=index,
                    phase=item["phase"],
                    title=item["title"],
                    text=item["text"],
                )
                for index, item in enumerate(items)
            ],
        )

    def sync_services(self, landing_page: LandingPage, section: dict) -> None:
        landing_page.service_categories.all().delete()
        featured_titles = set(section["featuredTitles"])

        for category_index, category in enumerate(section["items"]):
            service_category = ServiceCategory.objects.create(
                landing_page=landing_page,
                order=category_index,
                title=category["title"],
                description=category["description"],
                is_featured=category["title"] in featured_titles,
            )
            ServiceItem.objects.bulk_create(
                [
                    ServiceItem(
                        service_category=service_category,
                        order=service_index,
                        name=service_name,
                    )
                    for service_index, service_name in enumerate(category["services"])
                ]
            )

    def sync_industries(self, landing_page: LandingPage, items: list[dict]) -> None:
        landing_page.industry_sectors.all().delete()

        for sector_index, sector in enumerate(items):
            industry_sector = IndustrySector.objects.create(
                landing_page=landing_page,
                order=sector_index,
                title=sector["title"],
            )
            IndustryFocusArea.objects.bulk_create(
                [
                    IndustryFocusArea(
                        industry_sector=industry_sector,
                        order=focus_index,
                        name=focus_area,
                    )
                    for focus_index, focus_area in enumerate(sector["services"])
                ]
            )

    def sync_process_steps(self, landing_page: LandingPage, items: list[dict]) -> None:
        self.replace_children(
            landing_page.process_steps,
            LandingPageProcessStep,
            [
                LandingPageProcessStep(
                    landing_page=landing_page,
                    order=index,
                    step=item["step"],
                    summary=item["summary"],
                )
                for index, item in enumerate(items)
            ],
        )

    def sync_work_samples(self, landing_page: LandingPage, items: list[dict]) -> None:
        landing_page.work_samples.all().delete()

        for sample_index, sample in enumerate(items):
            work_sample = LandingPageWorkSample.objects.create(
                landing_page=landing_page,
                order=sample_index,
                label=sample["label"],
                title=sample["title"],
                description=sample["description"],
            )
            WorkSampleTechnology.objects.bulk_create(
                [
                    WorkSampleTechnology(
                        work_sample=work_sample,
                        order=technology_index,
                        label=technology,
                    )
                    for technology_index, technology in enumerate(sample["stack"])
                ]
            )

    def sync_about_principles(self, landing_page: LandingPage, items: list[dict]) -> None:
        self.replace_children(
            landing_page.about_principles,
            LandingPageAboutPrinciple,
            [
                LandingPageAboutPrinciple(
                    landing_page=landing_page,
                    order=index,
                    title=item["title"],
                    description=item["description"],
                )
                for index, item in enumerate(items)
            ],
        )

    def sync_people_highlights(self, landing_page: LandingPage, items: list[str]) -> None:
        self.replace_children(
            landing_page.about_people_highlights,
            LandingPageAboutPeopleHighlight,
            [
                LandingPageAboutPeopleHighlight(
                    landing_page=landing_page,
                    order=index,
                    text=text,
                )
                for index, text in enumerate(items)
            ],
        )

    def sync_career_roles(self, landing_page: LandingPage, items: list[str]) -> None:
        self.replace_children(
            landing_page.career_roles,
            LandingPageCareerRole,
            [
                LandingPageCareerRole(
                    landing_page=landing_page,
                    order=index,
                    text=text,
                )
                for index, text in enumerate(items)
            ],
        )

    def sync_footer_quick_links(self, landing_page: LandingPage, items: list[dict]) -> None:
        self.replace_children(
            landing_page.footer_quick_links,
            LandingPageFooterQuickLink,
            [
                LandingPageFooterQuickLink(
                    landing_page=landing_page,
                    order=index,
                    label=item["label"],
                    href=item["href"],
                )
                for index, item in enumerate(items)
            ],
        )

    def sync_footer_service_focus(self, landing_page: LandingPage, items: list[str]) -> None:
        self.replace_children(
            landing_page.footer_service_focuses,
            LandingPageFooterServiceFocus,
            [
                LandingPageFooterServiceFocus(
                    landing_page=landing_page,
                    order=index,
                    label=text,
                )
                for index, text in enumerate(items)
            ],
        )

    def sync_footer_social_links(self, landing_page: LandingPage, items: list[dict]) -> None:
        self.replace_children(
            landing_page.footer_social_links,
            LandingPageFooterSocialLink,
            [
                LandingPageFooterSocialLink(
                    landing_page=landing_page,
                    order=index,
                    label=item["label"],
                    platform=item["platform"],
                    href=item.get("href", ""),
                )
                for index, item in enumerate(items)
            ],
        )
