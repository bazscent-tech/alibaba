"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { products, categories, searchProducts } from "@/lib/data";
import { Compass, Search as SearchIcon, SlidersHorizontal, Sparkles } from "lucide-react";

function ExploreContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [sortBy, setSortBy] = useState("popular");
  const [categoryId, setCategoryId] = useState("all");

  const results = useMemo(() => {
    const base = query ? searchProducts(query) : products;
    const filtered = categoryId === "all" ? base : base.filter((product) => product.categoryId === categoryId);
    return [...filtered].sort((a, b) => {
      if (sortBy === "price-low") return a.priceMin - b.priceMin;
      if (sortBy === "price-high") return b.priceMin - a.priceMin;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.orders - a.orders;
    });
  }, [categoryId, query, sortBy]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const nextQuery = searchInput.trim();
    window.location.href = nextQuery ? `/search?q=${encodeURIComponent(nextQuery)}` : "/search";
  };

  return (
    <main className="shell explore-page animate-fade-in">
      <div className="explore-hero"><div><span className="eyebrow"><Compass className="h-4 w-4" /> مساحة الاكتشاف</span><h1>كل المنتجات،<br /><em>في مكان واحد.</em></h1><p>استكشف تشكيلة الجملة، قارن، وفرز النتائج بالطريقة التي تناسب نشاطك.</p></div><div className="explore-hero__mark"><Sparkles className="h-7 w-7" /><strong>{products.length}</strong><span>منتجًا متاحًا</span></div></div>
      <form onSubmit={submitSearch} className="explore-search"><SearchIcon className="h-5 w-5" /><input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="ابحث باسم المنتج أو المورد..." aria-label="البحث في المنتجات" /><button type="submit">بحث</button></form>
      <div className="explore-toolbar"><div className="explore-toolbar__title"><SlidersHorizontal className="h-4 w-4" /><div><strong>{query ? `نتائج البحث عن «${query}»` : "تشكيلة مختارة لك"}</strong><span>{results.length} منتج</span></div></div><div className="explore-toolbar__controls"><label><span>القسم</span><select value={categoryId} onChange={(event) => setCategoryId(event.target.value)} aria-label="تصفية حسب القسم"><option value="all">كل الأقسام</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label><label><span>ترتيب حسب</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="ترتيب المنتجات"><option value="popular">الأكثر طلبًا</option><option value="rating">الأعلى تقييمًا</option><option value="price-low">السعر: الأقل</option><option value="price-high">السعر: الأعلى</option></select></label></div></div>
      {results.length ? <div className="product-grid explore-grid">{results.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-panel explore-empty"><SearchIcon className="h-8 w-8" /><strong>لم نجد منتجات مطابقة</strong><span>جرّب كلمة أخرى أو أعد ضبط القسم.</span><Link href="/search">عرض كل المنتجات</Link></div>}
      <div className="home-bottom-space" />
    </main>
  );
}

export default function SearchPage() {
  return <div className="min-h-screen bg-background"><Header /><Suspense fallback={<div className="shell py-8 text-center">جاري تجهيز الاستكشاف...</div>}><ExploreContent /></Suspense></div>;
}
