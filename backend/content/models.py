from django.db import models


class OrderedChild(models.Model):
    order = models.PositiveIntegerField(default=0)

    class Meta:
        abstract = True
        ordering = ["order", "id"]


class LandingPage(models.Model):
    slug = models.SlugField(default="landing-page")
    locale = models.CharField(max_length=10, default="en")
    admin_title = models.CharField(max_length=255, default="Landing page")
    company_name = models.CharField(max_length=255)
    search_placeholder = models.CharField(max_length=255)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=40)

    header_search = models.CharField(max_length=80, default="Search")
    header_contact_aria = models.CharField(max_length=255)
    header_display_aria = models.CharField(max_length=255)

    theme_mode_system_label = models.CharField(max_length=40, default="System")
    theme_mode_light_label = models.CharField(max_length=40, default="Light")
    theme_mode_dark_label = models.CharField(max_length=40, default="Dark")

    hero_eyebrow = models.CharField(max_length=255)
    hero_title = models.TextField()
    hero_description = models.TextField()
    hero_primary_cta = models.CharField(max_length=120)
    hero_secondary_cta = models.CharField(max_length=120)

    delivery_eyebrow = models.CharField(max_length=255)
    delivery_title = models.CharField(max_length=255)
    delivery_badge = models.CharField(max_length=120)

    working_style_eyebrow = models.CharField(max_length=255)
    working_style_title = models.CharField(max_length=255)
    working_style_description = models.TextField()

    services_eyebrow = models.CharField(max_length=255)
    services_title = models.CharField(max_length=255)
    services_description = models.TextField()
    services_overview_eyebrow = models.CharField(max_length=255)
    services_overview_title = models.CharField(max_length=255)
    services_overview_description = models.TextField()

    process_eyebrow = models.CharField(max_length=255)
    process_title = models.CharField(max_length=255)
    process_description = models.TextField()

    work_eyebrow = models.CharField(max_length=255)
    work_title = models.CharField(max_length=255)

    about_eyebrow = models.CharField(max_length=255)
    about_title = models.CharField(max_length=255)
    about_description = models.TextField()
    about_purpose_title = models.CharField(max_length=255)
    about_purpose_description = models.TextField()
    about_values_title = models.CharField(max_length=255)
    about_people_title = models.CharField(max_length=255)
    about_people_description = models.TextField()

    careers_eyebrow = models.CharField(max_length=255)
    careers_title = models.CharField(max_length=255)
    careers_description = models.TextField()
    careers_roles_title = models.CharField(max_length=255)
    careers_cta = models.CharField(max_length=120)
    careers_note = models.TextField()

    contact_eyebrow = models.CharField(max_length=255)
    contact_title = models.TextField()
    contact_description = models.TextField()
    contact_placeholder = models.TextField()

    footer_eyebrow = models.CharField(max_length=255)
    footer_title = models.CharField(max_length=255)
    footer_description = models.TextField()
    footer_company_tag = models.CharField(max_length=120)
    footer_cta = models.CharField(max_length=120)
    footer_quick_links_title = models.CharField(max_length=120)
    footer_service_focus_title = models.CharField(max_length=120)
    footer_contact_title = models.CharField(max_length=120)
    footer_contact_label = models.CharField(max_length=255)
    footer_social_links_title = models.CharField(max_length=120, default="Social")
    footer_note = models.TextField()
    footer_legal = models.CharField(max_length=255)

    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["slug", "locale"]
        constraints = [
            models.UniqueConstraint(
                fields=["slug", "locale"],
                name="unique_landing_page_slug_locale",
            )
        ]

    def __str__(self) -> str:
        return f"{self.admin_title} ({self.locale})"

    def to_payload(self) -> dict:
        return {
            "companyName": self.company_name,
            "navigation": [
                {"label": link.label, "href": link.href}
                for link in self.navigation_links.all()
            ],
            "header": {
                "search": self.header_search,
                "contactAria": self.header_contact_aria,
                "displayAria": self.header_display_aria,
            },
            "display": {
                "themeModes": {
                    "system": self.theme_mode_system_label,
                    "light": self.theme_mode_light_label,
                    "dark": self.theme_mode_dark_label,
                }
            },
            "searchPlaceholder": self.search_placeholder,
            "contactEmail": self.contact_email,
            "contactPhone": self.contact_phone,
            "hero": {
                "eyebrow": self.hero_eyebrow,
                "title": self.hero_title,
                "description": self.hero_description,
                "primaryCta": self.hero_primary_cta,
                "secondaryCta": self.hero_secondary_cta,
                "focusAreas": [item.text for item in self.hero_focus_areas.all()],
            },
            "delivery": {
                "eyebrow": self.delivery_eyebrow,
                "title": self.delivery_title,
                "badge": self.delivery_badge,
                "cadence": [
                    {"phase": item.phase, "title": item.title, "text": item.text}
                    for item in self.delivery_cadence_items.all()
                ],
            },
            "workingStyle": {
                "eyebrow": self.working_style_eyebrow,
                "title": self.working_style_title,
                "description": self.working_style_description,
            },
            "servicesSection": {
                "eyebrow": self.services_eyebrow,
                "title": self.services_title,
                "description": self.services_description,
                "overviewEyebrow": self.services_overview_eyebrow,
                "overviewTitle": self.services_overview_title,
                "overviewDescription": self.services_overview_description,
                "featuredTitles": [
                    category.title
                    for category in self.service_categories.all()
                    if category.is_featured
                ],
                "items": [category.to_payload() for category in self.service_categories.all()],
            },
            "industryCatalog": [
                sector.to_payload() for sector in self.industry_sectors.all()
            ],
            "processSection": {
                "eyebrow": self.process_eyebrow,
                "title": self.process_title,
                "description": self.process_description,
                "steps": [
                    {"step": item.step, "summary": item.summary}
                    for item in self.process_steps.all()
                ],
            },
            "workSection": {
                "eyebrow": self.work_eyebrow,
                "title": self.work_title,
                "samples": [sample.to_payload() for sample in self.work_samples.all()],
            },
            "aboutSection": {
                "eyebrow": self.about_eyebrow,
                "title": self.about_title,
                "description": self.about_description,
                "purpose": {
                    "title": self.about_purpose_title,
                    "description": self.about_purpose_description,
                },
                "valuesTitle": self.about_values_title,
                "principles": [
                    {"title": item.title, "description": item.description}
                    for item in self.about_principles.all()
                ],
                "people": {
                    "title": self.about_people_title,
                    "description": self.about_people_description,
                    "items": [item.text for item in self.about_people_highlights.all()],
                },
            },
            "careersSection": {
                "eyebrow": self.careers_eyebrow,
                "title": self.careers_title,
                "description": self.careers_description,
                "rolesTitle": self.careers_roles_title,
                "roles": [item.text for item in self.career_roles.all()],
                "cta": self.careers_cta,
                "note": self.careers_note,
            },
            "contactSection": {
                "eyebrow": self.contact_eyebrow,
                "title": self.contact_title,
                "description": self.contact_description,
                "placeholder": self.contact_placeholder,
            },
            "footer": {
                "eyebrow": self.footer_eyebrow,
                "title": self.footer_title,
                "description": self.footer_description,
                "companyTag": self.footer_company_tag,
                "cta": self.footer_cta,
                "quickLinksTitle": self.footer_quick_links_title,
                "quickLinks": [
                    {"label": link.label, "href": link.href}
                    for link in self.footer_quick_links.all()
                ],
                "serviceFocusTitle": self.footer_service_focus_title,
                "serviceFocus": [item.label for item in self.footer_service_focuses.all()],
                "contactTitle": self.footer_contact_title,
                "contactLabel": self.footer_contact_label,
                "socialLinksTitle": self.footer_social_links_title,
                "socialLinks": [
                    {
                        "label": link.label,
                        "href": link.href,
                        "platform": link.platform,
                    }
                    for link in self.footer_social_links.all()
                ],
                "note": self.footer_note,
                "legal": self.footer_legal,
            },
        }


