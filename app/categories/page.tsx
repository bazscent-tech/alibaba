"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { categories, getProductsByCategory, getProductsBySubcategory } from "@/lib/data";
import { ArrowLeft, ChevronLeft, SlidersHorizontal, Sparkles } from "lucide-react";

const categoryGlyphs = ["◈", "◌", "✦", "⌂", "♡", "◒", "◎", "◉", "▣", "⌁", "▤", "✧"];

export default function CategoriesPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id || "");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const selectedCategory = categories.find((category) => category.id === selectedCategoryId) || categories[0];

  const visibleProducts = useMemo(() => {
    if (!selectedCategory) return [];
    const products = selectedSubcategory === "all"
      ? getProductsByCategory(selectedCategory.id)
      : getProductsBySubcategory(selectedSubcategory);
    return [...products].sort((a, b) => {
      if (sortBy === "price-low") return a.priceMin - b.priceMin;
      if (sortBy === "price-high") return b.priceMin - a.priceMin;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.orders - a.orders;
    });
  }, [selectedCategory, selectedSubcategory, sortBy]);

  const selectCategory = (id: string) => {
    setSelectedCategoryId(id);
    setSelectedSubcategory("all");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="shell category-explorer-page animate-fade-in">
        <div className="category-page-head">
          <div><span className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> اختَر مساحتك</span><h1>الأقسام</h1><p>تنقّل بين الفئات واكتشف منتجاتها من مكان واحد.</p></div>
          <Link href="/search" className="category-head-link">استكشاف كل المنتجات <ArrowLeft className="h-4 w-4" /></Link>
        </div>
        <div className="category-explorer">
          <aside className="category-sidebar" aria-label="الأقسام الرئيسية">
            <div className="category-sidebar__title"><SlidersHorizontal className="h-4 w-4" /><span>الأقسام</span></div>
            <div className="category-sidebar__list">
              {categories.map((category, index) => (
                <button key={category.id} onClick={() => selectCategory(category.id)} className={`category-side-item ${category.id === selectedCategory?.id ? "is-active" : ""}`}>
                  <span className={`category-side-item__icon category-pill__icon--${index % 6}`}>{categoryGlyphs[index]}</span>
                  <span>{category.name}</span>
                  {category.id === selectedCategory?.id ? <ChevronLeft className="category-side-item__arrow h-4 w-4" /> : null}
                </button>
              ))}
            </div>
          </aside>
          <section className="category-results" aria-live="polite">
            {selectedCategory ? (
              <>
                <div className="category-spotlight">
                  <Image src={selectedCategory.image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 75vw" />
                  <div className="category-spotlight__veil" />
                  <div className="category-spotlight__copy"><span>تشكيلة شبام</span><h2>{selectedCategory.name}</h2><p>{selectedCategory.subcategories.length} مسارات شراء تساعدك في الوصول لما تبحث عنه.</p></div>
                </div>
                <div className="subcategory-row hide-scrollbar">
                  <button onClick={() => setSelectedSubcategory("all")} className={`subcategory-chip ${selectedSubcategory === "all" ? "is-active" : ""}`}>الكل <small>{getProductsByCategory(selectedCategory.id).length}</small></button>
                  {selectedCategory.subcategories.map((sub) => <button key={sub.id} onClick={() => setSelectedSubcategory(sub.id)} className={`subcategory-chip ${selectedSubcategory === sub.id ? "is-active" : ""}`}>{sub.name}</button>)}
                </div>
                <div className="category-results__head"><div><p>منتجات مختارة</p><h2>{selectedSubcategory === "all" ? selectedCategory.name : selectedCategory.subcategories.find((item) => item.id === selectedSubcategory)?.name}</h2><span>{visibleProducts.length} منتج في هذه المجموعة</span></div><label className="sort-control"><span>ترتيب</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="ترتيب المنتجات"><option value="popular">الأكثر طلبًا</option><option value="rating">الأعلى تقييمًا</option><option value="price-low">السعر: الأقل</option><option value="price-high">السعر: الأعلى</option></select></label></div>
                {visibleProducts.length > 0 ? <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-panel">لا توجد منتجات في هذا المسار حتى الآن.</div>}
              </>
            ) : null}
          </section>
        </div>
      </main>
    </div>
  );
}
