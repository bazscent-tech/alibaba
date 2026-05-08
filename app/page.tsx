import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSlider } from "@/components/hero-slider";
import { ProductCard } from "@/components/product-card";
import { categories, getFeaturedProducts, getTopRatedProducts } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import {
  Smartphone,
  Cog,
  Shirt,
  Home,
  Heart,
  Car,
  Dumbbell,
  Coffee,
  Building,
  Leaf,
  Package,
  Watch,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const iconMap: { [key: string]: React.ReactNode } = {
  Smartphone: <Smartphone className="h-8 w-8" />,
  Cog: <Cog className="h-8 w-8" />,
  Shirt: <Shirt className="h-8 w-8" />,
  Home: <Home className="h-8 w-8" />,
  Heart: <Heart className="h-8 w-8" />,
  Car: <Car className="h-8 w-8" />,
  Dumbbell: <Dumbbell className="h-8 w-8" />,
  Coffee: <Coffee className="h-8 w-8" />,
  Building: <Building className="h-8 w-8" />,
  Leaf: <Leaf className="h-8 w-8" />,
  Package: <Package className="h-8 w-8" />,
  Watch: <Watch className="h-8 w-8" />,
};

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const topRatedProducts = getTopRatedProducts();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Categories Sidebar */}
            <div className="hidden lg:block">
              <Card className="h-full">
                <CardContent className="p-0">
                  <div className="bg-primary text-white p-4 rounded-t-lg">
                    <h3 className="font-bold">الفئات الرئيسية</h3>
                  </div>
                  <ul className="divide-y">
                    {categories.slice(0, 10).map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/category/${category.slug}`}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-primary">
                            {iconMap[category.icon] || <Package className="h-5 w-5" />}
                          </span>
                          <span className="text-sm text-gray-700">{category.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/categories"
                    className="block text-center text-primary font-medium p-3 hover:bg-gray-50"
                  >
                    عرض جميع الفئات
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Hero Slider */}
            <div className="lg:col-span-3">
              <HeroSlider />
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">تسوق حسب الفئة</h2>
            <Link href="/categories" className="text-primary hover:underline font-medium">
              عرض الكل
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group"
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {iconMap[category.icon] || <Package className="h-8 w-8" />}
                    </div>
                    <p className="text-sm font-medium text-gray-700 line-clamp-2">
                      {category.name}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">المنتجات الأكثر طلباً</h2>
            <Link href="/deals" className="text-primary hover:underline font-medium">
              عرض الكل
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Banner */}
        <section className="container mx-auto px-4 py-8">
          <div className="relative h-48 md:h-64 rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
              alt="عروض خاصة"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-primary/90 to-primary/50" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-8">
                <div className="max-w-xl text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    انضم كمورد الآن
                  </h3>
                  <p className="mb-4 opacity-90">
                    اعرض منتجاتك لملايين المشترين حول العالم واحصل على عملاء جدد
                  </p>
                  <Link href="/sell">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="bg-white text-primary hover:bg-gray-100"
                    >
                      ابدأ البيع مجاناً
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Rated Products */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">الأعلى تقييماً</h2>
            <Link href="/top-rated" className="text-primary hover:underline font-medium">
              عرض الكل
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {topRatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              لماذا تختار علي ماركت؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="h-12 w-12 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  موردون موثوقون
                </h3>
                <p className="text-gray-600">
                  نتحقق من جميع الموردين لضمان جودة المنتجات والخدمات
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="h-12 w-12 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  أسعار تنافسية
                </h3>
                <p className="text-gray-600">
                  احصل على أفضل أسعار الجملة مباشرة من المصنعين
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="h-12 w-12 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  شحن عالمي
                </h3>
                <p className="text-gray-600">
                  نوصل طلباتك إلى أي مكان في العالم بأمان وسرعة
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
