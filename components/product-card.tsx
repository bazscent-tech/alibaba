"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Truck, CheckCircle, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    showToast("cart", "تمت إضافة المنتج للسلة");
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeWishlist(product.id);
      showToast("wishlist", "تمت الإزالة من المفضلة");
    } else {
      addWishlist(product);
      showToast("wishlist", "تمت الإضافة للمفضلة");
    }
  };

  return (
    <Link href={`/product/${product.slug}`} className="block h-full">
      <Card className="group h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden card-interactive">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            loading="lazy"
          />
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 p-1.5 sm:p-2 rounded-full bg-white/80 hover:bg-white transition-colors z-10"
            aria-label={inWishlist ? "إزالة من المفضلة" : "إضافة للمفضلة"}
          >
            <Heart
              className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors ${
                inWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>

          {product.freeShipping && (
            <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-green-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
              شحن مجاني
            </div>
          )}
          {product.readyToShip && (
            <div className="absolute top-8 right-1.5 sm:top-10 sm:right-2 bg-blue-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
              جاهز للشحن
            </div>
          )}
        </div>
        <CardContent className="p-2.5 sm:p-3 md:p-4">
          <h3 className="font-medium text-gray-900 line-clamp-2 mb-1.5 sm:mb-2 min-h-[36px] sm:min-h-[48px] text-xs sm:text-sm md:text-base leading-snug">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-0.5 sm:gap-1 mb-1 sm:mb-2">
            <span className="text-sm sm:text-lg font-bold text-primary">
              ${product.priceMin.toFixed(2)}
            </span>
            <span className="text-gray-500">-</span>
            <span className="text-sm sm:text-lg font-bold text-primary">
              ${product.priceMax.toFixed(2)}
            </span>
            <span className="text-[10px] sm:text-sm text-gray-500">/ {product.unit}</span>
          </div>

          <div className="text-[10px] sm:text-xs md:text-sm text-gray-600 mb-1 sm:mb-2">
            الحد الأدنى: {product.moq} {product.unit}
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1 mb-2 sm:mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 sm:h-4 sm:w-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-sm text-gray-500">({product.rating})</span>
            <span className="text-[10px] sm:text-sm text-gray-400 mr-1 sm:mr-2 hidden sm:inline">
              | {product.orders.toLocaleString("ar-SA")} طلب
            </span>
          </div>

          {supplier && (
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm text-gray-600 border-t pt-2 sm:pt-3">
              {supplier.verified && (
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 shrink-0" />
              )}
              <span className="truncate">{supplier.name}</span>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2 sm:mt-3 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity text-[10px] sm:text-xs h-8 sm:h-9"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
            إضافة للسلة
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