class LandingPageNavigationLink(OrderedChild):
    landing_page = models.ForeignKey(
        LandingPage,
        on_delete=models.CASCADE,
        related_name="navigation_links",
    )
    label = models.CharField(max_length=120)
    href = models.CharField(max_length=120)

    def __str__(self) -> str:
        return self.label


class LandingPageHeroFocusArea(OrderedChild):
    landing_page = models.ForeignKey(
        LandingPage,
        on_delete=models.CASCADE,
        related_name="hero_focus_areas",
    )
    text = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.text


class LandingPageDeliveryCadenceItem(OrderedChild):
    landing_page = models.ForeignKey(
        LandingPage,
        on_delete=models.CASCADE,
        related_name="delivery_cadence_items",
    )
    phase = models.CharField(max_length=80)
    title = models.CharField(max_length=255)
    text = models.TextField()

    def __str__(self) -> str:
        return f"{self.phase}: {self.title}"


class ServiceCategory(OrderedChild):
    landing_page = models.ForeignKey(
        LandingPage,
        on_delete=models.CASCADE,
        related_name="service_categories",
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_featured = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title

    def to_payload(self) -> dict:
        return {
            "title": self.title,
            "description": self.description,
            "services": [item.name for item in self.service_items.all()],
        }


class ServiceItem(OrderedChild):
    service_category = models.ForeignKey(
        ServiceCategory,
        on_delete=models.CASCADE,
        related_name="service_items",
    )
    name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.name


class IndustrySector(OrderedChild):
    landing_page = models.ForeignKey(
        LandingPage,
        on_delete=models.CASCADE,
        related_name="industry_sectors",
    )
    title = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.title

    def to_payload(self) -> dict:
        return {
            "title": self.title,
            "services": [item.name for item in self.focus_areas.all()],
        }


class IndustryFocusArea(OrderedChild):
    industry_sector = models.ForeignKey(
        IndustrySector,
        on_delete=models.CASCADE,
        related_name="focus_areas",
    )
    name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.name


class LandingPageProcessStep(OrderedChild):
    landing_page = models.ForeignKey(
        LandingPage,
        on_delete=models.CASCADE,
        related_name="process_steps",
    )
    step = models.CharField(max_length=120)
    summary = models.TextField()

    def __str__(self) -> str:
        return self.step


class LandingPageWorkSample(OrderedChild):
    landing_page = models.ForeignKey(
        LandingPage,
        on_delete=models.CASCADE,
        related_name="work_samples",
    )
    label = models.CharField(max_length=120)
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self) -> str:
        return self.title

    def to_payload(self) -> dict:
        return {
            "label": self.label,
            "title": self.title,
            "description": self.description,
            "stack": [item.label for item in self.technologies.all()],
        }


