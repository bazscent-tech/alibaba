import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { suppliers } from "@/lib/data";
import { CheckCircle, MapPin, MessageCircle, Globe } from "lucide-react";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'شبام جملة',
  description: 'دليل الموردين في شبام جملة - اكتشف شركاء نمو موثوقين.',
};

export default function SuppliersPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive animate-fade-in py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">دليل الموردين</h1>
            <p className="text-sm text-gray-500 mt-1">{suppliers.length} مورد موثوق</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {suppliers.map((supplier) => (
            <Card key={supplier.id} className="hover-lift">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base">{supplier.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">{supplier.country}</span>
                    </div>
                  </div>
                  {supplier.verified && (
                    <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs">
                      <CheckCircle className="h-3 w-3" />
                      موثق
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-lg font-bold text-primary">{supplier.yearsInBusiness}</p>
                    <p className="text-[10px] text-gray-500">سنوات خبرة</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-lg font-bold text-primary">{supplier.responseRate}%</p>
                    <p className="text-[10px] text-gray-500">معدل الاستجابة</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href="/help" className="inline-flex items-center justify-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-xs font-medium hover:bg-muted flex-1">
                    <MessageCircle className="h-3.5 w-3.5" />
                    تواصل
                  </Link>
                  <Link href={`/search?q=${encodeURIComponent(supplier.name)}`} className="inline-flex items-center justify-center gap-1 rounded-md bg-primary text-primary-foreground px-3 py-2 text-xs font-medium hover:opacity-90 flex-1">
                    <Globe className="h-3.5 w-3.5" />
                    منتجات المورد
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
