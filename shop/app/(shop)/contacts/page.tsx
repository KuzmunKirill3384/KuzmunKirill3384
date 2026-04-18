import { SectionHeading } from "@/components/section-heading";
import { ContactFormClient } from "@/components/contact-form-client";

export const metadata = {
  title: "Контакты",
  description: "Бутик, сервис, обратная связь — LENINGRADEC.",
};

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-5 md:py-16">
      <SectionHeading
        tag="Контакты"
        title="Бутик и сервис"
        subtitle="Визит, доставка по России, индивидуальный подбор размера."
      />
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="space-y-8">
          <div className="border border-[var(--border)] bg-white p-6 shadow-sm md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
              Адрес
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink)]">
              Санкт-Петербург, Невский проспект, 44
              <br />
              Вход с Итальянской улицы
            </p>
            <p className="mt-4 text-sm text-[var(--muted)]">Ежедневно 11:00–21:00</p>
          </div>
          <div className="border border-[var(--border)] bg-white p-6 shadow-sm md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
              Связь
            </p>
            <div className="mt-4 space-y-2 text-lg text-[var(--ink)]">
              <a href="tel:+79990000000" className="block transition-colors hover:text-[var(--accent)]">
                +7 (999) 000-00-00
              </a>
              <a href="mailto:hello@atrium.store" className="block transition-colors hover:text-[var(--accent)]">
                hello@atrium.store
              </a>
            </div>
            <p className="mt-4 text-sm text-[var(--muted)]">
              Для оптовых запросов укажите тему «B2B».
            </p>
          </div>
        </div>

        <div className="border border-[var(--border)] bg-white p-6 shadow-sm md:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
            Обратная связь
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Задайте вопрос или оставьте предложение — ответим в течение рабочего дня.
          </p>
          <div className="mt-6">
            <ContactFormClient />
          </div>
        </div>
      </div>
    </div>
  );
}
