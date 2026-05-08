import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MapPin, Home, ShoppingBag, Users, HelpCircle, FileText } from "lucide-react";
import { categories } from "@/lib/data";

export default function SitemapPage() {
  const sections = [
    {
      title: "الرئيسية",
      icon: Home,
      links: [
        { label: "الصفحة الرئيسية", href: "/" },
        { label: "العروض اليومية", href: "/deals" },
        { label: "الأعلى تقييماً", href: "/top-rated" },
      ],
    },
    {
      title: "التسوق",
      icon: ShoppingBag,
      links: [
        { label: "جميع الفئات", href: "/categories" },
        ...categories.slice(0, 6).map((c) => ({ label: c.name, href: `/category/${c.slug}` })),
        { label: "البحث", href: "/search" },
      ],
    },
    {
      title: "الحساب",
      icon: Users,
      links: [
        { label: "تسجيل الدخول", href: "/login" },
        { label: "إنشاء حساب", href: "/register" },
        { label: "حسابي", href: "/account" },
        { label: "طلباتي", href: "/orders" },
        { label: "سلة التسوق", href: "/cart" },
      ],
    },
    {
      title: "البائعين",
      icon: FileText,
      links: [
        { label: "التسجيل كبائع", href: "/sell" },
        { label: "دليل الموردين", href: "/suppliers" },
      ],
    },
    {
      title: "المساعدة",
      icon: HelpCircle,
      links: [
        { label: "مركز المساعدة", href: "/help" },
        { label: "الشحن والتوصيل", href: "/shipping" },
        { label: "الإرجاع والاستبدال", href: "/returns" },
        { label: "من نحن", href: "/about" },
      ],
    },
    {
      title: "قانوني",
      icon: FileText,
      links: [
        { label: "سياسة الخصوصية", href: "/privacy" },
        { label: "الشروط والأحكام", href: "/terms" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive animate-fade-in py-6 sm:py-8">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="h-6 w-6 text-primary" />
          <h1 className="text-xl sm:text-2xl font-bold">خريطة الموقع</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <div key={section.title} className="bg-white rounded-xl border p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <section.icon className="h-5 w-5 text-primary" />
                <h2 className="font-bold">{section.title}</h2>
              </div>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-gray-600 hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
