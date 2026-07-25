"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { services } from "@/lib/site-config";
import { trackConversion } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tServices = useTranslations("services.items");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { company: "" },
  });

  async function onSubmit(data: ContactInput) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
      trackConversion("contact_form");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border-ink/12 bg-canvas flex min-h-[20rem] flex-col items-center justify-center gap-4 rounded-3xl border p-10 text-center">
        <CheckCircle2 className="text-brass h-12 w-12" aria-hidden />
        <p className="font-display text-ink text-xl">{t("success")}</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/55 focus:border-brass";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="border-ink/12 bg-canvas rounded-3xl border p-7 sm:p-9"
    >
      <h3 className="font-display text-ink text-2xl">{t("title")}</h3>

      {/* Honeypot — visually hidden, ignored by humans */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label>
          Company
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("company")}
          />
        </label>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label={t("name")} error={errors.name && t("required")}>
          <input
            type="text"
            className={inputClass}
            placeholder={t("namePlaceholder")}
            {...register("name")}
          />
        </Field>

        <Field label={t("email")} error={errors.email && t("invalidEmail")}>
          <input
            type="email"
            className={inputClass}
            placeholder={t("emailPlaceholder")}
            {...register("email")}
          />
        </Field>

        <Field label={t("phone")}>
          <input
            type="tel"
            className={inputClass}
            placeholder={t("phonePlaceholder")}
            {...register("phone")}
          />
        </Field>

        <Field label={t("service")}>
          <select
            className={inputClass}
            defaultValue=""
            {...register("service")}
          >
            <option value="">{t("servicePlaceholder")}</option>
            {services.map((s) => (
              <option key={s.id} value={tServices(`${s.id}.name`)}>
                {tServices(`${s.id}.name`)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label={t("message")} error={errors.message && t("required")}>
          <textarea
            rows={4}
            className={cn(inputClass, "resize-y")}
            placeholder={t("messagePlaceholder")}
            {...register("message")}
          />
        </Field>
      </div>

      {status === "error" && (
        <p className="mt-4 flex items-center gap-2 text-sm text-red-700">
          <AlertCircle className="h-4 w-4" aria-hidden />
          {t("error")}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-ink text-canvas hover:bg-brass hover:text-noir mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full px-7 py-4 text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-300 disabled:pointer-events-none disabled:opacity-55 sm:w-auto"
      >
        <Send className="h-4 w-4" />
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>

      <p className="text-muted mt-4 text-xs leading-relaxed">{t("consent")}</p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | false;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-muted mb-2 block text-[0.68rem] font-semibold tracking-[0.16em] uppercase">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1 block text-xs text-red-700">{error}</span>
      )}
    </label>
  );
}
