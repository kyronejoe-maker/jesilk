import { useMemo, useState } from "react";
import { getCollection, productsInCollection } from "@/lib/products";
import { ProductGrid } from "./product-grid";

type Sort = "featured" | "newest" | "price-asc" | "price-desc";
type Stock = "all" | "in" | "out";

export function CollectionView({ handle }: { handle: string }) {
  const collection = getCollection(handle);
  const title = collection?.title ?? "Shop";
  const blurb = collection?.blurb ?? "";
  const [sort, setSort] = useState<Sort>("featured");
  const [stock, setStock] = useState<Stock>("all");
  const [maxPrice, setMaxPrice] = useState(7000);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const products = useMemo(() => {
    let list = productsInCollection(handle);
    if (stock === "in") list = list.filter((p) => p.available);
    if (stock === "out") list = list.filter((p) => !p.available);
    list = list.filter((p) => p.price <= maxPrice);
    const copy = [...list];
    if (sort === "newest") copy.sort((a, b) => Number(b.newest) - Number(a.newest));
    if (sort === "price-asc") copy.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") copy.sort((a, b) => b.price - a.price);
    if (sort === "featured") copy.sort((a, b) => Number(b.featured) - Number(a.featured));
    return copy;
  }, [handle, sort, stock, maxPrice]);

  const filterCount = (stock !== "all" ? 1 : 0) + (maxPrice < 7000 ? 1 : 0);

  return (
    <div className="px-4 py-10 md:px-8 md:py-12">
      <header className="mb-8 text-center">
        <h1 className="font-sans text-2xl font-semibold tracking-[0.14em] uppercase md:text-3xl">
          {title}
        </h1>
        {blurb ? <p className="mt-3 font-body text-sm text-muted">{blurb}</p> : null}
      </header>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-y border-border-light py-3">
        <button
          type="button"
          className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase"
          onClick={() => setFiltersOpen((v) => !v)}
        >
          Filters {filterCount > 0 ? filterCount : ""}
        </button>
        <label className="flex items-center gap-2 font-sans text-[11px] tracking-[0.12em] uppercase">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-10 min-h-10 border-0 bg-transparent font-sans text-[11px] tracking-[0.12em] uppercase outline-none"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
          </select>
        </label>
      </div>

      {filtersOpen ? (
        <div className="mb-8 grid gap-6 border border-border bg-bg-accent p-5 md:grid-cols-2">
          <fieldset>
            <legend className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase">
              Availability
            </legend>
            <div className="mt-3 flex flex-col gap-2">
              {(
                [
                  ["all", "All"],
                  ["in", "In stock"],
                  ["out", "Out of stock"],
                ] as const
              ).map(([v, label]) => (
                <label key={v} className="flex min-h-10 items-center gap-2 font-body text-sm">
                  <input
                    type="radio"
                    name="stock"
                    checked={stock === v}
                    onChange={() => setStock(v)}
                    className="accent-ink"
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase">
              Price
            </legend>
            <label className="mt-4 block font-body text-sm text-muted">
              Up to ₦{maxPrice.toLocaleString("en-NG")}
              <input
                type="range"
                min={4000}
                max={7000}
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-3 w-full accent-ink"
              />
            </label>
          </fieldset>
        </div>
      ) : null}

      <p className="mb-6 font-body text-xs text-muted">{products.length} items</p>
      <ProductGrid products={products} />
    </div>
  );
}
