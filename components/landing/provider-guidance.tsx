"use client";

import { DrawablyBadge, DrawablyCard, DrawablyList } from "@/lib/drawably";
import { INK } from "@/lib/drawably/inks";
import { useI18n } from "@/components/i18n-provider";
import { Accent } from "./accent";

export function LandingProviderGuidance() {
  const { t } = useI18n();
  const providers = [
    t.landing.providers.provider1,
    t.landing.providers.provider2,
    t.landing.providers.provider3,
  ];

  return (
    <section id="providers" data-section="providers" className="border-t border-subtle bg-white px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-secondary">{t.landing.providers.eyebrow}</p>
          <h2 className="mt-2 text-h2 font-bold tracking-tight text-ink sm:text-3xl">
            <Accent text={t.landing.providers.title} accent={t.landing.providers.titleAccent} />
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-body text-secondary">{t.landing.providers.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <DrawablyCard className="tilt-a p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-h3 font-bold text-ink">{t.landing.providers.supportedTitle}</h3>
              <DrawablyBadge variant="outline" stroke={INK.teal} className="text-xs text-teal-800">
                {t.landing.providers.supportedBadge}
              </DrawablyBadge>
            </div>
            <p className="mt-3 text-small leading-relaxed text-secondary">{t.landing.providers.supportedDesc}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={t.landing.providers.supportedTitle}>
              {providers.map((provider) => (
                <li key={provider} className="rounded-full border border-subtle bg-paper px-3 py-1.5 text-small font-medium text-ink">
                  {provider}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-small leading-relaxed text-secondary">{t.landing.providers.customDesc}</p>
          </DrawablyCard>

          <DrawablyCard className="tilt-d p-6 sm:p-8">
            <h3 className="text-h3 font-bold text-ink">{t.landing.providers.byokTitle}</h3>
            <p className="mt-3 text-small leading-relaxed text-secondary">{t.landing.providers.byokDesc}</p>
            <DrawablyList marker="check" className="mt-5 space-y-3 text-small text-ink">
              <li className="leading-relaxed">{t.landing.providers.step1}</li>
              <li className="leading-relaxed">{t.landing.providers.step2}</li>
              <li className="leading-relaxed">{t.landing.providers.step3}</li>
            </DrawablyList>
            <p className="mt-5 rounded-md border border-subtle bg-paper px-4 py-3 text-small leading-relaxed text-secondary">
              {t.landing.providers.note}
            </p>
          </DrawablyCard>
        </div>
      </div>
    </section>
  );
}
