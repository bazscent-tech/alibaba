import type { Product } from "./data";

export function createProductShareUrl(product: Product): string {
  if (typeof window === "undefined") return `/product/${product.slug}`;
  return `${window.location.origin}/product/${product.slug}`;
}

export function createCartShareUrl(items: Array<{ product: Product; quantity: number }>): string {
  const payload = items.map((item) => `${item.product.id}.${item.quantity}`).join(",");
  if (typeof window === "undefined") return `/cart?share=${encodeURIComponent(payload)}`;
  return `${window.location.origin}/cart?share=${encodeURIComponent(payload)}`;
}

export function createSocialShareLinks(url: string, text: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    messenger: `https://www.facebook.com/dialog/send?link=${encodedUrl}&redirect_uri=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`,
  };
}

export function decodeCartSharePayload(value: string): Array<{ id: string; quantity: number }> {
  return value.split(",").flatMap((entry) => {
    const [id, quantityText] = entry.split(".");
    const quantity = Number(quantityText);
    return id && Number.isFinite(quantity) && quantity > 0 ? [{ id, quantity: Math.floor(quantity) }] : [];
  });
}
