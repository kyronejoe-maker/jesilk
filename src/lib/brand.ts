export const BRAND = {
  name: "Jesilk",
  tagline: "Timeless beauty. Pure silk.",
  line: "Art you wear. Beauty you feel.",
  description:
    "Jesilk is a luxury silk scarf brand offering carefully curated vintage and premium silk scarves designed as timeless, wearable pieces of art.",
  email: "olatunjijoy4896@gmail.com",
  phone: "08039474517",
  phoneDisplay: "0803 947 4517",
  phoneHref: "tel:+2348039474517",
  whatsapp: "https://wa.me/2348039474517",
  instagram: "https://www.instagram.com/jesilk_wrap_luxury",
  instagramHandle: "@jesilk_wrap_luxury",
  snapchat: "https://www.snapchat.com/add/ilovejoy222",
  snapchatHandle: "ilovejoy222",
};

export function whatsappOrderLink(productName: string, qty = 1) {
  const text =
    qty > 1
      ? `Hi Jesilk, I would like to order: ${productName} × ${qty} (90 × 90 cm silk scarf).`
      : `Hi Jesilk, I would like to order: ${productName} (90 × 90 cm silk scarf).`;
  return `${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function whatsappCartLink(lines: { name: string; qty: number }[]) {
  const list = lines.map((l) => `• ${l.name} × ${l.qty}`).join("\n");
  const text = `Hi Jesilk, I would like to order:\n${list}`;
  return `${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;
}
