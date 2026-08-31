import { Link } from "@tanstack/react-router";
import { productsInCollection } from "@/lib/products";
import { ProductCard } from "./product-card";

export function CollectionSection({
  handle,
  title,
  limit = 4,
}: {
  handle: string;
  title: string;
  limit?: number;
}) {
  const products = productsInCollection(handle).slice(0, limit);
  return (
    <section className="px-4 py-12 md:px-8 md:py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="font-sans text-xl font-semibold tracking-[0.14em] text-ink uppercase md:text-2xl">
          {title}
        </h2>
        <Link
          to="/collections/$handle"
          params={{ handle }}
          className="font-sans text-[11px] font-semibold tracking-[0.18em] text-ink uppercase underline-offset-4 hover:underline"
        >
          Shop Now
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          to="/collections/$handle"
          params={{ handle }}
          className="inline-flex h-11 items-center font-sans text-[11px] font-semibold tracking-[0.18em] text-ink uppercase underline-offset-4 hover:underline"
        >
          View more
        </Link>
      </div>
    </section>
  );
}
