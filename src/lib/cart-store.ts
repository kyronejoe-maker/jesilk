import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProduct } from "./products";

export type CartLine = { slug: string; qty: number };

type CartState = {
  items: CartLine[];
  open: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  hydrated: boolean;
  setHydrated: () => void;
  setOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setMenuOpen: (open: boolean) => void;
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      searchOpen: false,
      menuOpen: false,
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      setOpen: (open) => set({ open, menuOpen: open ? false : get().menuOpen }),
      setSearchOpen: (searchOpen) => set({ searchOpen }),
      setMenuOpen: (menuOpen) => set({ menuOpen }),
      add: (slug, qty = 1) => {
        const product = getProduct(slug);
        if (!product?.available) return;
        const items = [...get().items];
        const i = items.findIndex((l) => l.slug === slug);
        if (i >= 0) items[i] = { slug, qty: items[i].qty + qty };
        else items.push({ slug, qty });
        set({ items, open: true });
      },
      remove: (slug) => set({ items: get().items.filter((l) => l.slug !== slug) }),
      setQty: (slug, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((l) => l.slug !== slug) });
          return;
        }
        set({
          items: get().items.map((l) => (l.slug === slug ? { slug, qty } : l)),
        });
      },
      clear: () => set({ items: [] }),
    }),
    {
      name: "jesilk-cart",
      partialize: (s) => ({ items: s.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

export function cartCount(items: CartLine[]) {
  return items.reduce((n, l) => n + l.qty, 0);
}

export function cartSubtotal(items: CartLine[]) {
  return items.reduce((n, l) => {
    const p = getProduct(l.slug);
    return n + (p ? p.price * l.qty : 0);
  }, 0);
}
