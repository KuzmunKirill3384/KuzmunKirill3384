import { SectionHeading } from "@/components/section-heading";

export const metadata = {
  title: "Обмен и возврат",
  description: "Условия обмена и возврата товаров надлежащего качества.",
};

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-[800px] px-5 py-12 md:py-16">
      <SectionHeading
        tag="Сервис"
        title="Обмен и возврат"
        subtitle="Шаблон для презентации; юридическое согласование — перед публикацией в продакшене."
      />
      <div className="space-y-8 border border-[var(--border)] bg-white p-8 md:p-12">
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          Вы можете отказаться от товара надлежащего качества в течение 14 дней с
          момента передачи, сохраняя товарный вид, потребительские свойства и
          документы — в соответствии с законодательством РФ.
        </p>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          Обмен размера и модели возможен при наличии позиции на складе.
          Подробности — у персонала бутика или по email{" "}
          <a
            href="mailto:hello@atrium.store"
            className="text-[var(--ink)] underline-offset-2 hover:underline"
          >
            hello@atrium.store
          </a>
          .
        </p>
      </div>
    </div>
  );
}
