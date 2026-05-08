"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/lib/store";
import { Package, Truck, CheckCircle, Clock, User } from "lucide-react";

export default function OrdersPage() {
  const { isLoggedIn } = useUserStore();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Header />
        <main className="container-responsive py-16 text-center">
          <User className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold mb-2">يجب تسجيل الدخول</h1>
          <p className="text-gray-600 mb-6">سجّل دخولك لعرض طلباتك</p>
          <Link href="/login"><Button>تسجيل الدخول</Button></Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">طلباتي</h1>

        {/* Order Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar">
          {["الكل", "قيد التنفيذ", "تم الشحن", "مكتملة", "ملغاة"].map((tab, i) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                i === 0 ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Empty State */}
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-semibold mb-2">لا توجد طلبات</h2>
            <p className="text-gray-500 text-sm mb-4">لم تقم بإجراء أي طلبات بعد</p>
            <Link href="/deals"><Button>تصفح العروض</Button></Link>
          </CardContent>
        </Card>

        {/* Order Status Guide */}
        <div className="mt-8">
          <h2 className="font-semibold mb-4">حالات الطلبات</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Clock, label: "قيد التنفيذ", color: "text-yellow-500 bg-yellow-50" },
              { icon: Truck, label: "تم الشحن", color: "text-blue-500 bg-blue-50" },
              { icon: CheckCircle, label: "مكتملة", color: "text-green-500 bg-green-50" },
              { icon: Package, label: "ملغاة", color: "text-red-500 bg-red-50" },
            ].map((status) => (
              <div key={status.label} className={`p-3 rounded-lg ${status.color} text-center`}>
                <status.icon className="h-5 w-5 mx-auto mb-1" />
                <p className="text-xs font-medium">{status.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
