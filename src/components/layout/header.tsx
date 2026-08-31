import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { cartCount, useCart } from "@/lib/cart-store";
import { COLLECTIONS } from "@/lib/products";
import { Flower } from "@/components/brand/flower";
import { useEffect } from "react";

export function Header() {
  const items = useCart((s) => s.items);
  const hydrated = useCart((s) => s.hydrated);
  const setOpen = useCart((s) => s.setOpen);
  const setSearchOpen = useCart((s) => s.setSearchOpen);
  const menuOpen = useCart((s) => s.menuOpen);
  const setMenuOpen = useCart((s) => s.setMenuOpen);
  const count = hydrated ? cartCount(items) : 0;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border-light bg-bg/95 backdrop-blur-sm">
      <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center px-4 md:h-16 md:px-8">
        <div className="flex items-center">
          <button
            type="button"
            className="relative flex size-11 items-center justify-center text-ink md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            <div className="group relative">
              <Link
                to="/shop"
                className="inline-flex h-11 items-center font-sans text-[11px] font-semibold tracking-[0.18em] uppercase"
              >
                Shop
              </Link>
              <div className="pointer-events-none invisible absolute top-full left-0 z-50 min-w-52 border border-border bg-bg-accent py-3 opacity-0 shadow-[var(--shadow-border)] transition-opacity duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
                {COLLECTIONS.map((c) =>
                  c.handle === "all" ? (
                    <Link
                      key={c.handle}
                      to="/shop"
                      className="block px-5 py-2.5 font-sans text-[12px] tracking-wide text-ink hover:text-gold"
                    >
                      {c.title}
                    </Link>
                  ) : (
                    <Link
                      key={c.handle}
                      to="/collections/$handle"
                      params={{ handle: c.handle }}
                      className="block px-5 py-2.5 font-sans text-[12px] tracking-wide text-ink hover:text-gold"
                    >
                      {c.title}
                    </Link>
                  ),
                )}
              </div>
            </div>
            <Link
              to="/lookbook"
              className="inline-flex h-11 items-center font-sans text-[11px] font-semibold tracking-[0.18em] uppercase"
            >
              Lookbook
            </Link>
            <Link
              to="/about"
              className="inline-flex h-11 items-center font-sans text-[11px] font-semibold tracking-[0.18em] uppercase"
            >
              About
            </Link>
          </nav>
        </div>

        <Link to="/" className="flex flex-col items-center leading-none" aria-label="Jesilk home">
          <span className="font-display text-[28px] font-semibold tracking-tight text-ink md:text-[32px]">
            Jesilk
          </span>
        </Link>

        <div className="flex items-center justify-end">
          <button
            type="button"
            className="relative flex size-11 items-center justify-center text-ink"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="size-4.5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            className="relative flex size-11 items-center justify-center text-ink"
            aria-label={`Cart, ${count} items`}
            onClick={() => setOpen(true)}
          >
            <ShoppingBag className="size-4.5" strokeWidth={1.75} />
            <span className="absolute top-1.5 right-1 min-w-4 text-center font-sans text-[10px] font-semibold tabular-nums">
              {count}
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-border-light bg-bg px-4 py-6 md:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            <p className="mb-2 font-sans text-[10px] font-semibold tracking-[0.2em] text-muted uppercase">
              Shop
            </p>
            {COLLECTIONS.map((c) =>
              c.handle === "all" ? (
                <Link
                  key={c.handle}
                  to="/shop"
                  className="flex min-h-11 items-center font-sans text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  {c.title}
                </Link>
              ) : (
                <Link
                  key={c.handle}
                  to="/collections/$handle"
                  params={{ handle: c.handle }}
                  className="flex min-h-11 items-center font-sans text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  {c.title}
                </Link>
              ),
            )}
            <div className="my-4 h-px bg-border-light" />
            <Link
              to="/lookbook"
              className="flex min-h-11 items-center font-sans text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Lookbook
            </Link>
            <Link
              to="/about"
              className="flex min-h-11 items-center font-sans text-sm"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="flex min-h-11 items-center font-sans text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="mt-6 flex items-center gap-2 text-gold">
              <Flower className="size-4" />
              <span className="font-sans text-[11px] tracking-[0.16em] uppercase">Art you wear</span>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
