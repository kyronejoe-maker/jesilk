import { useEffect, type ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { SearchOverlay } from "./search-overlay";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Flower } from "@/components/brand/flower";
import { useCart } from "@/lib/cart-store";

export function SiteShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    useCart.getState().setHydrated();
  }, []);

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-ink">
      <div className="flex h-8 items-center justify-center gap-2 bg-forest px-3 text-center font-sans text-[10px] font-medium tracking-[0.16em] text-on-ink uppercase md:text-[11px] md:tracking-[0.18em]">
        <Flower className="hidden size-3 text-gold-light sm:block" />
        <span className="md:hidden">Vintage ₦7,000 · Solids ₦4,000</span>
        <span className="hidden md:inline">
          Vintage prints ₦7,000 · Solid silk ₦4,000 · Gift wrap included
        </span>
      </div>
      <Header />
      <main id="MainContent" className="flex-1">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
    </div>
  );
}
