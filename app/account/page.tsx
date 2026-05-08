"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore, useCartStore } from "@/lib/store";
import { User, Package, Heart, Settings, LogOut, ShoppingCart, Bell, MapPin } from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const { isLoggedIn, user, userType, logout } = useUserStore();
  const cartItems = useCartStore((s) => s.getTotalItems());
  const [activeTab, setActiveTab] = useState("profile");

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Header />
        <main className="container-responsive py-16 text-center">
          <User className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold mb-2">يجب تسجيل الدخول</h1>
          <p className="text-gray-600 mb-6">سجّل دخولك للوصول إلى حسابك</p>
          <div className="flex gap-3 justify-center">
            <Link href="/login"><Button>تسجيل الدخول</Button></Link>
            <Link href="/register"><Button variant="outline">إنشاء حساب</Button></Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">حسابي</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <div className="text-center mb-4 pb-4 border-b">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                  <span className="inline-block mt-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                    {userType === "seller" ? "بائع" : "مشتري"}
                  </span>
                </div>

                <nav className="space-y-1">
                  {[
                    { id: "profile", icon: User, label: "بياناتي" },
                    { id: "orders", icon: Package, label: "طلباتي" },
                    { id: "wishlist", icon: Heart, label: "المفضلة" },
                    { id: "addresses", icon: MapPin, label: "العناوين" },
                    { id: "notifications", icon: Bell, label: "الإشعارات" },
                    { id: "settings", icon: Settings, label: "الإعدادات" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  ))}

                  <button
                    onClick={() => { logout(); router.push("/"); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    تسجيل الخروج
                  </button>
                </nav>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 mt-4">
              <Link href="/cart">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 flex items-center gap-3">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-gray-500">سلة التسوق</p>
                      <p className="font-semibold text-sm">{cartItems} منتج</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/orders">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 flex items-center gap-3">
                    <Package className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-gray-500">طلباتي</p>
                      <p className="font-semibold text-sm">0 طلب</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                {activeTab === "profile" && (
                  <div>
                    <h2 className="text-lg font-bold mb-4">البيانات الشخصية</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>الاسم</Label>
                        <Input defaultValue={user?.name} className="mt-1" />
                      </div>
                      <div>
                        <Label>البريد الإلكتروني</Label>
                        <Input defaultValue={user?.email} className="mt-1" />
                      </div>
                      <div>
                        <Label>رقم الهاتف</Label>
                        <Input defaultValue={user?.phone || ""} placeholder="أضف رقم هاتف" className="mt-1" />
                      </div>
                      <div>
                        <Label>الشركة</Label>
                        <Input defaultValue={user?.companyName || ""} placeholder="أضف اسم الشركة" className="mt-1" />
                      </div>
                    </div>
                    <Button className="mt-4">حفظ التغييرات</Button>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500 mb-3">لا توجد طلبات بعد</p>
                    <Link href="/deals"><Button>تصفح العروض</Button></Link>
                  </div>
                )}

                {activeTab === "wishlist" && (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500 mb-3">قائمة المفضلة فارغة</p>
                    <Link href="/"><Button>تصفح المنتجات</Button></Link>
                  </div>
                )}

                {activeTab === "addresses" && (
                  <div>
                    <h2 className="text-lg font-bold mb-4">عناويني</h2>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                      <MapPin className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                      <p className="text-gray-500 text-sm mb-3">لم تضف أي عنوان بعد</p>
                      <Button variant="outline" size="sm">إضافة عنوان</Button>
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div>
                    <h2 className="text-lg font-bold mb-4">الإشعارات</h2>
                    <div className="space-y-3">
                      {[
                        { title: "مرحباً بك في شبام جملة", desc: "تم إنشاء حسابك بنجاح", time: "الآن", unread: true },
                        { title: "عروض حصرية", desc: "خصومات تصل إلى 50% على الإلكترونيات", time: "منذ ساعة", unread: false },
                      ].map((notif, i) => (
                        <div key={i} className={`p-3 rounded-lg border ${notif.unread ? "bg-primary/5 border-primary/20" : "bg-white"}`}>
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-sm">{notif.title}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{notif.desc}</p>
                            </div>
                            <span className="text-xs text-gray-400">{notif.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div>
                    <h2 className="text-lg font-bold mb-4">الإعدادات</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">اللغة</p>
                          <p className="text-xs text-gray-500">العربية</p>
                        </div>
                        <Button variant="outline" size="sm">تغيير</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">العملة</p>
                          <p className="text-xs text-gray-500">USD $</p>
                        </div>
                        <Button variant="outline" size="sm">تغيير</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">إشعارات البريد</p>
                          <p className="text-xs text-gray-500">مفعّلة</p>
                        </div>
                        <Button variant="outline" size="sm">تعطيل</Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