class WorkSampleTechnology(OrderedChild):
    work_sample = models.ForeignKey(
        LandingPageWorkSample,
        on_delete=models.CASCADE,
        related_name="technologies",
    )
    label = models.CharField(max_length=120)

    def __str__(self) -> str:
        return self.label


class LandingPageAboutPrinciple(OrderedChild):
    landing_page = models.ForeignKey(
        LandingPage,
        on_delete=models.CASCADE,
        related_name="about_principles",
    )
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self) -> str:
        return self.title


class LandingPageAboutPeopleHighlight(OrderedChild):
    landing_page = models.ForeignKey(
        LandingPage,
        on_delete=models.CASCADE,
        related_name="about_people_highlights",
    )
    text = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.text


class LandingPageCareerRole(OrderedChild):
    landing_page = models.ForeignKey(
        LandingPage,
        on_delete=models.CASCADE,
        related_name="career_roles",
    )
    text = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.text


class LandingPageFooterQuickLink(OrderedChild):
    landing_page = models.ForeignKey(
        LandingPage,
        on_delete=models.CASCADE,
        related_name="footer_quick_links",
    )
    label = models.CharField(max_length=120)
    href = models.CharField(max_length=120)

    def __str__(self) -> str:
        return self.label


class LandingPageFooterServiceFocus(OrderedChild):
    landing_page = models.ForeignKey(
        LandingPage,
        on_delete=models.CASCADE,
        related_name="footer_service_focuses",
    )
    label = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.label


class LandingPageFooterSocialLink(OrderedChild):
    landing_page = models.ForeignKey(
        LandingPage,
        on_delete=models.CASCADE,
        related_name="footer_social_links",
    )
    label = models.CharField(max_length=120)
    platform = models.CharField(max_length=40)
    href = models.URLField(blank=True, default="")

    def __str__(self) -> str:
        return self.label
