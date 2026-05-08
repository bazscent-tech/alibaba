"use client";

import { useState, useMemo, Suspense, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { searchProducts, categories } from "@/lib/data";
import { debounce } from "@/lib/api-helpers";
import { ChevronLeft, Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [liveResults, setLiveResults] = useState<typeof results>([]);

  const results = useMemo(() => {
    if (!query) return [];
    return searchProducts(query);
  }, [query]);

  const handleSearch = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchInput.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchInput)}`;
    }
  }, [searchInput]);

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      if (searchInput.length >= 2) {
        setLiveResults(searchProducts(searchInput));
      } else {
        setLiveResults([]);
      }
    }, 300);
    debouncedSearch();
  }, [searchInput]);

  return (
    <main className="container-responsive animate-fade-in py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-primary">
          الرئيسية
        </Link>
        <ChevronLeft className="h-4 w-4" />
        <span className="text-gray-900 font-medium">نتائج البحث</span>
      </nav>

      {/* Search Box */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex max-w-2xl gap-2">
          <Input
            type="text"
            placeholder="ابحث عن منتجات..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <SearchIcon className="h-5 w-5 ml-2" />
            بحث
          </Button>
        </form>
      </div>

      {query ? (
        <>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            نتائج البحث عن: &quot;{query}&quot;
          </h1>
          <p className="text-gray-600 mb-6">{results.length} نتيجة</p>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8 md:py-12">
              <p className="text-gray-600 mb-4">
                لم نجد أي منتجات تطابق بحثك
              </p>
              <p className="text-gray-500 mb-6">
                جرب البحث بكلمات مختلفة أو تصفح الفئات
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.slice(0, 6).map((cat) => (
                  <Link key={cat.id} href={`/category/${cat.slug}`}>
                    <Button variant="outline" size="sm">
                      {cat.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-6 sm:py-8 md:py-12">
          <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ابحث عن منتجات
          </h1>
          <p className="text-gray-600 mb-6">
            أدخل كلمة البحث للعثور على المنتجات التي تحتاجها
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-gray-500">اقتراحات:</span>
            {["سماعات", "هاتف", "ملابس", "آلات", "مجوهرات"].map((term) => (
              <Link key={term} href={`/search?q=${term}`}>
                <Button variant="outline" size="sm">
                  {term}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<div className="container-responsive py-6 sm:py-8 md:py-12 text-center">جاري التحميل...</div>}>
        <SearchContent />
      </Suspense>
      <Footer />
    </div>
  );
}
