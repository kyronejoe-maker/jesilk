import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { type FormEvent, useMemo, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Flower } from "@/components/brand/flower";
import { BRAND, whatsappCartLink } from "@/lib/brand";
import { cartSubtotal, useCart } from "@/lib/cart-store";
import { getProduct } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

function CheckoutPage() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const subtotal = cartSubtotal(items);
  const shipping = items.length ? 1500 : 0;
  const total = subtotal + shipping;
  const navigate = useNavigate();
  const [placed, setPlaced] = useState<string | null>(null);

  const lines = useMemo(
    () =>
      items
        .map((l) => {
          const p = getProduct(l.slug);
          return p ? { ...l, product: p } : null;
        })
        .filter((x): x is NonNullable<typeof x> => Boolean(x)),
    [items],
  );

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (lines.length === 0) return;
    const id = `JS-${Date.now().toString().slice(-8)}`;
    const fd = new FormData(e.currentTarget);
    const order = {
      id,
      at: new Date().toISOString(),
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      total,
      items: lines.map((l) => ({ slug: l.slug, qty: l.qty, name: l.product.name })),
    };
    try {
      const prev = JSON.parse(localStorage.getItem("jesilk-orders") || "[]") as unknown[];
      localStorage.setItem("jesilk-orders", JSON.stringify([order, ...prev].slice(0, 20)));
    } catch {
      /* ignore */
    }
    clear();
    setPlaced(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <Flower className="mx-auto size-7" />
        <h1 className="mt-5 font-display text-4xl">Thank you</h1>
        <p className="mt-3 font-body text-sm text-muted">
          Order <span className="tabular-nums text-ink">{placed}</span> is confirmed. We will
          reach you on WhatsApp or email to arrange delivery.
        </p>
        <a
          href={BRAND.whatsapp}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ size: "lg" }), "mt-8 inline-flex")}
        >
          Message us on WhatsApp
        </a>
        <Link
          to="/shop"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-3 inline-flex")}
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-display text-3xl">Your bag is empty</h1>
        <Button className="mt-6" onClick={() => navigate({ to: "/shop" })}>
          Shop now
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-12 px-4 py-10 md:grid-cols-2 md:px-8 md:py-16">
      <form onSubmit={onSubmit} className="space-y-5">
        <h1 className="font-sans text-xl font-semibold tracking-[0.12em] uppercase">Checkout</h1>
        <p className="font-body text-sm text-muted">
          Fill the form to place an order, or send the same bag on WhatsApp. We'll
          confirm by phone.
        </p>
        <Field label="Full name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone / WhatsApp" name="phone" type="tel" required />
        <Field label="Address" name="address" required />
        <div className="grid grid-cols-2 gap-3">
          <Field label="City" name="city" required />
          <Field label="State" name="state" required />
        </div>
        <label className="block">
          <span className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase">
            Gift note
          </span>
          <textarea
            name="note"
            rows={3}
            className="mt-2 w-full border border-border bg-bg-accent px-3 py-3 font-body text-sm outline-none focus:border-ink"
          />
        </label>
        <Button type="submit" size="lg" className="w-full">
          Place order · {formatPrice(total)}
        </Button>
        <a
          href={whatsappCartLink(lines.map((l) => ({ name: l.product.name, qty: l.qty })))}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}
        >
          Or order on WhatsApp
        </a>
      </form>

      <aside className="h-fit border border-border bg-bg-accent p-5">
        <p className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase">Order</p>
        <ul className="mt-4 divide-y divide-hairline">
          {lines.map((l) => (
            <li key={l.slug} className="flex gap-3 py-3">
              <img src={l.product.image} alt="" className="size-16 object-cover" />
              <div className="min-w-0 flex-1">
                <p className="font-sans text-sm">{l.product.name}</p>
                <p className="font-body text-xs text-muted">Qty {l.qty}</p>
              </div>
              <p className="font-body text-sm tabular-nums">{formatPrice(l.product.price * l.qty)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-1 border-t border-border-light pt-4 font-body text-sm">
          <Row label="Subtotal" value={formatPrice(subtotal)} />
          <Row label="Shipping" value={formatPrice(shipping)} />
          <div className="flex justify-between pt-2 font-sans text-sm font-semibold">
            <span>Total</span>
            <span className="tabular-nums">{formatPrice(total)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted">
      <span>{label}</span>
      <span className="tabular-nums text-ink">{value}</span>
    </div>
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
