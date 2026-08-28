"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/lib/store";
import { hydrateNetworkState, readNetworkState, type NetworkState } from "@/lib/network-store";
import { BarChart3, Package, ShoppingCart, Store, ArrowLeft, RefreshCw, Clock3, CheckCircle2, AlertCircle } from "lucide-react";

const statusLabels = { new: "جديد", processing: "قيد التجهيز", shipped: "تم الشحن", completed: "مكتمل" } as const;

export default function MerchantPage() {
  const { isLoggedIn, user, userType } = useUserStore();
  const [network, setNetwork] = useState<NetworkState>(() => readNetworkState());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    hydrateNetworkState().then((state) => { if (mounted) { setNetwork(state); setReady(true); } });
    return () => { mounted = false; };
  }, []);

  const store = useMemo(() => network.stores.find((item) => item.email.toLowerCase() === (user?.email || "").toLowerCase() || item.name === user?.companyName), [network.stores, user?.companyName, user?.email]);
  const products = useMemo(() => store ? network.products.filter((item) => item.storeId === store.id) : [], [network.products, store]);
  const orders = useMemo(() => store ? network.orders.filter((item) => item.storeId === store.id) : [], [network.orders, store]);
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);

  if (!isLoggedIn) return <Gate title="سجّل الدخول إلى لوحة التاجر" text="استخدم حسابك الموحد لإدارة متجرك ومتابعة الطلبات." />;
  if (userType !== "seller") return <Gate title="سجّل متجرك أولًا" text="تسجيل التاجر متاح من داخل الحساب، وبعد إرسال الطلب ستظهر لوحة متجرك هنا." action="فتح الحساب" href="/account" />;
  if (!ready) return <div className="min-h-screen bg-muted/30"><Header /><main className="container-responsive merchant-loading"><RefreshCw className="h-7 w-7 animate-spin text-primary" /><p>جاري تحميل بيانات المتجر...</p></main><Footer /></div>;

  return <div className="min-h-screen bg-muted/30"><Header /><main className="container-responsive merchant-page"><div className="merchant-heading"><div><p className="eyebrow">مساحة التاجر</p><h1>لوحة متجرك</h1><p>تابع المنتجات والطلبات وأداء متجرك من مكان واحد.</p></div><div className="merchant-heading__actions"><Button variant="outline" size="sm" onClick={() => hydrateNetworkState().then(setNetwork)} className="gap-2"><RefreshCw className="h-4 w-4" /> تحديث</Button><Link href="/account" className="merchant-account-link">الحساب <ArrowLeft className="h-4 w-4" /></Link></div></div>{store ? <><section className="merchant-store-card surface"><div className="merchant-store-card__identity"><span className="merchant-store-card__icon"><Store /></span><div><h2>{store.name}</h2><p>{store.city} · {store.email}</p></div></div><span className={`merchant-status merchant-status--${store.status}`}>{store.status === "approved" ? <CheckCircle2 /> : <Clock3 />}{store.status === "approved" ? "متجر معتمد" : "بانتظار المراجعة"}</span></section><section className="merchant-stats"><Stat icon={<Package />} label="المنتجات" value={products.length} note="في الكتالوج" /><Stat icon={<ShoppingCart />} label="الطلبات" value={orders.length} note="مرتبطة بمتجرك" /><Stat icon={<BarChart3 />} label="قيمة الطلبات" value={`$${revenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`} note="إجمالي الشبكة" /></section><div className="merchant-content-grid"><section className="surface merchant-panel"><div className="merchant-panel__head"><div><p className="eyebrow">كتالوجك</p><h2>منتجات المتجر</h2></div><span>{products.length} منتج</span></div>{products.length ? <div className="merchant-list">{products.map((product) => <div key={product.id} className="merchant-list__row"><div><strong>{product.name}</strong><small>{product.category} · مخزون {product.stock}</small></div><div className="merchant-list__meta"><b>${product.price.toFixed(2)}</b><span className={`merchant-product-status merchant-product-status--${product.status}`}>{product.status === "active" ? "نشط" : product.status === "review" ? "قيد المراجعة" : "مخفي"}</span></div></div>)}</div> : <Empty icon={<Package />} text="لا توجد منتجات مرتبطة بمتجرك بعد." />}</section><section className="surface merchant-panel"><div className="merchant-panel__head"><div><p className="eyebrow">المبيعات</p><h2>آخر الطلبات</h2></div><Link href="/orders">كل الطلبات <ArrowLeft className="h-3.5 w-3.5" /></Link></div>{orders.length ? <div className="merchant-list">{orders.slice(0, 6).map((order) => <div key={order.id} className="merchant-list__row"><div><strong>#{order.id}</strong><small>{order.buyer} · {order.items} وحدة</small></div><div className="merchant-list__meta"><b>${order.total.toFixed(2)}</b><span className="merchant-order-status">{statusLabels[order.status]}</span></div></div>)}</div> : <Empty icon={<ShoppingCart />} text="ستظهر طلبات العملاء هنا بعد إتمام الشراء." />}</section></div></> : <div className="surface merchant-missing"><AlertCircle className="h-8 w-8" /><h2>طلب متجرك قيد المراجعة</h2><p>لم نربط متجرًا معتمدًا بهذا الحساب حتى الآن. راجع بيانات الحساب أو انتظر اعتماد الطلب.</p><Link href="/account" className="hero-cta__primary">العودة إلى الحساب <ArrowLeft className="h-4 w-4" /></Link></div>}</main><Footer /></div>;
}

function Stat({ icon, label, value, note }: { icon: React.ReactNode; label: string; value: string | number; note: string }) { return <div className="surface merchant-stat"><span>{icon}</span><div><small>{label}</small><strong>{value}</strong><p>{note}</p></div></div>; }
function Empty({ icon, text }: { icon: React.ReactNode; text: string }) { return <div className="merchant-empty">{icon}<p>{text}</p></div>; }
function Gate({ title, text, action = "تسجيل الدخول", href = "/login" }: { title: string; text: string; action?: string; href?: string }) { return <div className="min-h-screen bg-muted/30"><Header /><main className="container-responsive messages-gate"><div className="surface messages-gate__card"><span className="messages-gate__icon"><Store /></span><p className="eyebrow">مساحة التاجر</p><h1>{title}</h1><p>{text}</p><Link href={href} className="hero-cta__primary">{action} <ArrowLeft className="h-4 w-4" /></Link></div></main><Footer /></div>; }
