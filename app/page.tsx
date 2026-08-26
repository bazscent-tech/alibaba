import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpLeft, BarChart3, ChevronLeft, Package, Search, Sparkles, Store, Zap } from "lucide-react";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { categories, getFeaturedProducts, getTopRatedProducts } from "@/lib/data";

const categoryIcons = ["◈", "◌", "✦", "⌂", "♡", "◒", "◎", "◉", "▣", "⌁", "▤", "✧"];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const topRatedProducts = getTopRatedProducts();

  return (
    <div className="home-page-shell">
      <Header />
      <main className="home-page">
      <section className="shell home-hero">
        <div className="home-hero__content">
          <div className="hero-kicker"><span><Sparkles className="h-3.5 w-3.5" /> جديد في شبام</span><span>سوق B2B عربي</span></div>
          <h1>اشترِ بالجملة.<br /><em>بثقة أكبر.</em></h1>
          <p>اكتشف منتجات مميزة من موردين موثوقين، بأسعار مصممة لنمو أعمالك.</p>
          <div className="hero-cta">
            <Link href="/categories" className="hero-cta__primary">ابدأ الاستكشاف <ArrowLeft className="h-4 w-4" /></Link>
            <Link href="/sell" className="hero-cta__secondary">أضف متجرك <Store className="h-4 w-4" /></Link>
          </div>
          <div className="hero-numbers"><div><strong>50K+</strong><span>منتج متاح</span></div><div><strong>4.8/5</strong><span>تقييم المشترين</span></div><div><strong>24/7</strong><span>دعم الأعمال</span></div></div>
        </div>
        <div className="home-hero__visual">
          <Image src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85" alt="منتجات متنوعة للتجارة بالجملة" fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 54vw" />
          <div className="home-hero__overlay" />
          <div className="hero-floating hero-floating--top"><span className="hero-floating__icon"><Zap className="h-4 w-4" /></span><div><strong>عروض ذكية</strong><small>خصومات للمشترين</small></div></div>
          <div className="hero-floating hero-floating--bottom"><span className="hero-floating__avatar">ش</span><div><strong>مصنع النور</strong><small>مورد موثق منذ 12 سنة</small></div><span className="hero-floating__check">✓</span></div>
          <span className="hero-visual-label">DISCOVER<br /><strong>YOUR NEXT<br />BESTSELLER</strong></span>
        </div>
      </section>

      <section className="shell quick-categories" aria-label="تصفح الأقسام">
        <div className="section-heading"><div><p>كل ما يحتاجه نشاطك</p><h2>تصفح حسب القسم</h2></div><Link href="/categories">كل الأقسام <ArrowLeft className="inline h-3.5 w-3.5" /></Link></div>
        <div className="quick-categories__rail hide-scrollbar">
          {categories.map((category, index) => (
            <Link href={`/category/${category.slug}`} className="category-pill" key={category.id}>
              <span className={`category-pill__icon category-pill__icon--${index % 6}`}>{categoryIcons[index]}</span>
              <span>{category.name}</span>
              <small>{category.subcategories.length} فئات</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="shell showcase-grid">
        <Link href="/deals" className="showcase-card showcase-card--orange">
          <span className="showcase-card__eyebrow"><Zap className="h-4 w-4" /> لفترة محدودة</span>
          <h3>اختيارات<br /><strong>تستحق التجربة</strong></h3>
          <p>منتجات رائجة بهامش أفضل لنمو مبيعاتك.</p>
          <span className="showcase-card__link">اكتشف العروض <ArrowLeft className="h-4 w-4" /></span>
          <span className="showcase-card__shape showcase-card__shape--one" /><span className="showcase-card__shape showcase-card__shape--two" />
        </Link>
        <Link href="/suppliers" className="showcase-card showcase-card--navy">
          <span className="showcase-card__eyebrow"><BarChart3 className="h-4 w-4" /> للمشترين الأذكياء</span>
          <h3>اعثر على<br /><strong>شريكك التجاري</strong></h3>
          <p>قارن الموردين واكتشف فرصًا جديدة.</p>
          <span className="showcase-card__link">دليل الموردين <ArrowLeft className="h-4 w-4" /></span>
          <span className="showcase-card__shape showcase-card__shape--three" />
        </Link>
      </section>

      <section className="shell section-padding">
        <div className="section-heading"><div><p>الأكثر طلبًا هذا الأسبوع</p><h2>منتجات تلفت الانتباه</h2></div><Link href="/deals">عرض الكل <ArrowLeft className="inline h-3.5 w-3.5" /></Link></div>
        <div className="product-grid">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>

      <section className="shell seller-banner">
        <div className="seller-banner__copy"><span className="hero-kicker"><Store className="h-4 w-4" /> مساحة للموردين</span><h2>منتجك القادم قد يكون<br /><em>فرصة أحدهم.</em></h2><p>انضم إلى شبكة الموردين واعرض منتجاتك أمام مشترين يبحثون عن الأفضل.</p><Link href="/sell" className="hero-cta__secondary seller-banner__button">ابدأ البيع مجانًا <ArrowLeft className="h-4 w-4" /></Link></div>
        <div className="seller-banner__art"><Image src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1000&q=85" alt="صاحب عمل يدير متجره" fill className="object-cover" sizes="(max-width: 768px) 100vw, 48vw" /><div className="seller-banner__orb" /></div>
      </section>

      <section className="shell section-padding">
        <div className="section-heading"><div><p>اختيار المجتمع</p><h2>الأعلى تقييمًا</h2></div><Link href="/top-rated">شاهد التقييمات <ArrowLeft className="inline h-3.5 w-3.5" /></Link></div>
        <div className="product-grid">{topRatedProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>

      <section className="shell browse-strip">
        <div><span className="browse-strip__icon"><Package className="h-5 w-5" /></span><div><strong>لا تعرف من أين تبدأ؟</strong><p>استخدم البحث الذكي للوصول إلى المنتج المناسب لنشاطك.</p></div></div>
        <Link href="/search" className="browse-strip__button">ابحث الآن <Search className="h-4 w-4" /></Link>
      </section>
      <div className="home-bottom-space" />
      </main>
    </div>
  );
}
