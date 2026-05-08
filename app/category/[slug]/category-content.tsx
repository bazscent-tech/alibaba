"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  SlidersHorizontal,
  Grid3X3,
  List,
  ChevronDown,
  X,
  Filter,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import {
  getCategoryBySlug,
  getProductsByCategory,
  getProductsBySubcategory,
  filterProducts,
  type Product,
} from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function CategoryContent() {
  const params = useParams();
  const slug = params.slug as string;
  const category = getCategoryBySlug(slug);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [freeShipping, setFreeShipping] = useState(false);
  const [readyToShip, setReadyToShip] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  if (!category) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Header />
        <main className="container-responsive py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">الفئة غير موجودة</h1>
          <Link href="/categories"><Button>العودة للفئات</Button></Link>
        </main>
        <Footer />
      </div>
    );
  }

  const allProducts = selectedSubcategory
    ? getProductsBySubcategory(selectedSubcategory)
    : getProductsByCategory(category.id);

  const filteredProducts = allProducts.filter(p => {
    if (priceMin && p.priceMin < Number(priceMin)) return false;
    if (priceMax && p.priceMax > Number(priceMax)) return false;
    if (freeShipping && !p.freeShipping) return false;
    if (readyToShip && !p.readyToShip) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc": return a.priceMin - b.priceMin;
      case "price-desc": return b.priceMin - a.priceMin;
      case "rating": return b.rating - a.rating;
      case "orders": return b.orders - a.orders;
      default: return b.orders - a.orders;
    }
  });

  const clearFilters = () => {
    setSelectedSubcategory(null);
    setPriceMin("");
    setPriceMax("");
    setFreeShipping(false);
    setReadyToShip(false);
    setSortBy("popular");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive py-6 sm:py-8 animate-fade-in">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">{category.name}</h1>
        <p className="text-sm text-gray-500 mb-6">{sortedProducts.length} منتج</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="ترتيب حسب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">الأكثر طلباً</SelectItem>
              <SelectItem value="price-asc">السعر: من الأقل</SelectItem>
              <SelectItem value="price-desc">السعر: من الأعلى</SelectItem>
              <SelectItem value="rating">الأعلى تقييماً</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={freeShipping ? "default" : "outline"}
            size="sm"
            onClick={() => setFreeShipping(!freeShipping)}
          >
            <Truck className="h-4 w-4 ml-1" />
            شحن مجاني
          </Button>

          <Button
            variant={readyToShip ? "default" : "outline"}
            size="sm"
            onClick={() => setReadyToShip(!readyToShip)}
          >
            <Zap className="h-4 w-4 ml-1" />
            جاهز للشحن
          </Button>

          {(selectedSubcategory || priceMin || priceMax || freeShipping || readyToShip) && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 ml-1" />
              مسح الفلاتر
            </Button>
          )}
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Filter className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 mb-4">لا توجد منتجات تطابق معايير البحث</p>
            <Button variant="outline" onClick={clearFilters}>مسح الفلاتر</Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
