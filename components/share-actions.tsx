"use client";

import { useMemo, useState, type MouseEvent } from "react";
import { Check, Copy, Facebook, Link as LinkIcon, MessageCircle, Send, Share2 } from "lucide-react";
import type { Product } from "@/lib/data";
import { createProductShareUrl, createCartShareUrl, createSocialShareLinks } from "@/lib/share";

interface ShareActionsProps {
  product?: Product;
  cartItems?: Array<{ product: Product; quantity: number }>;
  compact?: boolean;
}

export function ShareActions({ product, cartItems, compact = false }: ShareActionsProps) {

  const [copied, setCopied] = useState(false);
  const isCart = Boolean(cartItems);
  const title = product ? `شاهد ${product.name} بالجملة على شبام جملة` : "سلة مشتريات بالجملة من شبام جملة";
  const fallbackUrl = product ? createProductShareUrl(product) : createCartShareUrl(cartItems || []);
  const sharePath = product
    ? `/product/${product.slug}`
    : `/cart?share=${encodeURIComponent((cartItems || []).map((item) => `${item.product.id}.${item.quantity}`).join(","))}`;
  const resolvedUrl = typeof window !== "undefined" ? `${window.location.origin}${sharePath}` : fallbackUrl;

  const links = useMemo(() => createSocialShareLinks(resolvedUrl, title), [resolvedUrl, title]);

  const handleShare = (event: MouseEvent<HTMLAnchorElement>, provider: keyof ReturnType<typeof createSocialShareLinks>) => {
    event.preventDefault();
    const absoluteUrl = `${window.location.origin}${sharePath}`;
    const target = createSocialShareLinks(absoluteUrl, title)[provider];
    window.open(target, "_blank", "noopener,noreferrer");
  };

  const copyLink = async () => {
    await navigator.clipboard?.writeText(resolvedUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className={`share-actions ${compact ? "share-actions--compact" : ""}`}>
      {!compact ? <div className="share-actions__heading"><Share2 className="h-4 w-4" /><span>شارك {isCart ? "السلة" : "المنتج"}</span></div> : null}
      <div className="share-actions__buttons">
        <a href={links.facebook} onClick={(event) => handleShare(event, "facebook")} target="_blank" rel="noreferrer" className="share-action share-action--facebook" aria-label="مشاركة على فيسبوك"><Facebook className="h-4 w-4" />{compact ? null : <span>فيسبوك</span>}</a>
        <a href={links.messenger} onClick={(event) => handleShare(event, "messenger")} target="_blank" rel="noreferrer" className="share-action share-action--messenger" aria-label="مشاركة عبر ماسنجر"><MessageCircle className="h-4 w-4" />{compact ? null : <span>ماسنجر</span>}</a>
        <a href={links.telegram} onClick={(event) => handleShare(event, "telegram")} target="_blank" rel="noreferrer" className="share-action share-action--telegram" aria-label="مشاركة على تيليجرام"><Send className="h-4 w-4" />{compact ? null : <span>تيليجرام</span>}</a>
        <a href={links.whatsapp} onClick={(event) => handleShare(event, "whatsapp")} target="_blank" rel="noreferrer" className="share-action share-action--whatsapp" aria-label="مشاركة عبر واتساب"><MessageCircle className="h-4 w-4" />{compact ? null : <span>واتساب</span>}</a>
        <button type="button" onClick={copyLink} className="share-action share-action--copy" aria-label="نسخ رابط المشاركة">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {compact ? null : <span>{copied ? "تم النسخ" : "نسخ الرابط"}</span>}</button>
      </div>
      {!compact ? <p className="share-actions__hint"><LinkIcon className="h-3.5 w-3.5" /> رابط قصير يحافظ على صورة المنتج عند مشاركته</p> : null}
    </div>
  );
}
