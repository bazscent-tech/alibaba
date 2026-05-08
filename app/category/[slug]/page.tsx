"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import {
  getCategoryBySlug,
  getProductsByCategory,
  categories,
} from "@/lib/data";
import {
  ChevronLeft,
  Filter,
  Grid3X3,
  List,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = getCategoryBySlug(slug);
  const allProducts = category ? getProductsByCategory(category.id) : [];

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [freeShipping, setFreeShipping] = useState(false);
  const [readyToShip, setReadyToShip] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    // Filter by subcategory
    if (selectedSubcategory) {
      products = products.filter((p) => p.subcategoryId === selectedSubcategory);
    }

    // Filter by price
    if (priceMin) {
      products = products.filter((p) => p.priceMin >= parseFloat(priceMin));
    }
    if (priceMax) {
      products = products.filter((p) => p.priceMax <= parseFloat(priceMax));
    }

    // Filter by shipping options
    if (freeShipping) {
      products = products.filter((p) => p.freeShipping);
    }
    if (readyToShip) {
      products = products.filter((p) => p.readyToShip);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        products.sort((a, b) => a.priceMin - b.priceMin);
        break;
      case "price-high":
        products.sort((a, b) => b.priceMin - a.priceMin);
        break;
      case "rating":
        products.sort((a, b) => b.rating - a.rating);
        break;
      case "orders":
        products.sort((a, b) => b.orders - a.orders);
        break;
      default:
        // popular - by orders
        products.sort((a, b) => b.orders - a.orders);
    }

    return products;
  }, [allProducts, selectedSubcategory, priceMin, priceMax, freeShipping, readyToShip, sortBy]);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-responsive py-6 sm:py-8 md:py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            الفئة غير موجودة
          </h1>
          <p className="text-gray-600 mb-6">
            عذراً، لم نتمكن من العثور على الفئة المطلوبة.
          </p>
          <Link href="/">
            <Link href="/"><Button>العودة للرئيسية</Button></Link>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Subcategories */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">الفئات الفرعية</h3>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedSubcategory(null)}
            className={`block w-full text-right py-1 px-2 rounded ${
              !selectedSubcategory
                ? "bg-primary/10 text-primary font-medium"
                : "text-gray-600 hover:text-primary"
            }`}
          >
            جميع المنتجات
          </button>
          {category.subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubcategory(sub.id)}
              className={`block w-full text-right py-1 px-2 rounded ${
                selectedSubcategory === sub.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">نطاق السعر</h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="من"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="w-full"
          />
          <span className="text-gray-400">-</span>
          <Input
            type="number"
            placeholder="إلى"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Shipping Options */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">خيارات الشحن</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="free-shipping"
              checked={freeShipping}
              onCheckedChange={(checked) => setFreeShipping(checked as boolean)}
            />
            <Label htmlFor="free-shipping" className="text-gray-700">
              شحن مجاني
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="ready-to-ship"
              checked={readyToShip}
              onCheckedChange={(checked) => setReadyToShip(checked as boolean)}
            />
            <Label htmlFor="ready-to-ship" className="text-gray-700">
              جاهز للشحن
            </Label>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedSubcategory(null);
          setPriceMin("");
          setPriceMax("");
          setFreeShipping(false);
          setReadyToShip(false);
        }}
      >
        إعادة تعيين الفلاتر
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-responsive py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-primary">
            الرئيسية
          </Link>
          <ChevronLeft className="h-4 w-4" />
          <Link href="/categories" className="hover:text-primary">
            الفئات
          </Link>
          <ChevronLeft className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {category.name}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} منتج متوفر
          </p>
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <Card>
              <CardContent className="p-4">
                <FilterSidebar />
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="h-4 w-4 ml-2" />
                      الفلاتر
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80">
                    <SheetHeader>
                      <SheetTitle>الفلاتر</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* View Mode */}
                <div className="hidden sm:flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${
                      viewMode === "grid"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    <Grid3X3 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${
                      viewMode === "list"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">ترتيب حسب:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">الأكثر شعبية</SelectItem>
                    <SelectItem value="orders">الأكثر طلباً</SelectItem>
                    <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                    <SelectItem value="price-low">السعر: من الأقل</SelectItem>
                    <SelectItem value="price-high">السعر: من الأعلى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div
                className={`grid gap-4 md:gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8 md:py-12">
                <p className="text-gray-600 mb-4">
                  لا توجد منتجات تطابق معايير البحث
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedSubcategory(null);
                    setPriceMin("");
                    setPriceMax("");
                    setFreeShipping(false);
                    setReadyToShip(false);
                  }}
                >
                  إعادة تعيين الفلاتر
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
