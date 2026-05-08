"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/lib/store";
import { Heart, ShoppingCart } from "lucide-react";

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500 fill-red-500" />
            <h1 className="text-xl sm:text-2xl font-bold">المفضلة</h1>
            <span className="text-sm text-gray-500">({items.length} منتج)</span>
          </div>
          {items.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearWishlist}>
              مسح الكل
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-semibold mb-2">قائمة المفضلة فارغة</h2>
            <p className="text-gray-500 text-sm mb-4">أضف المنتجات التي تعجبك للمفضلة</p>
            <Link href="/"><Button>تصفح المنتجات</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
