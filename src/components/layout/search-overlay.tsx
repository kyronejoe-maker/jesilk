import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart-store";
import { searchProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function SearchOverlay() {
  const open = useCart((s) => s.searchOpen);
  const setOpen = useCart((s) => s.setSearchOpen);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = q.trim() ? searchProducts(q) : [];

  useEffect(() => {
    if (!open) return;
    setQ("");
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-bg">
      <div className="mx-auto flex h-full max-w-2xl flex-col px-4 py-6">
        <div className="flex items-center gap-3 border-b border-ink pb-3">
          <Search className="size-5 shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search silk scarves"
            className="h-11 min-h-11 flex-1 bg-transparent font-sans text-lg text-ink outline-none placeholder:text-muted"
            aria-label="Search"
          />
          <button
            type="button"
            className="flex size-11 items-center justify-center"
            aria-label="Close search"
            onClick={() => setOpen(false)}
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-6 flex-1 overflow-y-auto">
          {q.trim() && results.length === 0 ? (
            <p className="font-body text-sm text-muted">No matches for “{q}”.</p>
          ) : (
            <ul className="divide-y divide-hairline">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 py-3"
                  >
                    <img src={p.image} alt="" className="size-16 object-cover" />
                    <div>
                      <p className="font-sans text-sm">{p.name}</p>
                      <p className="font-body text-xs text-muted tabular-nums">
                        {p.available ? formatPrice(p.price) : "Sold Out"}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
