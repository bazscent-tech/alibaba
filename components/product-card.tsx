"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Truck, CheckCircle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/lib/data";
import { getSupplierById } from "@/lib/data";
import { useCartStore } from "@/lib/store";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const supplier = getSupplierById(product.supplierId);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.moq);
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="group h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {product.freeShipping && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
              شحن مجاني
            </div>
          )}
          {product.readyToShip && (
            <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
              جاهز للشحن
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 min-h-[48px]">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-lg font-bold text-primary">
              ${product.priceMin.toFixed(2)}
            </span>
            <span className="text-gray-500">-</span>
            <span className="text-lg font-bold text-primary">
              ${product.priceMax.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">/ {product.unit}</span>
          </div>

          <div className="text-sm text-gray-600 mb-2">
            الحد الأدنى للطلب: {product.moq} {product.unit}
          </div>

          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.rating})</span>
            <span className="text-sm text-gray-400 mr-2">
              | {product.orders.toLocaleString("ar-SA")} طلب
            </span>
          </div>

          {supplier && (
            <div className="flex items-center gap-2 text-sm text-gray-600 border-t pt-3">
              {supplier.verified && (
                <CheckCircle className="h-4 w-4 text-blue-500" />
              )}
              <span className="truncate">{supplier.name}</span>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 ml-2" />
            إضافة للسلة
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
