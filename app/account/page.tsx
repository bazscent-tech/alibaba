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
import { createNetworkStore } from "@/lib/network-store";
import { showToast } from "@/components/toast-notification";
import { User, Package, Heart, Settings, LogOut, ShoppingCart, Bell, MapPin, MessageCircle, Store, CheckCircle2 } from "lucide-react";

type AccountTab = "profile" | "orders" | "messages" | "wishlist" | "addresses" | "notifications" | "settings" | "seller";

export default function AccountPage() {
  const router = useRouter();
  const { isLoggedIn, user, userType, logout, becomeSeller } = useUserStore();
  const cartItems = useCartStore((state) => state.getTotalItems());
  const [activeTab, setActiveTab] = useState<AccountTab>("profile");
  const [sellerForm, setSellerForm] = useState({ company: "", phone: user?.phone || "", city: "" });
  const [sellerSubmitted, setSellerSubmitted] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Header />
        <main className="container-responsive animate-fade-in py-16 text-center">
          <User className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold mb-2">سجّل الدخول إلى حسابك</h1>
          <p className="text-gray-600 mb-6">حساب واحد يكفي للشراء ومراسلة التجار وتسجيل متجرك لاحقًا.</p>
          <div className="flex gap-3 justify-center"><Link href="/login"><Button>تسجيل الدخول</Button></Link><Link href="/register"><Button variant="outline">إنشاء حساب</Button></Link></div>
        </main>
        <Footer />
      </div>
    );
  }

  const tabs: { id: AccountTab; icon: typeof User; label: string }[] = [
    { id: "profile", icon: User, label: "بياناتي" },
    { id: "orders", icon: Package, label: "طلباتي" },
    { id: "messages", icon: MessageCircle, label: "مراسلاتي" },
    { id: "wishlist", icon: Heart, label: "المفضلة" },
    { id: "addresses", icon: MapPin, label: "العناوين" },
    { id: "notifications", icon: Bell, label: "الإشعارات" },
    { id: "settings", icon: Settings, label: "الإعدادات" },
  ];

  const handleSellerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!sellerForm.company.trim() || !sellerForm.phone.trim() || !sellerForm.city.trim()) {
      showToast("error", "أكمل اسم المتجر والهاتف والمدينة أولًا");
      return;
    }
    createNetworkStore({ name: sellerForm.company.trim(), owner: user?.name || "تاجر شبام", email: user?.email || "", phone: sellerForm.phone.trim(), city: sellerForm.city.trim(), category: "متجر متنوع" });
    becomeSeller(sellerForm.company.trim(), sellerForm.phone.trim());
    setSellerSubmitted(true);
    showToast("success", "تم إرسال طلب تسجيل متجرك للمراجعة");
  };

  const logoutAndLeave = () => { logout(); router.push("/"); };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive animate-fade-in py-6 sm:py-8">
        <div className="mb-6"><p className="text-sm text-primary font-semibold mb-1">مساحتك في شبام</p><h1 className="text-xl sm:text-2xl font-bold">حسابي</h1><p className="text-sm text-muted-foreground mt-1">إدارة الشراء، المراسلات، وبيانات متجرك من مكان واحد.</p></div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1 space-y-4">
            <Card><CardContent className="p-4"><div className="text-center mb-4 pb-4 border-b"><div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2"><User className="h-8 w-8 text-primary" /></div><p className="font-semibold">{user?.name}</p><p className="text-sm text-gray-500 break-all">{user?.email}</p><span className="inline-flex items-center gap-1 mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{userType === "seller" ? <><Store className="h-3 w-3" /> تاجر وحساب موحّد</> : "حساب موحّد"}</span></div><nav className="space-y-1" aria-label="أقسام الحساب">{tabs.map((tab) => <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${activeTab === tab.id ? "bg-primary/10 text-primary font-medium" : "text-gray-600 hover:bg-gray-50"}`}><tab.icon className="h-4 w-4" />{tab.label}</button>)}{userType !== "seller" && <button type="button" onClick={() => { setActiveTab("seller"); setSellerSubmitted(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${activeTab === "seller" ? "bg-primary/10 text-primary font-medium" : "text-primary hover:bg-primary/5"}`}><Store className="h-4 w-4" />تسجيل كتاجر</button>}<button type="button" onClick={logoutAndLeave} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"><LogOut className="h-4 w-4" />تسجيل الخروج</button></nav></CardContent></Card>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3"><Link href="/cart"><Card className="hover:shadow-md transition-shadow"><CardContent className="p-3 flex items-center gap-3"><ShoppingCart className="h-5 w-5 text-primary" /><div><p className="text-xs text-gray-500">سلة التسوق</p><p className="font-semibold text-sm">{cartItems} وحدة</p></div></CardContent></Card></Link><Link href="/orders"><Card className="hover:shadow-md transition-shadow"><CardContent className="p-3 flex items-center gap-3"><Package className="h-5 w-5 text-primary" /><div><p className="text-xs text-gray-500">المتابعة</p><p className="font-semibold text-sm">طلباتي</p></div></CardContent></Card></Link></div>
          </aside>

          <section className="lg:col-span-3"><Card><CardContent className="p-6">
            {activeTab === "profile" && <div><h2 className="text-lg font-bold mb-1">البيانات الشخصية</h2><p className="text-sm text-muted-foreground mb-5">هذه البيانات مرتبطة بحسابك وتستخدم في الشراء والتواصل.</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><Label>الاسم</Label><Input defaultValue={user?.name} className="mt-1" /></div><div><Label>البريد الإلكتروني</Label><Input defaultValue={user?.email} className="mt-1" readOnly /></div><div><Label>رقم الهاتف</Label><Input defaultValue={user?.phone || ""} placeholder="أضف رقم هاتف" className="mt-1" /></div><div><Label>الشركة</Label><Input defaultValue={user?.companyName || ""} placeholder="اختياري حتى تسجل كتاجر" className="mt-1" /></div></div><Button className="mt-5" onClick={() => showToast("success", "تم حفظ بيانات الحساب")}>حفظ التغييرات</Button></div>}
            {activeTab === "orders" && <div className="text-center py-8"><Package className="h-12 w-12 mx-auto text-gray-300 mb-3" /><p className="text-gray-500 mb-3">تابع طلباتك وحالات الشحن من صفحة الطلبات.</p><Link href="/orders"><Button>فتح طلباتي</Button></Link></div>}
            {activeTab === "messages" && <div className="text-center py-8"><MessageCircle className="h-12 w-12 mx-auto text-primary/60 mb-3" /><h2 className="font-bold mb-2">مراسلة التجار</h2><p className="text-gray-500 mb-4">ابدأ محادثة من صفحة أي منتج أو افتح مركز المراسلات.</p><Link href="/messages"><Button>فتح المراسلات</Button></Link></div>}
            {activeTab === "wishlist" && <div className="text-center py-8"><Heart className="h-12 w-12 mx-auto text-gray-300 mb-3" /><p className="text-gray-500 mb-3">أضف منتجاتك المفضلة لتعود إليها لاحقًا.</p><Link href="/wishlist"><Button>فتح المفضلة</Button></Link></div>}
            {activeTab === "addresses" && <div><h2 className="text-lg font-bold mb-4">عناويني</h2><div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center"><MapPin className="h-8 w-8 mx-auto text-gray-300 mb-2" /><p className="text-gray-500 text-sm mb-3">أضف العنوان عند إتمام أول طلب.</p><Link href="/help"><Button variant="outline" size="sm">تعرف على الشحن</Button></Link></div></div>}
            {activeTab === "notifications" && <div><h2 className="text-lg font-bold mb-4">الإشعارات</h2><div className="rounded-lg border bg-primary/5 border-primary/20 p-4"><p className="font-medium text-sm">مرحبًا بك في شبام جملة</p><p className="text-xs text-gray-500 mt-1">يمكنك الآن الشراء ومراسلة التجار من حسابك.</p></div></div>}
            {activeTab === "settings" && <div><h2 className="text-lg font-bold mb-4">الإعدادات</h2><div className="space-y-3"><div className="flex items-center justify-between p-3 border rounded-lg"><div><p className="font-medium text-sm">اللغة</p><p className="text-xs text-gray-500">العربية</p></div><span className="text-xs text-primary">مفعّلة</span></div><div className="flex items-center justify-between p-3 border rounded-lg"><div><p className="font-medium text-sm">الشراء والتواصل</p><p className="text-xs text-gray-500">مسموحان لكل حساب</p></div><CheckCircle2 className="h-5 w-5 text-emerald-500" /></div></div></div>}
            {activeTab === "seller" && <div>{sellerSubmitted || userType === "seller" ? <div className="text-center py-8"><CheckCircle2 className="h-14 w-14 mx-auto text-emerald-500 mb-4" /><h2 className="text-xl font-bold mb-2">تم تسجيل متجرك</h2><p className="text-muted-foreground mb-5">سيتم مراجعة بيانات المتجر، ويمكنك متابعة حالته من شبكة التجار.</p><Link href="/account"><Button variant="outline">العودة إلى الحساب</Button></Link></div> : <form onSubmit={handleSellerSubmit} className="space-y-4"><div><h2 className="text-lg font-bold">تسجيل كتاجر</h2><p className="text-sm text-muted-foreground mt-1 mb-5">حوّل حسابك الحالي إلى حساب يشتري ويتواصل ويبيع من نفس الهوية.</p></div><div><Label htmlFor="seller-company">اسم المتجر أو الشركة</Label><Input id="seller-company" value={sellerForm.company} onChange={(event) => setSellerForm({ ...sellerForm, company: event.target.value })} placeholder="مثال: متجر صنعاء للإلكترونيات" required /></div><div><Label htmlFor="seller-phone">رقم التواصل</Label><Input id="seller-phone" type="tel" value={sellerForm.phone} onChange={(event) => setSellerForm({ ...sellerForm, phone: event.target.value })} placeholder="+967 7x xxx xxxx" required /></div><div><Label htmlFor="seller-city">المدينة</Label><Input id="seller-city" value={sellerForm.city} onChange={(event) => setSellerForm({ ...sellerForm, city: event.target.value })} placeholder="صنعاء" required /></div><Button type="submit" className="w-full sm:w-auto">إرسال طلب تسجيل التاجر</Button></form>}</div>}
          </CardContent></Card></section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
