import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { whatsappOrderLink } from "@/lib/brand";
import { useCart } from "@/lib/cart-store";
import { familyOf, getProduct, relatedTo } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";
import { NotFound } from "@/lib/not-found";

export const Route = createFileRoute("/products/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  if (!product) return <NotFound />;

  const family = familyOf(product);
  const related = relatedTo(product);
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<string | null>("details");

  const img = product.gallery[active] ?? product.image;

  return (
    <div className="px-4 py-8 md:px-8 md:py-12">
      <nav className="mb-6 font-sans text-[11px] tracking-[0.12em] text-muted uppercase">
        <Link to="/shop" className="hover:text-ink">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="aspect-square overflow-hidden bg-bg-brighter">
            <img
              src={img}
              alt={product.name}
              className={cn(
                "size-full",
                img.includes("/flyers/") ? "object-contain" : "object-cover",
              )}
            />
          </div>
          {product.gallery.length > 1 ? (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {product.gallery.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "aspect-square overflow-hidden bg-bg-brighter",
                    i === active ? "ring-1 ring-ink" : "ring-1 ring-transparent",
                  )}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={i === active}
                >
                  <img
                    src={src}
                    alt=""
                    className={cn(
                      "size-full",
                      src.includes("/flyers/") ? "object-contain" : "object-cover",
                    )}
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <h1 className="font-sans text-2xl font-semibold tracking-tight md:text-3xl">{product.name}</h1>
          <p className="mt-2 font-body text-lg tabular-nums">
            {product.available ? formatPrice(product.price) : "Sold Out"}
          </p>

          {family.length > 1 ? (
            <div className="mt-6">
              <p className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase">
                Color — {product.swatch.name}
              </p>
              <div className="mt-3 flex gap-2">
                {family.map((p) => (
                  <Link
                    key={p.slug}
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    title={p.swatch.name}
                    className={cn(
                      "size-8 rounded-full ring-offset-2 ring-offset-bg",
                      p.slug === product.slug ? "ring-1 ring-ink" : "ring-1 ring-ink/15",
                    )}
                    style={{ backgroundColor: p.swatch.hex }}
                    aria-label={p.swatch.name}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-6">
            <p className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex h-11 min-w-20 items-center justify-center border border-ink bg-ink px-4 font-sans text-[11px] font-semibold tracking-[0.14em] text-on-ink uppercase">
                90 × 90
              </span>
              <span className="inline-flex h-11 items-center px-2 font-body text-sm text-muted">
                One size · silk square
              </span>
            </div>
          </div>

          {product.available ? (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center border border-border">
                <button
                  type="button"
                  className="flex size-12 items-center justify-center"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((n) => Math.max(1, n - 1))}
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="min-w-8 text-center font-body tabular-nums">{qty}</span>
                <button
                  type="button"
                  className="flex size-12 items-center justify-center"
                  aria-label="Increase quantity"
                  onClick={() => setQty((n) => n + 1)}
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
              <Button
                className="flex-1 min-w-48"
                size="lg"
                onClick={() => {
                  add(product.slug, qty);
                  toast.success("Added to cart");
                }}
              >
                Add to cart
              </Button>
            </div>
          ) : (
            <Button className="mt-8 w-full" size="lg" disabled>
              Sold out
            </Button>
          )}

          {product.available ? (
            <a
              href={whatsappOrderLink(product.name, qty)}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-3 w-full")}
            >
              Order on WhatsApp
            </a>
          ) : null}

          <p className="mt-6 font-body text-sm leading-relaxed text-ink-soft">{product.description}</p>

          <div className="mt-8 divide-y divide-border-light border-y border-border-light">
            {[
              { id: "details", title: "Details", body: product.details.join(" · ") },
              {
                id: "shipping",
                title: "Shipping & returns",
                body: "Ships across Nigeria in 2–5 business days, gift-wrapped. Confirm your order here, on WhatsApp, Instagram, or Snapchat.",
              },
              {
                id: "care",
                title: "Care",
                body: "Dry clean preferred. Or cool hand wash, press while damp, store flat or rolled — never hung from a clip.",
              },
            ].map((row) => (
              <div key={row.id}>
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-between font-sans text-[12px] font-semibold tracking-[0.14em] uppercase"
                  onClick={() => setOpen(open === row.id ? null : row.id)}
                  aria-expanded={open === row.id}
                >
                  {row.title}
                  <span className="text-lg leading-none">{open === row.id ? "–" : "+"}</span>
                </button>
                {open === row.id ? (
                  <p className="pb-4 font-body text-sm leading-relaxed text-muted">{row.body}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-20">
          <h2 className="mb-8 font-sans text-xl font-semibold tracking-[0.14em] uppercase">
            You may also like
          </h2>
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
