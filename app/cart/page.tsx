"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore, useUserStore } from "@/lib/store";
import { createNetworkOrder } from "@/lib/network-store";
import { getSupplierById } from "@/lib/data";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/toast-notification";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeft,
  Package,
  Truck,
  Shield,
  CreditCard,
} from "lucide-react";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const user = useUserStore((state) => state.user);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");

  
  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === "SHIBAM10") {
      setCouponApplied(true);
      setDiscount(Math.min(getTotalPrice() * 0.1, 100));
      showToast("success", "تم تطبيق خصم 10% على طلبك");
      return;
    }
    setCouponApplied(false);
    setDiscount(0);
    showToast("error", "كود الخصم غير صالح أو منتهي");
  };

  const handleCheckout = async () => {
    if (!items.length) return;
    setIsCheckingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const subtotalNow = getTotalPrice();
    const shippingNow = subtotalNow > 500 ? 0 : 25;
    const storeBySupplier: Record<string, string> = { "sup-1": "store-aden", "sup-2": "store-sanaa", "sup-3": "store-aden", "sup-4": "store-taiz" };
    const order = createNetworkOrder({
      buyer: user?.name || "مشتري تجريبي - صنعاء",
      storeId: storeBySupplier[items[0].product.supplierId] || "store-sanaa",
      items: items.reduce((sum, item) => sum + item.quantity, 0),
      total: Math.max(0, subtotalNow + shippingNow - discount),
    });
    setPlacedOrderId(order.id);
    setOrderPlaced(true);
    clearCart();
    setIsCheckingOut(false);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Header />
        <main className="container-responsive py-16 text-center animate-fade-in">
          <div className="max-w-md mx-auto">
            <div className="bg-green-50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <svg className="h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">تم الطلب بنجاح!</h1>
            <p className="text-gray-600 mb-2">تم تسجيل طلبك داخل الشبكة بنجاح.</p>
            <p className="text-sm text-primary mb-6">رقم الطلب: {placedOrderId}</p>
            <div className="flex gap-3 justify-center">
              <Link href="/orders"><Button>متابعة الطلب</Button></Link>
              <Link href="/"><Button variant="outline">العودة للتسوق</Button></Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const shipping = subtotal > 500 ? 0 : 25;
  const total = Math.max(0, subtotal + shipping - discount);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Header />
        <main className="container-responsive animate-fade-in py-4 sm:py-6 md:py-8 sm:py-12 md:py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <ShoppingCart className="w-16 h-16 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">سلة التسوق فارغة</h1>
            <p className="text-muted-foreground mb-8">
              لم تقم بإضافة أي منتجات إلى سلة التسوق بعد. تصفح منتجاتنا واختر ما
              يناسب احتياجاتك.
            </p>
            <Link href="/">
              <Button size="lg" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                تصفح المنتجات
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <main className="container-responsive animate-fade-in py-4 sm:py-6 md:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-muted-foreground hover:text-primary">
            الرئيسية
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">سلة التسوق</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8">
          سلة التسوق ({items.length} منتج)
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const supplier = getSupplierById(item.product.supplierId);
              return (
              <Card key={item.product.id} className="p-4">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-medium hover:text-primary line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          المورد: {supplier?.name || "غير محدد"}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-destructive p-1"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              Math.max(item.product.moq, item.quantity - 10)
                            )
                          }
                          className="w-8 h-8 rounded-md border flex items-center justify-center hover:bg-muted"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.product.id,
                              Math.max(
                                item.product.moq,
                                parseInt(e.target.value) || item.product.moq
                              )
                            )
                          }
                          className="w-20 text-center"
                          min={item.product.moq}
                        />
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 10)
                          }
                          className="w-8 h-8 rounded-md border flex items-center justify-center hover:bg-muted"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <span className="text-sm text-muted-foreground">
                          (الحد الأدنى: {item.product.moq})
                        </span>
                      </div>

                      <div className="text-left">
                        <p className="font-bold text-lg text-primary">
                          ${(item.product.priceMin * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${item.product.priceMin.toFixed(2)} / {item.product.unit}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              );
            })}

            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" onClick={clearCart} className="gap-2">
                <Trash2 className="w-4 h-4" />
                إفراغ السلة
              </Button>
              <Link href="/">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  متابعة التسوق
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    المجموع الفرعي ({items.length} منتج)
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الشحن</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">مجاني</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>خصم SHIBAM10</span>
                    <span>−${discount.toFixed(2)}</span>
                  </div>
                )}
                {subtotal < 500 && (
                  <p className="text-xs text-muted-foreground bg-muted p-2 rounded">
                    أضف ${(500 - subtotal).toFixed(2)} للحصول على شحن مجاني
                  </p>
                )}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>الإجمالي</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="كود الخصم"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleApplyCoupon} disabled={!couponCode.trim()}>تطبيق</Button>
                </div>

                <Button className="w-full press-effect" size="lg" onClick={handleCheckout} disabled={isCheckingOut}>
                  <CreditCard className="w-4 h-4 ml-2" />
                  إتمام الطلب
                </Button>
              </div>
            </Card>

            {/* Trust Badges */}
            <Card className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">ضمان حماية المشتري</p>
                    <p className="text-xs text-muted-foreground">
                      استرداد كامل المبلغ
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">شحن سريع وآمن</p>
                    <p className="text-xs text-muted-foreground">
                      تتبع الشحنة مباشرة
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Package className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">جودة مضمونة</p>
                    <p className="text-xs text-muted-foreground">
                      فحص جميع المنتجات
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
