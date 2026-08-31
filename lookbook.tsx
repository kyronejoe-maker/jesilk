import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lookbook")({ component: LookbookPage });

function LookbookPage() {
  return (
    <div className="px-4 py-10 md:px-8 md:py-14">
      <header className="mx-auto mb-10 max-w-xl text-center">
        <p className="font-sans text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
          Gallery
        </p>
        <h1 className="mt-3 font-sans text-2xl font-semibold tracking-[0.14em] uppercase md:text-3xl">
          Lookbook
        </h1>
        <p className="mt-4 font-body text-sm text-muted">
          Art you wear. Beauty you feel. Vintage prints and solid silk — every
          square is 90 × 90 cm.
        </p>
      </header>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {PRODUCTS.map((p, i) => (
          <Link
            key={p.slug}
            to="/products/$slug"
            params={{ slug: p.slug }}
            className={cn(
              "group overflow-hidden bg-bg-brighter",
              i === 0 ? "md:col-span-2 md:row-span-2" : "",
              i === 4 ? "md:col-span-2" : "",
            )}
          >
            <img
              src={p.image}
              alt={p.name}
              className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </Link>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link to="/shop" className={cn(buttonVariants({ size: "lg" }))}>
          Shop the edit
        </Link>
      </div>
    </div>
  );
}
