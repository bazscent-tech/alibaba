"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NETWORK_EVENT, readNetworkState, type NetworkOrder } from "@/lib/network-store";
import { Package, Truck, CheckCircle, Clock, ArrowLeft, RefreshCw } from "lucide-react";

type OrderTab = "الكل" | "جديدة" | "قيد التنفيذ" | "تم الشحن" | "مكتملة";

const statusMeta: Record<NetworkOrder["status"], { label: string; color: string; icon: typeof Clock }> = {
  new: { label: "جديد", color: "text-amber-700 bg-amber-50 border-amber-100", icon: Clock },
  processing: { label: "قيد التنفيذ", color: "text-indigo-700 bg-indigo-50 border-indigo-100", icon: Package },
  shipped: { label: "تم الشحن", color: "text-sky-700 bg-sky-50 border-sky-100", icon: Truck },
  completed: { label: "مكتمل", color: "text-emerald-700 bg-emerald-50 border-emerald-100", icon: CheckCircle },
};

const tabStatus: Record<Exclude<OrderTab, "الكل">, NetworkOrder["status"]> = {
  "جديدة": "new",
  "قيد التنفيذ": "processing",
  "تم الشحن": "shipped",
  "مكتملة": "completed",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<NetworkOrder[]>([]);
  const [activeTab, setActiveTab] = useState<OrderTab>("الكل");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshOrders = () => {
    setIsRefreshing(true);
    setOrders(readNetworkState().orders);
    window.setTimeout(() => setIsRefreshing(false), 220);
  };

  useEffect(() => {
    refreshOrders();
    window.addEventListener(NETWORK_EVENT, refreshOrders);
    return () => window.removeEventListener(NETWORK_EVENT, refreshOrders);
  }, []);

  const visibleOrders = useMemo(() => {
    if (activeTab === "الكل") return orders;
    return orders.filter((order) => order.status === tabStatus[activeTab]);
  }, [activeTab, orders]);

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive animate-fade-in py-6 sm:py-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-sm text-primary font-semibold mb-1">مركز المتابعة</p>
            <h1 className="text-xl sm:text-2xl font-bold">طلباتي</h1>
            <p className="text-sm text-muted-foreground mt-1">تابع حالة كل طلب من التسجيل حتى التسليم.</p>
          </div>
          <Button variant="outline" size="sm" onClick={refreshOrders} disabled={isRefreshing} className="gap-2 shrink-0">
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} /> تحديث
          </Button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar" role="tablist" aria-label="تصفية الطلبات">
          {(["الكل", "جديدة", "قيد التنفيذ", "تم الشحن", "مكتملة"] as OrderTab[]).map((tab) => (
            <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${activeTab === tab ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {tab}
              <span className="mr-1.5 opacity-70">{tab === "الكل" ? orders.length : orders.filter((order) => order.status === tabStatus[tab]).length}</span>
            </button>
          ))}
        </div>

        {visibleOrders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-lg font-semibold mb-2">لا توجد طلبات في هذا القسم</h2>
              <p className="text-gray-500 text-sm mb-4">ابدأ باختيار المنتجات المناسبة لنشاطك التجاري.</p>
              <Link href="/deals"><Button className="gap-2">تصفح العروض <ArrowLeft className="h-4 w-4" /></Button></Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {visibleOrders.map((order) => {
              const meta = statusMeta[order.status];
              const StatusIcon = meta.icon;
              return (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 mb-4">
                      <div>
                        <p className="font-bold">طلب #{order.id}</p>
                        <p className="text-xs text-muted-foreground mt-1">تم الإنشاء في {new Date(order.createdAt).toLocaleDateString("ar-YE")}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${meta.color}`}><StatusIcon className="h-3.5 w-3.5" />{meta.label}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div><p className="text-muted-foreground mb-1">المشتري</p><p className="font-medium">{order.buyer}</p></div>
                      <div><p className="text-muted-foreground mb-1">عدد الوحدات</p><p className="font-medium">{order.items.toLocaleString("ar-YE")}</p></div>
                      <div><p className="text-muted-foreground mb-1">الإجمالي</p><p className="font-bold text-primary">${order.total.toFixed(2)}</p></div>
                      <div className="flex sm:justify-end items-end"><Link href={`/orders/${encodeURIComponent(order.id)}`} className="text-primary font-semibold text-sm hover:underline">تفاصيل الطلب <ArrowLeft className="inline h-3.5 w-3.5" /></Link></div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
