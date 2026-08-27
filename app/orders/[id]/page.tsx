"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NETWORK_EVENT, readNetworkState, type NetworkOrder } from "@/lib/network-store";
import { ArrowRight, CheckCircle, Clock, Package, Truck, MapPin } from "lucide-react";

const steps: { status: NetworkOrder["status"]; label: string; icon: typeof Clock }[] = [
  { status: "new", label: "تم استلام الطلب", icon: Clock },
  { status: "processing", label: "قيد التجهيز", icon: Package },
  { status: "shipped", label: "تم الشحن", icon: Truck },
  { status: "completed", label: "تم التسليم", icon: CheckCircle },
];

const statusRank: Record<NetworkOrder["status"], number> = { new: 0, processing: 1, shipped: 2, completed: 3 };

export default function OrderDetailsPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<NetworkOrder | null>(null);

  useEffect(() => {
    const sync = () => setOrder(readNetworkState().orders.find((item) => item.id === decodeURIComponent(params.id)) ?? null);
    sync();
    window.addEventListener(NETWORK_EVENT, sync);
    return () => window.removeEventListener(NETWORK_EVENT, sync);
  }, [params.id]);

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive animate-fade-in py-6 sm:py-8">
        <Link href="/orders" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"><ArrowRight className="h-4 w-4" /> العودة إلى الطلبات</Link>
        {!order ? (
          <Card><CardContent className="py-14 text-center"><Package className="h-14 w-14 mx-auto text-muted-foreground mb-4" /><h1 className="text-xl font-bold mb-2">الطلب غير موجود</h1><p className="text-muted-foreground mb-6">قد يكون الطلب من جلسة أخرى أو تم حذفه.</p><Link href="/deals"><Button>متابعة التسوق</Button></Link></CardContent></Card>
        ) : (
          <div className="max-w-3xl mx-auto space-y-5">
            <Card><CardContent className="p-5 sm:p-7"><div className="flex flex-wrap items-start justify-between gap-4 mb-8"><div><p className="text-sm text-primary font-semibold mb-1">تفاصيل الطلب</p><h1 className="text-2xl font-bold">#{order.id}</h1><p className="text-sm text-muted-foreground mt-1">أنشئ في {new Date(order.createdAt).toLocaleDateString("ar-YE")}</p></div><div className="text-left"><p className="text-sm text-muted-foreground">الإجمالي</p><p className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</p></div></div><div className="relative grid grid-cols-4 gap-2">{steps.map((step, index) => { const Icon = step.icon; const active = statusRank[order.status] >= index; return <div key={step.status} className="relative text-center"><div className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center ${active ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}><Icon className="h-5 w-5" /></div><p className={`text-xs mt-2 ${active ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{step.label}</p></div>; })}</div></CardContent></Card>
            <div className="grid sm:grid-cols-2 gap-5"><Card><CardContent className="p-5"><h2 className="font-bold mb-4">ملخص الشحنة</h2><div className="space-y-3 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">المشتري</span><span>{order.buyer}</span></div><div className="flex justify-between"><span className="text-muted-foreground">عدد الوحدات</span><span>{order.items.toLocaleString("ar-YE")}</span></div><div className="flex justify-between"><span className="text-muted-foreground">المورد</span><span>شبكة شبام</span></div></div></CardContent></Card><Card><CardContent className="p-5"><h2 className="font-bold mb-4">معلومات التسليم</h2><div className="flex gap-3 text-sm"><MapPin className="h-5 w-5 text-primary shrink-0" /><div><p className="font-medium">يتم تحديد العنوان مع المورد</p><p className="text-muted-foreground mt-1">سيتواصل معك المورد لتأكيد موقع التسليم وموعد الشحن.</p></div></div></CardContent></Card></div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
