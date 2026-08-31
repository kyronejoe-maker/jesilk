import { Link } from "@tanstack/react-router";
import { familyOf, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const family = familyOf(product);

  return (
    <article className="group">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="block"
        aria-label={product.name}
      >
        <div className="relative aspect-square overflow-hidden bg-bg-brighter">
          <img
            src={product.image}
            alt=""
            className="absolute inset-0 size-full object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
          />
          <img
            src={product.hoverImage}
            alt=""
            className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          />
          {!product.available ? (
            <span className="absolute top-3 left-3 bg-ink px-2.5 py-1 font-sans text-[10px] font-semibold tracking-[0.16em] text-on-ink uppercase">
              Sold Out
            </span>
          ) : product.newest ? (
            <span className="absolute top-3 left-3 bg-bg/90 px-2.5 py-1 font-sans text-[10px] font-semibold tracking-[0.16em] text-ink uppercase">
              New
            </span>
          ) : null}
        </div>
        <div className="pt-3">
          <h3 className="font-sans text-[13px] font-medium tracking-wide text-ink">
            {product.name}
          </h3>
          <p className="mt-0.5 font-body text-[13px] text-muted tabular-nums">
            {product.available ? formatPrice(product.price) : "Sold Out"}
          </p>
        </div>
      </Link>
      {family.length > 1 ? (
        <div className="mt-2 flex items-center gap-1.5">
          {family.map((p) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              aria-label={p.swatch.name}
              title={p.swatch.name}
              className="block size-3 rounded-full ring-1 ring-ink/15 after:absolute after:size-10 after:-translate-x-1/2 after:-translate-y-1/2 after:top-1/2 after:left-1/2 relative"
              style={{ backgroundColor: p.swatch.hex }}
            />
          ))}
          <span className="ml-1 font-sans text-[10px] tracking-wide text-muted">
            {family.length} colors
          </span>
        </div>
      ) : null}
    </article>
  );
}
