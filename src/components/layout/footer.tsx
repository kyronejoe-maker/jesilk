import { Link } from "@tanstack/react-router";
import { Flower } from "@/components/brand/flower";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { useState, type FormEvent } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  }

  return (
    <footer className="mt-8 border-t border-border-light bg-bg">
      <div className="grid gap-10 px-4 py-14 md:grid-cols-4 md:px-8 md:py-16">
        <div className="md:col-span-2">
          <p className="font-display text-3xl font-semibold">Jesilk</p>
          <div className="mt-3">
            <Flower className="size-5" />
          </div>
          <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-muted">
            {BRAND.description}
          </p>
          <form onSubmit={onSubmit} className="mt-8 max-w-sm">
            <label htmlFor="footer-email" className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase">
              Newsletter
            </label>
            {done ? (
              <p className="mt-3 font-body text-sm text-forest">You are on the list.</p>
            ) : (
              <div className="mt-3 flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="h-12 min-h-12 flex-1 border border-border bg-bg-accent px-3 font-body text-sm text-ink outline-none placeholder:text-muted focus:border-ink"
                />
                <Button type="submit" size="md">
                  Join
                </Button>
              </div>
            )}
          </form>
        </div>

        <div>
          <p className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase">Shop</p>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/shop" className="font-body text-sm text-muted hover:text-ink">
                All Products
              </Link>
            </li>
            <li>
              <Link
                to="/collections/$handle"
                params={{ handle: "vintage" }}
                className="font-body text-sm text-muted hover:text-ink"
              >
                Vintage Prints
              </Link>
            </li>
            <li>
              <Link
                to="/collections/$handle"
                params={{ handle: "solids" }}
                className="font-body text-sm text-muted hover:text-ink"
              >
                Solid Silk
              </Link>
            </li>
            <li>
              <Link to="/lookbook" className="font-body text-sm text-muted hover:text-ink">
                Lookbook
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase">House</p>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/about" className="font-body text-sm text-muted hover:text-ink">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="font-body text-sm text-muted hover:text-ink">
                Contact us
              </Link>
            </li>
            <li>
              <Link to="/faq" className="font-body text-sm text-muted hover:text-ink">
                FAQ
              </Link>
            </li>
            <li>
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noreferrer"
                className="font-body text-sm text-muted hover:text-ink"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={BRAND.snapchat}
                target="_blank"
                rel="noreferrer"
                className="font-body text-sm text-muted hover:text-ink"
              >
                Snapchat
              </a>
            </li>
            <li>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="font-body text-sm text-muted hover:text-ink"
              >
                WhatsApp {BRAND.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${BRAND.email}`} className="font-body text-sm text-muted hover:text-ink">
                {BRAND.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-border-light px-4 py-5 font-sans text-[11px] tracking-wide text-muted md:flex-row md:items-center md:justify-between md:px-8">
        <p>© {new Date().getFullYear()} Jesilk. All rights reserved.</p>
        <p>Vintage ₦7,000 · Solids ₦4,000 · 90 × 90 cm</p>
      </div>
    </footer>
  );
}
