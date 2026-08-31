export type ColorDot = { name: string; hex: string };

export type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  hoverImage: string;
  gallery: string[];
  description: string;
  details: string[];
  collections: string[];
  colorFamily: string;
  swatch: ColorDot;
  available: boolean;
  featured: boolean;
  newest: boolean;
};

export type Collection = {
  handle: string;
  title: string;
  blurb: string;
};

export const COLLECTIONS: Collection[] = [
  { handle: "all", title: "All Products", blurb: "Vintage prints and solid silk — 90 × 90 cm." },
  { handle: "best-sellers", title: "Best Sellers", blurb: "The scarves everyone reaches for first." },
  { handle: "latest", title: "Latest", blurb: "New arrivals from the atelier." },
  { handle: "vintage", title: "Vintage Prints", blurb: "Curated statement squares. ₦7,000 each." },
  { handle: "solids", title: "Solid Silk", blurb: "Pure colour, premium silk. ₦4,000 each." },
];

const DETAILS_VINTAGE = [
  "100% premium silk",
  "90 × 90 cm square",
  "Vintage / statement print",
  "Lightweight & luminous",
];

const DETAILS_SOLID = [
  "100% premium silk",
  "90 × 90 cm square",
  "Solid colour",
  "Lightweight & luminous",
];

