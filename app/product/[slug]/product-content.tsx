"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProductBySlug, getSupplierById, type Product } from "@/lib/data";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { showToast } from "@/components/toast-notification";
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  CheckCircle,
  MessageCircle,
} from "lucide-react";

export default function ProductContent() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const supplier = product ? getSupplierById(product.supplierId) : null;
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlistStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(product?.moq || 1);

  if (!product) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Header />
        <main className="container-responsive py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">المنتج غير موجود</h1>
          <Link href="/"><Button>العودة للرئيسية</Button></Link>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.image];
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    showToast("cart", `تمت إضافة ${quantity} ${product.unit} للسلة`);
  };

  const decrementQuantity = () => {
    if (quantity > product.moq) setQuantity(quantity - 1);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive py-6 sm:py-8 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Images */}
          <div>
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <button
                onClick={() => {
                  if (inWishlist) {
                    removeWishlist(product.id);
                    showToast("wishlist", "تمت الإزالة من المفضلة");
                  } else {
                    addWishlist(product);
                    showToast("wishlist", "تمت الإضافة للمفضلة");
                  }
                }}
                className="absolute top-3 left-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
              >
                <Heart className={`h-5 w-5 ${inWishlist ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </button>
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 border-2 ${
                      selectedImage === i ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-3">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.rating})</span>
              <span className="text-sm text-gray-400">| {product.orders.toLocaleString("ar-SA")} طلب</span>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl sm:text-3xl font-bold text-primary">${product.priceMin.toFixed(2)}</span>
              <span className="text-gray-400">-</span>
              <span className="text-2xl sm:text-3xl font-bold text-primary">${product.priceMax.toFixed(2)}</span>
              <span className="text-sm text-gray-500">/ {product.unit}</span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{product.description}</p>

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium">الكمية:</span>
              <div className="flex items-center border rounded-lg">
                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={decrementQuantity}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-sm">{quantity}</span>
                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={incrementQuantity}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-xs text-gray-500">الحد الأدنى: {product.moq} {product.unit}</span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.freeShipping && (
                <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm">
                  <Truck className="h-4 w-4" />
                  شحن مجاني
                </div>
              )}
              {product.readyToShip && (
                <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm">
                  <CheckCircle className="h-4 w-4" />
                  جاهز للشحن
                </div>
              )}
              <div className="flex items-center gap-1 bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-sm">
                <Shield className="h-4 w-4" />
                ضمان الجودة
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90 press-effect" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 ml-2" />
                إضافة للسلة ({quantity} {product.unit})
              </Button>
              <Button size="lg" variant="outline" className="press-effect" onClick={() => {
                if (inWishlist) {
                  removeWishlist(product.id);
                  showToast("wishlist", "تمت الإزالة من المفضلة");
                } else {
                  addWishlist(product);
                  showToast("wishlist", "تمت الإضافة للمفضلة");
                }
              }}>
                <Heart className={`h-5 w-5 ${inWishlist ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            {/* Supplier */}
            {supplier && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{supplier.name}</p>
                      <p className="text-xs text-gray-500">{supplier.country} | {supplier.yearsInBusiness} سنوات خبرة</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 ml-1" />
                      تواصل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
