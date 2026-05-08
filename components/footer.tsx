import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Headphones,
} from "lucide-react";
import { categories } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Features Bar */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-3 rounded-full">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-white">شحن عالمي</p>
                <p className="text-sm">إلى أكثر من 200 دولة</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-3 rounded-full">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-white">ضمان التجارة</p>
                <p className="text-sm">حماية طلباتك</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-white">دفع آمن</p>
                <p className="text-sm">طرق دفع متعددة</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-3 rounded-full">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-white">دعم 24/7</p>
                <p className="text-sm">خدمة عملاء متميزة</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary rounded-lg p-2">
                <span className="text-white font-bold text-xl">علي</span>
              </div>
              <span className="font-bold text-xl text-white">ماركت</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              أكبر منصة عربية للتجارة الإلكترونية بين الشركات. نربط المشترين
              بالموردين الموثوقين من جميع أنحاء العالم. احصل على أفضل الأسعار
              بالجملة مع ضمان الجودة والشحن الآمن.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">الفئات</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-primary transition-colors">
                  انضم كبائع
                </Link>
              </li>
              <li>
                <Link href="/suppliers" className="hover:text-primary transition-colors">
                  دليل الموردين
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-primary transition-colors">
                  مركز المساعدة
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-primary transition-colors">
                  الشحن والتوصيل
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-primary transition-colors">
                  الإرجاع والاستبدال
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span dir="ltr">+966 50 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>support@alimarket.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © 2026 علي ماركت. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                الشروط والأحكام
              </Link>
              <Link href="/sitemap" className="hover:text-primary transition-colors">
                خريطة الموقع
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">طرق الدفع:</span>
              <div className="flex items-center gap-2">
                <div className="bg-white rounded px-2 py-1 text-xs font-bold text-gray-800">
                  VISA
                </div>
                <div className="bg-white rounded px-2 py-1 text-xs font-bold text-gray-800">
                  MC
                </div>
                <div className="bg-white rounded px-2 py-1 text-xs font-bold text-gray-800">
                  PayPal
                </div>
                <div className="bg-white rounded px-2 py-1 text-xs font-bold text-gray-800">
                  مدى
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
