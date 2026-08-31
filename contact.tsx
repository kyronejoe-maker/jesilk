import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Flower } from "@/components/brand/flower";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-12 px-4 py-14 md:grid-cols-2 md:px-8 md:py-20">
      <div>
        <p className="font-sans text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
          Contact us
        </p>
        <h1 className="mt-3 font-sans text-2xl font-semibold tracking-[0.12em] uppercase">
          DM to order
        </h1>
        <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-muted">
          Private orders, gift notes, wholesale. WhatsApp, Instagram, and Snapchat
          are the fastest — we typically reply the same day.
        </p>

        <ul className="mt-10 space-y-1">
          <ContactRow
            icon={<MessageCircle className="size-4" strokeWidth={1.6} />}
            label="WhatsApp"
            value={BRAND.phoneDisplay}
            href={BRAND.whatsapp}
          />
          <ContactRow
            icon={<Instagram className="size-4" strokeWidth={1.6} />}
            label="Instagram"
            value={BRAND.instagramHandle}
            href={BRAND.instagram}
          />
          <ContactRow
            icon={<SnapIcon />}
            label="Snapchat"
            value={BRAND.snapchatHandle}
            href={BRAND.snapchat}
          />
          <ContactRow
            icon={<Mail className="size-4" strokeWidth={1.6} />}
            label="Email"
            value={BRAND.email}
            href={`mailto:${BRAND.email}`}
          />
          <ContactRow
            icon={<Phone className="size-4" strokeWidth={1.6} />}
            label="Call"
            value={BRAND.phoneDisplay}
            href={BRAND.phoneHref}
          />
        </ul>
      </div>

      <div className="border-t border-border-light pt-10 md:border-0 md:pt-0">
        {sent ? (
          <div className="border border-border bg-bg-accent px-6 py-10 text-center">
            <Flower className="mx-auto size-6" />
            <p className="mt-4 font-display text-2xl">Message received</p>
            <p className="mt-2 font-body text-sm text-muted">We will write back shortly.</p>
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ size: "md" }), "mt-6 inline-flex")}
            >
              Continue on WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            <p className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase">
              Write to the house
            </p>
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Instagram or phone" name="handle" />
            <label className="block">
              <span className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase">
                Message
              </span>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-2 w-full border border-border bg-bg-accent px-3 py-3 font-body text-sm outline-none focus:border-ink"
              />
            </label>
            <Button type="submit" size="lg" className="w-full">
              Send
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <li>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="flex min-h-12 items-center gap-4 border-b border-border-light py-3 hover:text-gold"
      >
        <span className="text-gold">{icon}</span>
        <span className="flex min-w-0 flex-col">
          <span className="font-sans text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
            {label}
          </span>
          <span className="truncate font-body text-sm">{value}</span>
        </span>
      </a>
    </li>
  );
}

function SnapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M12 3.2c-2.7 0-4.8 1.9-4.8 4.9v.7c-1.2.4-1.8 1.2-1.8 1.2s.7.3 1.4.4c-.1.6-.6 1.8-1.8 2.5 0 0 1.6.3 2.7-.4.2 1.4.9 2.7 2.4 3.5-.7.4-1.6.7-2.6.9 0 0 .9.7 3.2.7h.6c2.3 0 3.2-.7 3.2-.7-1-.2-1.9-.5-2.6-.9 1.5-.8 2.2-2.1 2.4-3.5 1.1.7 2.7.4 2.7.4-1.2-.7-1.7-1.9-1.8-2.5.7-.1 1.4-.4 1.4-.4s-.6-.8-1.8-1.2v-.7c0-3-2.1-4.9-4.8-4.9Z" />
    </svg>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 h-12 min-h-12 w-full border border-border bg-bg-accent px-3 font-body text-sm outline-none focus:border-ink"
      />
    </label>
  );
}
