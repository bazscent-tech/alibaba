import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive py-16 text-center">
        <div className="max-w-md mx-auto">
          <p className="text-7xl font-bold text-primary mb-4">404</p>
          <h1 className="text-xl sm:text-2xl font-bold mb-2">الصفحة غير موجودة</h1>
          <p className="text-gray-500 text-sm mb-6">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button className="w-full sm:w-auto">
                <Home className="h-4 w-4 ml-2" />
                العودة للرئيسية
              </Button>
            </Link>
            <Link href="/search">
              <Button variant="outline" className="w-full sm:w-auto">
                <Search className="h-4 w-4 ml-2" />
                البحث عن منتج
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t">
            <p className="text-sm font-medium text-gray-700 mb-4">روابط سريعة</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "العروض اليومية", href: "/deals" },
                { label: "الفئات", href: "/categories" },
                { label: "الموردين", href: "/suppliers" },
                { label: "مركز المساعدة", href: "/help" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-primary hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
