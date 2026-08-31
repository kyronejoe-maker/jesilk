import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { cartCount, cartSubtotal, useCart } from "@/lib/cart-store";
import { getProduct } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { whatsappCartLink } from "@/lib/brand";
import { useEffect, useMemo } from "react";

export function CartDrawer() {
  const open = useCart((s) => s.open);
  const setOpen = useCart((s) => s.setOpen);
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const count = cartCount(items);
  const subtotal = cartSubtotal(items);

  const waLines = useMemo(
    () =>
      items
        .map((l) => {
          const p = getProduct(l.slug);
          return p ? { name: p.name, qty: l.qty } : null;
        })
        .filter((x): x is { name: string; qty: number } => Boolean(x)),
    [items],
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-overlay transition-opacity duration-200 ease-out ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-bg shadow-[var(--shadow-border)] transition-transform duration-200 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        aria-hidden={!open}
        inert={!open || undefined}
      >
        <div className="flex h-14 items-center justify-between border-b border-border-light px-4">
          <p className="font-sans text-[12px] font-semibold tracking-[0.16em] uppercase">
            Cart · {count}
          </p>
          <button
            type="button"
            className="flex size-11 items-center justify-center"
            aria-label="Close cart"
            onClick={() => setOpen(false)}
          >
            <X className="size-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="font-display text-2xl">Your bag is empty</p>
            <button
              type="button"
              className="mt-4 font-sans text-[11px] font-semibold tracking-[0.16em] uppercase underline-offset-4 hover:underline"
              onClick={() => setOpen(false)}
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-4 py-4">
              {items.map((line) => {
                const p = getProduct(line.slug);
                if (!p) return null;
                return (
                  <li key={line.slug} className="flex gap-3 border-b border-hairline py-4">
                    <img src={p.image} alt="" className="size-20 object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-sans text-sm">{p.name}</p>
                        <p className="font-body text-sm tabular-nums">{formatPrice(p.price * line.qty)}</p>
                      </div>
                      <p className="mt-1 font-body text-xs text-muted">{formatPrice(p.price)}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center border border-border">
                          <button
                            type="button"
                            className="flex size-9 items-center justify-center"
                            aria-label="Decrease quantity"
                            onClick={() => setQty(line.slug, line.qty - 1)}
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="min-w-7 text-center font-body text-sm tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            className="flex size-9 items-center justify-center"
                            aria-label="Increase quantity"
                            onClick={() => setQty(line.slug, line.qty + 1)}
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          className="font-sans text-[11px] tracking-wide text-muted uppercase hover:text-ink"
                          onClick={() => remove(line.slug)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="shrink-0 border-t border-border-light px-4 py-4">
              <div className="flex items-center justify-between font-sans text-sm">
                <span className="tracking-[0.12em] uppercase">Subtotal</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 font-body text-xs text-muted">Shipping calculated at checkout.</p>
              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ size: "lg" }), "mt-3 w-full")}
              >
                Checkout
              </Link>
              <a
                href={whatsappCartLink(waLines)}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "md" }), "mt-2 w-full")}
                onClick={() => setOpen(false)}
              >
                Order on WhatsApp
              </a>
              <button
                type="button"
                className="mt-3 w-full text-center font-sans text-[11px] tracking-[0.16em] uppercase underline-offset-4 hover:underline"
                onClick={() => setOpen(false)}
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
