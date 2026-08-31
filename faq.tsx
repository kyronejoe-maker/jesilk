import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/faq")({ component: FaqPage });

const FAQS = [
  {
    q: "What size are the scarves?",
    a: "Every Jesilk scarf is a 90 × 90 cm square — large enough to wear as a shawl, precise enough for a neck knot.",
  },
  {
    q: "What is the silk?",
    a: "100% premium silk. Lightweight, with a natural sheen. Vintage statement prints and solid colours, same square.",
  },
  {
    q: "How much do they cost?",
    a: "Vintage prints are ₦7,000 each. Solid silk squares are ₦4,000 each. Complimentary gift wrap on every order.",
  },
  {
    q: "How do I order?",
    a: `Shop on this site, or send a message on WhatsApp (${BRAND.phoneDisplay}), Instagram ${BRAND.instagramHandle}, or Snapchat ${BRAND.snapchatHandle}.`,
  },
  {
    q: "How do I care for it?",
    a: "Dry clean is best. A cool hand wash works if you press while damp and store flat or rolled.",
  },
  {
    q: "Do you gift wrap?",
    a: "Yes — complimentary. Leave a note at checkout or mention it when you DM.",
  },
  {
    q: "Shipping and returns?",
    a: "We ship across Nigeria in 2–5 business days. Unworn pieces with tags may be returned within 14 days.",
  },
];

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 md:py-20">
      <h1 className="text-center font-sans text-2xl font-semibold tracking-[0.14em] uppercase">FAQ</h1>
      <div className="mt-10 divide-y divide-border-light border-y border-border-light">
        {FAQS.map((f, i) => (
          <div key={f.q}>
            <button
              type="button"
              className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left font-sans text-sm font-medium"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              {f.q}
              <span className="text-lg leading-none text-muted">{open === i ? "–" : "+"}</span>
            </button>
            {open === i ? <p className="pb-4 font-body text-sm leading-relaxed text-muted">{f.a}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
