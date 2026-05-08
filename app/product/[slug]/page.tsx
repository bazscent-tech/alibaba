"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import {
  getProductBySlug,
  getSupplierById,
  getCategoryBySlug,
  getProductsByCategory,
  categories,
} from "@/lib/data";
import { useCartStore } from "@/lib/store";
import {
  ChevronLeft,
  Star,
  Shield,
  Truck,
  MessageCircle,
  Heart,
  Share2,
  CheckCircle,
  Clock,
  MapPin,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(product?.moq || 1);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-responsive animate-fade-in py-3 sm:py-4 md:py-6 sm:py-8 md:py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            المنتج غير موجود
          </h1>
          <p className="text-gray-600 mb-6">
            عذراً، لم نتمكن من العثور على المنتج المطلوب.
          </p>
          <Link href="/">
            <Link href="/"><Button>العودة للرئيسية</Button></Link>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const supplier = getSupplierById(product.supplierId);
  const category = categories.find((c) => c.id === product.categoryId);
  const subcategory = category?.subcategories.find(
    (s) => s.id === product.subcategoryId
  );
  const relatedProducts = category
    ? getProductsByCategory(category.id)
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
    : [];

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + product.moq);
  };

  const decrementQuantity = () => {
    if (quantity > product.moq) {
      setQuantity((prev) => prev - product.moq);
    }
  };

  // Pricing tiers for B2B
  const pricingTiers = [
    { min: product.moq, max: product.moq * 5, price: product.priceMax },
    {
      min: product.moq * 5 + 1,
      max: product.moq * 20,
      price: (product.priceMax + product.priceMin) / 2,
    },
    { min: product.moq * 20 + 1, max: null, price: product.priceMin },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-responsive animate-fade-in py-3 sm:py-4 md:py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6 flex-wrap">
          <Link href="/" className="hover:text-primary">
            الرئيسية
          </Link>
          <ChevronLeft className="h-4 w-4" />
          {category && (
            <>
              <Link
                href={`/category/${category.slug}`}
                className="hover:text-primary"
              >
                {category.name}
              </Link>
              <ChevronLeft className="h-4 w-4" />
            </>
          )}
          {subcategory && (
            <>
              <Link
                href={`/category/${category?.slug}/${subcategory.slug}`}
                className="hover:text-primary"
              >
                {subcategory.name}
              </Link>
              <ChevronLeft className="h-4 w-4" />
            </>
          )}
          <span className="text-gray-900 font-medium line-clamp-1">
            {product.name}
          </span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div>
            <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
              <Image
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.freeShipping && (
                <Badge className="absolute top-4 right-4 bg-green-500">
                  شحن مجاني
                </Badge>
              )}
              {product.readyToShip && (
                <Badge className="absolute top-4 left-4 bg-blue-500">
                  جاهز للشحن
                </Badge>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
                <span className="text-gray-600 mr-1">({product.rating})</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">
                {product.orders.toLocaleString("ar-SA")} طلب
              </span>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-primary">
                  ${product.priceMin.toFixed(2)}
                </span>
                <span className="text-xl text-gray-500">-</span>
                <span className="text-3xl font-bold text-primary">
                  ${product.priceMax.toFixed(2)}
                </span>
                <span className="text-gray-600">/ {product.unit}</span>
              </div>

              {/* Pricing Tiers */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  أسعار الجملة:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {pricingTiers.map((tier, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-3 text-center border"
                    >
                      <p className="text-xs text-gray-500">
                        {tier.max
                          ? `${tier.min}-${tier.max} ${product.unit}`
                          : `${tier.min}+ ${product.unit}`}
                      </p>
                      <p className="font-bold text-primary">
                        ${tier.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MOQ & Quantity */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">
                الحد الأدنى للطلب: {product.moq} {product.unit}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-gray-700">الكمية:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    className="p-2 hover:bg-gray-100"
                    disabled={quantity <= product.moq}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-gray-600">{product.unit}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Button
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 ml-2" />
                إضافة للسلة
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline" className="flex-1">
                    <MessageCircle className="h-5 w-5 ml-2" />
                    تواصل مع المورد
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>التواصل مع المورد</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-gray-600 mb-4">
                      يمكنك التواصل مع المورد مباشرة للاستفسار عن المنتج أو طلب
                      عرض سعر خاص.
                    </p>
                    {supplier && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="font-semibold">{supplier.name}</p>
                        <p className="text-sm text-gray-600">
                          {supplier.country}
                        </p>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-4 text-gray-600">
              <button className="flex items-center gap-1 hover:text-primary">
                <Heart className="h-5 w-5" />
                <span className="text-sm">حفظ</span>
              </button>
              <button className="flex items-center gap-1 hover:text-primary">
                <Share2 className="h-5 w-5" />
                <span className="text-sm">مشاركة</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">ضمان التجارة</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm">شحن في الوقت المحدد</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm">فحص الجودة</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm">المنشأ: {product.origin}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Supplier Info */}
        {supplier && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 rounded-full p-4">
                    <span className="text-2xl font-bold text-primary">
                      {supplier.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      {supplier.name}
                      {supplier.verified && (
                        <CheckCircle className="h-5 w-5 text-blue-500" />
                      )}
                    </h3>
                    <p className="text-gray-600">{supplier.country}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="text-center">
                    <p className="font-bold text-xl text-primary">
                      {supplier.yearsInBusiness}
                    </p>
                    <p className="text-sm text-gray-600">سنوات الخبرة</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-xl text-primary">
                      {supplier.responseRate}%
                    </p>
                    <p className="text-sm text-gray-600">معدل الاستجابة</p>
                  </div>
                  <Button variant="outline">زيارة المتجر</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              وصف المنتج
            </TabsTrigger>
            <TabsTrigger
              value="specs"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              المواصفات
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              الشحن والتوصيل
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
              <h4 className="font-semibold mt-4">المميزات الرئيسية:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>جودة عالية ومضمونة</li>
                <li>متوافق مع المعايير الدولية</li>
                <li>دعم فني متوفر على مدار الساعة</li>
                <li>ضمان استرجاع لمدة 30 يوم</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specs" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">بلد المنشأ</span>
                <span className="font-medium">{product.origin}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">الحد الأدنى للطلب</span>
                <span className="font-medium">
                  {product.moq} {product.unit}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">التقييم</span>
                <span className="font-medium">{product.rating} / 5</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">عدد الطلبات</span>
                <span className="font-medium">
                  {product.orders.toLocaleString("ar-SA")}
                </span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Truck className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-semibold">الشحن الدولي</h4>
                  <p className="text-gray-600">
                    نوفر الشحن إلى جميع دول العالم. تعتمد تكلفة الشحن على الوجهة
                    وحجم الطلب.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Clock className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-semibold">مدة التوصيل</h4>
                  <p className="text-gray-600">
                    7-15 يوم عمل للشحن الجوي، 25-45 يوم للشحن البحري
                  </p>
                </div>
              </div>
              {product.freeShipping && (
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-700">شحن مجاني</h4>
                    <p className="text-green-600">
                      هذا المنتج مؤهل للشحن المجاني
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              منتجات مشابهة
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
