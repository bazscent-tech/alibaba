"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Store, ArrowRight, ShieldCheck, ShoppingBag, MessageCircle } from "lucide-react";

export default function SellPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive animate-fade-in py-10 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden shadow-sm">
            <CardContent className="p-6 sm:p-10 text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20"><Store className="h-8 w-8 text-primary-foreground" /></div>
              <p className="text-sm text-primary font-semibold mb-2">مساحة التجار في شبام</p>
              <h1 className="text-2xl sm:text-3xl font-bold mb-3">سجّل متجرك من داخل حسابك</h1>
              <p className="text-muted-foreground max-w-xl mx-auto mb-7">نستخدم حسابًا موحدًا لكل مستخدم. بعد تسجيل الدخول ستتمكن من الشراء ومراسلة التجار، ويمكنك إرسال طلب تسجيل متجرك من قسم «تسجيل كتاجر» داخل الحساب.</p>
              <Link href="/account"><Button size="lg" className="gap-2">فتح الحساب والبدء <ArrowRight className="h-4 w-4" /></Button></Link>
              <div className="grid sm:grid-cols-3 gap-3 mt-8 text-right">
                <div className="rounded-xl border p-4"><ShoppingBag className="h-5 w-5 text-primary mb-2" /><p className="font-semibold text-sm">شراء من أي تاجر</p><p className="text-xs text-muted-foreground mt-1">حساب واحد لكل عمليات الشراء.</p></div>
                <div className="rounded-xl border p-4"><MessageCircle className="h-5 w-5 text-primary mb-2" /><p className="font-semibold text-sm">مراسلة مباشرة</p><p className="text-xs text-muted-foreground mt-1">تواصل مع المورد قبل الطلب.</p></div>
                <div className="rounded-xl border p-4"><ShieldCheck className="h-5 w-5 text-primary mb-2" /><p className="font-semibold text-sm">تسجيل موثوق</p><p className="text-xs text-muted-foreground mt-1">بيانات المتجر تُرسل للمراجعة.</p></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
