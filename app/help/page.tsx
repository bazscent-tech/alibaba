"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  Search,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Shield,
  Truck,
  CreditCard,
  Package,
  Users,
  HelpCircle,
  ChevronLeft,
} from "lucide-react";

const helpCategories = [
  {
    icon: Package,
    title: "الطلبات والشحن",
    description: "تتبع الطلبات، مواعيد التسليم، مشاكل الشحن",
    articles: 24,
  },
  {
    icon: CreditCard,
    title: "الدفع والفواتير",
    description: "طرق الدفع، الفواتير، المبالغ المستردة",
    articles: 18,
  },
  {
    icon: Shield,
    title: "الأمان والحماية",
    description: "حماية الحساب، التحقق، الاحتيال",
    articles: 15,
  },
  {
    icon: Users,
    title: "إدارة الحساب",
    description: "إعدادات الحساب، الملف الشخصي، كلمة المرور",
    articles: 21,
  },
  {
    icon: Truck,
    title: "المورد والمنتجات",
    description: "التواصل مع الموردين، جودة المنتجات",
    articles: 32,
  },
  {
    icon: FileText,
    title: "السياسات والشروط",
    description: "شروط الاستخدام، سياسة الخصوصية، الإرجاع",
    articles: 12,
  },
];

const faqs = [
  {
    question: "كيف يمكنني تتبع طلبي؟",
    answer:
      "يمكنك تتبع طلبك من خلال الذهاب إلى 'طلباتي' في حسابك، ثم النقر على 'تتبع الشحنة' بجانب الطلب المراد تتبعه. ستظهر لك تفاصيل الشحنة وموقعها الحالي.",
  },
  {
    question: "ما هي طرق الدفع المتاحة؟",
    answer:
      "نوفر عدة طرق للدفع تشمل: البطاقات الائتمانية (فيزا، ماستركارد)، PayPal، التحويل البنكي، والدفع عند الاستلام في بعض المناطق. جميع المعاملات مشفرة وآمنة.",
  },
  {
    question: "كيف يمكنني إرجاع منتج؟",
    answer:
      "لإرجاع منتج، قم بالدخول إلى 'طلباتي' واختر الطلب المراد إرجاعه، ثم اضغط على 'طلب إرجاع'. سيتم مراجعة طلبك خلال 24-48 ساعة وسنرسل لك تعليمات الإرجاع.",
  },
  {
    question: "كم يستغرق وصول الشحنة؟",
    answer:
      "تختلف مدة الشحن حسب موقعك وطريقة الشحن المختارة. عادةً ما يستغرق الشحن القياسي 7-15 يوم عمل، بينما الشحن السريع يستغرق 3-7 أيام عمل.",
  },
  {
    question: "كيف أتواصل مع المورد؟",
    answer:
      "يمكنك التواصل مع المورد مباشرة من صفحة المنتج بالضغط على 'تواصل مع المورد' أو 'إرسال استفسار'. يمكنك أيضاً استخدام نظام المراسلة الداخلي للتفاوض على الأسعار والكميات.",
  },
  {
    question: "ما هي ضمانات حماية المشتري؟",
    answer:
      "نوفر ضمان حماية المشتري الذي يشمل: استرداد كامل المبلغ إذا لم يصل المنتج، استرداد جزئي أو كامل إذا كان المنتج مختلفاً عن الوصف، ودعم في حل النزاعات مع الموردين.",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-l from-primary to-accent py-16">
          <div className="container mx-auto px-4 text-center text-primary-foreground">
            <h1 className="text-4xl font-bold mb-4">مركز المساعدة</h1>
            <p className="text-xl opacity-90 mb-8">
              كيف يمكننا مساعدتك اليوم؟
            </p>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="ابحث عن سؤالك أو موضوع..."
                className="pr-12 h-14 text-lg bg-background text-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Categories Grid */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">
              تصفح حسب الموضوع
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpCategories.map((category, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <category.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {category.description}
                      </p>
                      <span className="text-xs text-primary">
                        {category.articles} مقالة
                      </span>
                    </div>
                    <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">
              الأسئلة الشائعة
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className="overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === index ? null : index)
                    }
                    className="w-full p-4 flex items-center justify-between text-right hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-muted-foreground">
                      {faq.answer}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </section>

          {/* Contact Options */}
          <section>
            <h2 className="text-2xl font-bold mb-8 text-center">
              لم تجد إجابتك؟ تواصل معنا
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold mb-2">الدردشة المباشرة</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  تحدث مع فريق الدعم مباشرة
                </p>
                <Button className="w-full">ابدأ المحادثة</Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold mb-2">اتصل بنا</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  متاح 24/7 لخدمتك
                </p>
                <Button variant="outline" className="w-full">
                  +966 11 XXX XXXX
                </Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold mb-2">راسلنا</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  نرد خلال 24 ساعة
                </p>
                <Button variant="outline" className="w-full">
                  إرسال رسالة
                </Button>
              </Card>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
