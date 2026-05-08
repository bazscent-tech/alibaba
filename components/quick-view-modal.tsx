"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, getSupplierById } from "@/lib/data";
import { useCartStore } from "@/lib/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Star,
  ShoppingCart,
  MessageSquare,
  Shield,
  Truck,
  Package,
  Plus,
  Minus,
  Heart,
  Share2,
  CheckCircle2,
} from "lucide-react";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({
  product,
  isOpen,
  onClose,
}: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(product?.moq || 1);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) return null;

  const supplier = getSupplierById(product.supplierId);

  const handleAddToCart = () => {
    addItem(product, quantity);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.discount && product.discount > 0 && (
              <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                -{product.discount}%
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold leading-tight mb-2">
                {product.name}
              </h2>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">
                    ({product.orders} طلب)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="p-4 bg-orange-50 rounded-xl">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-primary">
                  ${product.priceMin.toFixed(2)}
                </span>
                <span className="text-muted-foreground">-</span>
                <span className="text-xl font-bold text-primary">
                  ${product.priceMax.toFixed(2)}
                </span>
                <span className="text-muted-foreground">/ قطعة</span>
              </div>
              {product.discount && product.discount > 0 && (
                <p className="text-sm text-green-600 font-medium">
                  وفر {product.discount}% عند الطلب الآن!
                </p>
              )}
            </div>

            {/* Supplier */}
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{product.supplier}</p>
                <p className="text-xs text-muted-foreground">{product.origin}</p>
              </div>
              {product.verified && (
                <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  موثق
                </span>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                الكمية (الحد الأدنى: {product.moq})
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setQuantity((q) => Math.max(product.moq, q - 10))
                  }
                  className="w-10 h-10 rounded-md border flex items-center justify-center hover:bg-muted"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(product.moq, parseInt(e.target.value) || product.moq)
                    )
                  }
                  className="w-24 text-center"
                  min={product.moq}
                />
                <button
                  onClick={() => setQuantity((q) => q + 10)}
                  className="w-10 h-10 rounded-md border flex items-center justify-center hover:bg-muted"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button onClick={handleAddToCart} className="flex-1 gap-2">
                <ShoppingCart className="w-4 h-4" />
                إضافة للسلة
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <MessageSquare className="w-4 h-4" />
                تواصل مع المورد
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="flex-1 gap-2">
                <Heart className="w-4 h-4" />
                حفظ
              </Button>
              <Button variant="ghost" size="sm" className="flex-1 gap-2">
                <Share2 className="w-4 h-4" />
                مشاركة
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t">
              <div className="text-center p-2">
                <Shield className="w-5 h-5 mx-auto mb-1 text-green-600" />
                <span className="text-xs text-muted-foreground">حماية المشتري</span>
              </div>
              <div className="text-center p-2">
                <Truck className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                <span className="text-xs text-muted-foreground">شحن سريع</span>
              </div>
              <div className="text-center p-2">
                <Package className="w-5 h-5 mx-auto mb-1 text-orange-600" />
                <span className="text-xs text-muted-foreground">جودة مضمونة</span>
              </div>
            </div>

            {/* View Full Details */}
            <Link
              href={`/product/${product.id}`}
              className="block text-center text-primary hover:underline text-sm"
              onClick={onClose}
            >
              عرض التفاصيل الكاملة للمنتج
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
