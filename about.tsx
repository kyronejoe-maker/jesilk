import { createFileRoute, Link } from "@tanstack/react-router";
import { Flower, GoldRuleFlower } from "@/components/brand/flower";
import { buttonVariants } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <div>
      <section className="grid md:grid-cols-2">
        <img
          src="/images/products/navy-chain-tall.jpg"
          alt="Navy Chain silk scarf"
          className="h-72 w-full object-cover object-top md:h-full md:min-h-[480px]"
        />
        <div className="flex flex-col justify-center px-6 py-14 md:px-16">
          <p className="font-sans text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
            About us
          </p>
          <h1 className="mt-3 font-display text-5xl font-semibold">Jesilk</h1>
          <GoldRuleFlower className="mt-5" />
          <p className="mt-8 max-w-md font-body text-sm leading-relaxed text-ink-soft">
            {BRAND.description}
          </p>
          <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-ink-soft">
            Every scarf is a 90 × 90 cm square of 100% premium silk — vintage
            statement prints at ₦7,000, and solid colours at ₦4,000. Lightweight,
            luminous, meant to be worn every day and kept for decades.
          </p>
        </div>
      </section>

      <section className="grid gap-10 px-6 py-16 md:grid-cols-3 md:px-16">
        {[
          {
            t: "100% premium silk",
            d: "A density that drapes without clinging. Vintage prints and solid colours, both cut to the same 90 × 90 cm square.",
          },
          {
            t: "One size, many ways",
            d: "Knotted at the neck, tied on a bag, folded in the hair, framed on a wall. Art you wear. Beauty you feel.",
          },
          {
            t: "Order with us",
            d: "Shop here, or send a message on WhatsApp, Instagram, or Snapchat. Complimentary gift wrap on every square.",
          },
        ].map((c) => (
          <div key={c.t} className="border-t border-gold/50 pt-6">
            <Flower className="size-4" />
            <h2 className="mt-4 font-sans text-sm font-semibold tracking-[0.12em] uppercase">{c.t}</h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted">{c.d}</p>
          </div>
        ))}
      </section>

      <div className="px-6 pb-16 text-center md:px-16">
        <Link to="/shop" className={cn(buttonVariants({ size: "lg" }))}>
          Shop now
        </Link>
      </div>
    </div>
  );
}
