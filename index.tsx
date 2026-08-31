import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { CollectionSection } from "@/components/product/collection-section";
import { Flower, GoldRuleFlower } from "@/components/brand/flower";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border-light bg-bg">
        <div className="grid items-stretch lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-14 md:px-16 md:py-20 lg:min-h-[calc(100dvh-6.5rem)]">
            <div className="stagger-in mx-auto w-full max-w-md">
              <p className="font-display text-6xl font-semibold tracking-tight text-ink md:text-7xl">
                Jesilk
              </p>
              <GoldRuleFlower className="mt-5" />
              <p className="mt-8 font-sans text-[13px] font-medium tracking-[0.28em] text-ink-soft uppercase">
                Timeless beauty.
                <br />
                Pure silk.
              </p>

              <ul className="mt-10 space-y-5">
                <Feature
                  icon={
                    <span className="flex size-9 items-center justify-center rounded-full border border-gold text-gold">
                      <Leaf className="size-4" strokeWidth={1.5} />
                    </span>
                  }
                  label="100% premium silk"
                />
                <Feature
                  icon={<Leaf className="size-5 text-gold" strokeWidth={1.5} />}
                  label="Lightweight & luxurious"
                />
                <Feature
                  icon={<Sparkles className="size-5 text-gold" strokeWidth={1.5} />}
                  label="Timeless elegance"
                />
              </ul>

              <div className="mt-10">
                <p className="font-display text-3xl text-ink">90 × 90 cm</p>
                <p className="mt-1 font-sans text-sm tracking-wide text-muted">Silk scarf</p>
              </div>

              <p className="mt-8 font-sans text-[12px] font-medium tracking-[0.22em] text-ink-soft uppercase">
                Art you wear.
                <br />
                Beauty you feel.
              </p>
              <Flower className="mt-5 size-5" />

              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/shop" className={cn(buttonVariants({ size: "lg" }), "min-w-40")}>
                  Shop now
                </Link>
                <Link
                  to="/lookbook"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                >
                  Lookbook
                </Link>
              </div>
            </div>
          </div>
          <div className="relative min-h-[420px] bg-bg-brighter lg:min-h-[calc(100dvh-6.5rem)]">
            <img
              src="/images/products/ivory-bridle-garden-tall.jpg"
              alt="Ivory Bridle Garden silk scarf"
              className="absolute inset-0 size-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      <CollectionSection handle="best-sellers" title="Best Sellers" />

      <section className="relative mx-4 overflow-hidden md:mx-8">
        <div className="grid min-h-[380px] md:grid-cols-2">
          <img
            src="/images/products/fuchsia-equestre-tall.jpg"
            alt="Fuchsia Équestre vintage silk scarf"
            className="h-full min-h-[280px] w-full object-cover object-top"
          />
          <div className="flex flex-col justify-center bg-forest px-8 py-14 text-on-ink md:px-14">
            <p className="font-sans text-[11px] font-semibold tracking-[0.22em] text-gold-light uppercase">
              Vintage prints
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
              Statement squares.
              <br />
              ₦7,000 each.
            </h2>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-on-ink/75">
              Five curated vintage prints on 100% premium silk, cut to 90 × 90 cm.
              Wear it at the neck, on a bag, in the hair.
            </p>
            <Link
              to="/collections/$handle"
              params={{ handle: "vintage" }}
              className={cn(buttonVariants({ variant: "gold", size: "md" }), "mt-8 w-fit")}
            >
              Shop now
            </Link>
          </div>
        </div>
      </section>

      <CollectionSection handle="latest" title="Latest" />

      <section className="relative mx-4 mb-6 overflow-hidden md:mx-8">
        <div className="grid min-h-[340px] md:grid-cols-2">
          <div className="flex flex-col justify-center bg-bg-accent px-8 py-14 md:px-14">
            <p className="font-sans text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
              Solid silk
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
              Pure colour.
              <br />
              ₦4,000 each.
            </h2>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-ink-soft">
              Peach, cobalt, teal, noir, and emerald — five solid squares with a
              liquid sheen. Everyday silk, gift-boxed.
            </p>
            <Link
              to="/collections/$handle"
              params={{ handle: "solids" }}
              className={cn(buttonVariants({ size: "md" }), "mt-8 w-fit")}
            >
              Shop solids
            </Link>
          </div>
          <img
            src="/images/products/peach-silk.jpg"
            alt="Peach solid silk scarf"
            className="h-full min-h-[280px] w-full object-cover"
          />
        </div>
      </section>

      <section className="px-4 py-6 md:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {[
            { src: "/images/lookbook/ivory-bridle-garden.jpg", alt: "Ivory Bridle Garden" },
            { src: "/images/lookbook/navy-chain.jpg", alt: "Navy Chain" },
            { src: "/images/lookbook/solar-bloom.jpg", alt: "Solar Bloom" },
            { src: "/images/lookbook/emerald-silk.jpg", alt: "Emerald Silk" },
          ].map((img) => (
            <Link key={img.src} to="/lookbook" className="block aspect-square overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                className="size-full object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
              />
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/lookbook"
            className="font-sans text-[11px] font-semibold tracking-[0.18em] uppercase underline-offset-4 hover:underline"
          >
            See all
          </Link>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <li className="flex items-center gap-4 border-b border-gold/40 pb-5">
      {icon}
      <span className="font-sans text-[12px] font-medium tracking-[0.2em] uppercase">{label}</span>
    </li>
  );
}
