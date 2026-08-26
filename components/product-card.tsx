"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle, ShoppingCart, Heart, ArrowUpLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Product } from "@/lib/data";
import { getSupplierById } from "@/lib/data";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { showToast } from "@/components/toast-notification";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const supplier = getSupplierById(product.supplierId);
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, product.moq);
    showToast("cart", `تمت إضافة ${product.moq} ${product.unit} للسلة`);
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeWishlist(product.id);
      showToast("wishlist", "تمت الإزالة من المفضلة");
    } else {
      addWishlist(product);
      showToast("wishlist", "تمت الإضافة للمفضلة");
    }
  };

  return (
    <Card className="product-card group">
      <div className="product-card__media">
        <Link href={`/product/${product.slug}`} className="block h-full" aria-label={product.name}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
        </Link>
        <div className="product-card__tags">
          {product.readyToShip ? <span className="tag tag--blue">جاهز للشحن</span> : null}
          {product.freeShipping ? <span className="tag tag--green">شحن مجاني</span> : null}
        </div>
        <button className={`product-card__favorite ${inWishlist ? "is-active" : ""}`} onClick={handleWishlist} aria-label={inWishlist ? "إزالة من المفضلة" : "إضافة للمفضلة"}>
          <Heart className="h-[17px] w-[17px]" fill={inWishlist ? "currentColor" : "none"} />
        </button>
        <Link href={`/product/${product.slug}`} className="product-card__quick"><ArrowUpLeft className="h-4 w-4" /></Link>
      </div>
      <div className="product-card__body">
        <div className="product-card__supplier">
          {supplier?.verified ? <CheckCircle className="h-3.5 w-3.5 text-[#2b74ff]" /> : null}
          <span>{supplier?.name || "مورد موثوق"}</span>
        </div>
        <Link href={`/product/${product.slug}`} className="product-card__title">{product.name}</Link>
        <div className="product-card__rating"><span className="rating-stars"><Star className="h-3.5 w-3.5" fill="currentColor" /> {product.rating}</span><span>{product.orders.toLocaleString("ar-SA")} طلب</span></div>
        <div className="product-card__footer">
          <div><span className="product-card__price">${product.priceMin.toFixed(2)}</span><span className="product-card__unit"> / {product.unit}</span><span className="product-card__range">حتى ${product.priceMax.toFixed(2)}</span></div>
          <button className="product-card__add" onClick={handleAddToCart} aria-label={`إضافة ${product.name} للسلة`}><ShoppingCart className="h-4 w-4" /></button>
        </div>
        <p className="product-card__moq">الحد الأدنى للطلب: <strong>{product.moq} {product.unit}</strong></p>
      </div>
    </Card>
  );
}
