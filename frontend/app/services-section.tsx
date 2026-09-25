import Ecosystem, { type EcosystemItem } from "./three/ecosystem";

import { serviceCatalog } from "./service-catalog";

const serviceIcons: EcosystemItem["icon"][] = ["cloud", "security", "ai", "product", "web", "enterprise", "managed", "data", "education"];

export default function ServicesSection() {
  return (
    <section aria-labelledby="services-heading" className="py-3 sm:py-4">
      <header className="mx-auto max-w-3xl text-center">
        <h1
          id="services-heading"
          className="text-4xl font-semibold tracking-[-0.045em] text-[color:var(--foreground)] sm:text-5xl lg:text-6xl"
        >
          Our Services
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
          Technology solutions designed to help businesses build, scale,
          secure, and transform.
        </p>
      </header>

      <Ecosystem
        showDetailLabel={false}
        label="Services ecosystem"
        center="OUR SERVICES"
        caption="Build • Scale • Secure • Transform"
        services
        items={serviceCatalog.map((service, index) => ({
          title: service.title,
          description: service.description,
          icon: serviceIcons[index],
          number: String(index + 1).padStart(2, "0"),
          href: `/services/${service.slug}`,
        }))}
      />
    </section>
  );
}
