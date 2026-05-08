import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { getTopRatedProducts, getFeaturedProducts } from "@/lib/data";
import { Star } from "lucide-react";

export default function TopRatedPage() {
  const topRated = getTopRatedProducts();
  const featured = getFeaturedProducts();
  const allProducts = [...new Map([...topRated, ...featured].map(p => [p.id, p])).values()]
    .sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive py-6 sm:py-8">
        <div className="flex items-center gap-2 mb-6">
          <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
          <h1 className="text-xl sm:text-2xl font-bold">الأعلى تقييماً</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
