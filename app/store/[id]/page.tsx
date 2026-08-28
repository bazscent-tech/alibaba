import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, MessageCircle, Package, MapPin, ArrowRight, Star } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { getProductsBySupplier, getSupplierById, suppliers } from "@/lib/data";

interface StorePageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return suppliers.map((supplier) => ({ id: supplier.id }));
}

export async function generateMetadata({ params }: StorePageProps): Promise<Metadata> {
  const { id } = await params;
  const supplier = getSupplierById(id);
  if (!supplier) return { title: "المورد غير موجود | شبام جملة" };
  return {
    title: `${supplier.name} | شبام جملة`,
    description: `تصفح منتجات ${supplier.name} بالجملة وتواصل مع المورد عبر شبام جملة.`,
    openGraph: {
      title: `${supplier.name} | شبام جملة`,
      description: `تصفح منتجات ${supplier.name} بالجملة.`,
      type: "website",
      locale: "ar_YE",
    },
  };
}

export default async function SupplierStorePage({ params }: StorePageProps) {
  const { id } = await params;
  const supplier = getSupplierById(id);
  if (!supplier) notFound();

  const supplierProducts = getProductsBySupplier(id);
  const averageRating = supplierProducts.length
    ? (supplierProducts.reduce((sum, product) => sum + product.rating, 0) / supplierProducts.length).toFixed(1)
    : "—";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="shell supplier-store-page animate-fade-in">
        <div className="product-breadcrumb"><Link href="/">الرئيسية</Link><ArrowRight className="h-3.5 w-3.5" /><Link href="/suppliers">الموردون</Link><ArrowRight className="h-3.5 w-3.5" /><span>{supplier.name}</span></div>

        <section className="supplier-store-hero">
          <div className="supplier-store-identity">
            <div className="supplier-store-avatar">{supplier.name.slice(0, 1)}</div>
            <div>
              <div className="supplier-store-name"><h1>{supplier.name}</h1>{supplier.verified ? <span className="supplier-store-verified"><CheckCircle className="h-3.5 w-3.5" /> مورد موثق</span> : null}</div>
              <p><MapPin className="h-4 w-4" /> {supplier.country} <i /> مورد على شبام جملة منذ {supplier.yearsInBusiness} سنوات</p>
            </div>
          </div>
          <Link href={`/messages?supplier=${encodeURIComponent(supplier.name)}`} className="supplier-store-contact"><MessageCircle className="h-4 w-4" /> تواصل مع المورد</Link>
        </section>

        <section className="supplier-store-stats" aria-label="معلومات المورد">
          <div><Package className="h-5 w-5" /><span><strong>{supplierProducts.length}</strong><small>منتجات منشورة</small></span></div>
          <div><Star className="h-5 w-5" /><span><strong>{averageRating}</strong><small>متوسط التقييم</small></span></div>
          <div><CheckCircle className="h-5 w-5" /><span><strong>{supplier.responseRate}%</strong><small>معدل الاستجابة</small></span></div>
        </section>

        <section className="supplier-store-catalog">
          <div className="supplier-store-section-head"><div><span>كتالوج المورد</span><h2>منتجات {supplier.name}</h2></div><span>{supplierProducts.length} منتج</span></div>
          {supplierProducts.length ? <div className="product-grid">{supplierProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="supplier-store-empty">لا توجد منتجات منشورة لهذا المورد حاليًا.</div>}
        </section>
      </main>
      <Footer />
    </div>
  );
}