export const PRODUCTS: Product[] = [
  {
    slug: "ivory-bridle-garden",
    name: "Ivory Bridle Garden",
    price: 7000,
    image: "/images/products/ivory-bridle-garden.jpg",
    hoverImage: "/images/products/ivory-bridle-garden-hover.jpg",
    gallery: [
      "/images/products/ivory-bridle-garden.jpg",
      "/images/products/ivory-bridle-garden-hover.jpg",
      "/images/products/ivory-bridle-garden-tall.jpg",
      "/images/flyers/ivory-bridle-garden.jpg",
    ],
    description:
      "Ivory silk with green and tan bridles, cream blossoms, and a black field. A vintage garden square — art you wear.",
    details: DETAILS_VINTAGE,
    collections: ["best-sellers", "vintage"],
    colorFamily: "ivory-bridle-garden",
    swatch: { name: "Ivory", hex: "#E8DCC8" },
    available: true,
    featured: true,
    newest: false,
  },
  {
    slug: "navy-chain",
    name: "Navy Chain",
    price: 7000,
    image: "/images/products/navy-chain.jpg",
    hoverImage: "/images/products/navy-chain-hover.jpg",
    gallery: [
      "/images/products/navy-chain.jpg",
      "/images/products/navy-chain-hover.jpg",
      "/images/products/navy-chain-tall.jpg",
      "/images/flyers/navy-chain.jpg",
    ],
    description:
      "Midnight navy silk in a gold chain lattice, finished with a red and green border. A classic luxury print, 90 × 90 cm.",
    details: DETAILS_VINTAGE,
    collections: ["best-sellers", "vintage"],
    colorFamily: "navy-chain",
    swatch: { name: "Navy", hex: "#1A1F3A" },
    available: true,
    featured: true,
    newest: false,
  },
  {
    slug: "solar-bloom",
    name: "Solar Bloom",
    price: 7000,
    image: "/images/products/solar-bloom.jpg",
    hoverImage: "/images/products/solar-bloom-hover.jpg",
    gallery: [
      "/images/products/solar-bloom.jpg",
      "/images/products/solar-bloom-hover.jpg",
      "/images/products/solar-bloom-tall.jpg",
      "/images/flyers/solar-bloom.jpg",
    ],
    description:
      "Cobalt, orange, and fuchsia in a floral medallion print. The brightest square in the vintage edit.",
    details: DETAILS_VINTAGE,
    collections: ["best-sellers", "vintage"],
    colorFamily: "solar-bloom",
    swatch: { name: "Cobalt", hex: "#1E3A8A" },
    available: true,
    featured: true,
    newest: true,
  },
  {
    slug: "fuchsia-equestre",
    name: "Fuchsia Équestre",
    price: 7000,
    image: "/images/products/fuchsia-equestre.jpg",
    hoverImage: "/images/products/fuchsia-equestre-hover.jpg",
    gallery: [
      "/images/products/fuchsia-equestre.jpg",
      "/images/products/fuchsia-equestre-hover.jpg",
      "/images/products/fuchsia-equestre-tall.jpg",
      "/images/flyers/fuchsia-equestre.jpg",
    ],
    description:
      "Hot-pink silk with cobalt bits, gold chains, and sunflower hardware. An equestrian print with evening colour.",
    details: DETAILS_VINTAGE,
    collections: ["best-sellers", "vintage"],
    colorFamily: "fuchsia-equestre",
    swatch: { name: "Fuchsia", hex: "#C2185B" },
    available: true,
    featured: true,
    newest: false,
  },
  {
    slug: "noir-check",
    name: "Noir Check",
    price: 7000,
    image: "/images/products/noir-check.jpg",
    hoverImage: "/images/products/noir-check-hover.jpg",
    gallery: [
      "/images/products/noir-check.jpg",
      "/images/products/noir-check-hover.jpg",
      "/images/products/noir-check-tall.jpg",
      "/images/flyers/noir-check.jpg",
    ],
    description:
      "Black and ivory checkerboard silk with circular monograms. Graphic, high-contrast, made to be seen.",
    details: DETAILS_VINTAGE,
    collections: ["vintage"],
    colorFamily: "noir-check",
    swatch: { name: "Check", hex: "#111111" },
    available: true,
    featured: false,
    newest: true,
  },
  {
    slug: "peach-silk",
    name: "Peach Silk",
    price: 4000,
    image: "/images/products/peach-silk.jpg",
    hoverImage: "/images/products/peach-silk-hover.jpg",
    gallery: [
      "/images/products/peach-silk.jpg",
      "/images/products/peach-silk-hover.jpg",
      "/images/flyers/peach-silk.jpg",
    ],
    description:
      "Solid peach mulberry silk. Soft, luminous, and cut to 90 × 90 cm — the quiet square for every day.",
    details: DETAILS_SOLID,
    collections: ["solids"],
    colorFamily: "solid",
    swatch: { name: "Peach", hex: "#E8A882" },
    available: true,
    featured: false,
    newest: true,
  },
  {
    slug: "cobalt-silk",
    name: "Cobalt Silk",
    price: 4000,
    image: "/images/products/cobalt-silk.jpg",
    hoverImage: "/images/products/cobalt-silk-hover.jpg",
    gallery: [
      "/images/products/cobalt-silk.jpg",
      "/images/products/cobalt-silk-hover.jpg",
      "/images/flyers/cobalt-silk.jpg",
    ],
    description:
      "Solid cobalt silk with a high sheen. One colour, full presence — 90 × 90 cm.",
    details: DETAILS_SOLID,
    collections: ["solids", "best-sellers"],
    colorFamily: "solid",
    swatch: { name: "Cobalt", hex: "#2F6BDD" },
    available: true,
    featured: true,
    newest: true,
  },
  {
    slug: "teal-silk",
    name: "Teal Silk",
    price: 4000,
    image: "/images/products/teal-silk.jpg",
    hoverImage: "/images/products/teal-silk-hover.jpg",
    gallery: [
      "/images/products/teal-silk.jpg",
      "/images/products/teal-silk-hover.jpg",
      "/images/flyers/teal-silk.jpg",
    ],
    description:
      "Solid teal silk. Cool, jewel-toned, and light on the neck.",
    details: DETAILS_SOLID,
    collections: ["solids"],
    colorFamily: "solid",
    swatch: { name: "Teal", hex: "#1A8A8A" },
    available: true,
    featured: false,
    newest: true,
  },
  {
    slug: "noir-silk",
    name: "Noir Silk",
    price: 4000,
    image: "/images/products/noir-silk.jpg",
    hoverImage: "/images/products/noir-silk-hover.jpg",
    gallery: [
      "/images/products/noir-silk.jpg",
      "/images/products/noir-silk-hover.jpg",
      "/images/flyers/noir-silk.jpg",
    ],
    description:
      "Solid black silk. The essential square — evening, work, every day.",
    details: DETAILS_SOLID,
    collections: ["solids", "best-sellers"],
    colorFamily: "solid",
    swatch: { name: "Noir", hex: "#111111" },
    available: true,
    featured: true,
    newest: false,
  },
  {
    slug: "emerald-silk",
    name: "Emerald Silk",
    price: 4000,
    image: "/images/products/emerald-silk.jpg",
    hoverImage: "/images/products/emerald-silk-hover.jpg",
    gallery: [
      "/images/products/emerald-silk.jpg",
      "/images/products/emerald-silk-hover.jpg",
      "/images/flyers/emerald-silk.jpg",
    ],
    description:
      "Solid emerald silk with a deep, liquid sheen. Forest colour, 90 × 90 cm.",
    details: DETAILS_SOLID,
    collections: ["solids"],
    colorFamily: "solid",
    swatch: { name: "Emerald", hex: "#0F6B3C" },
    available: true,
    featured: false,
    newest: true,
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsInCollection(handle: string) {
  if (handle === "all") return PRODUCTS;
  if (handle === "best-sellers") return PRODUCTS.filter((p) => p.featured);
  if (handle === "latest") return PRODUCTS.filter((p) => p.newest);
  return PRODUCTS.filter((p) => p.collections.includes(handle));
}

export function familyOf(product: Product) {
  return PRODUCTS.filter((p) => p.colorFamily === product.colorFamily);
}

export function relatedTo(product: Product, n = 4) {
  const pool = PRODUCTS.filter(
    (p) =>
      p.slug !== product.slug &&
      (p.colorFamily === product.colorFamily ||
        p.collections.some((c) => product.collections.includes(c))),
  );
  return pool.slice(0, n);
}

export function searchProducts(q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(s) ||
      p.description.toLowerCase().includes(s) ||
      p.collections.some((c) => c.includes(s)) ||
      p.swatch.name.toLowerCase().includes(s),
  );
}

export function getCollection(handle: string) {
  return COLLECTIONS.find((c) => c.handle === handle);
}
