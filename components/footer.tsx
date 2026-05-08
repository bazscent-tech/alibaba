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
    <footer className="bg-gray-900 text-gray-300 w-full max-w-[100vw] overflow-hidden">
      {/* Features Bar */}
      <div className="border-b border-gray-800">
        <div className="container-responsive section-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Truck, title: "شحن عالمي", desc: "إلى أكثر من 200 دولة" },
              { icon: Shield, title: "ضمان التجارة", desc: "حماية طلباتك" },
              { icon: CreditCard, title: "دفع آمن", desc: "طرق دفع متعددة" },
              { icon: Headphones, title: "دعم 24/7", desc: "خدمة عملاء متميزة" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3">
                <div className="bg-primary/20 p-2 sm:p-3 rounded-full shrink-0">
                  <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white text-xs sm:text-sm">{item.title}</p>
                  <p className="text-[11px] sm:text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-responsive section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* About */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="bg-primary rounded-lg p-1.5 sm:p-2">
                <span className="text-white font-bold text-lg sm:text-xl">شبام</span>
              </div>
              <span className="font-bold text-lg sm:text-xl text-white">جملة</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed text-sm sm:text-base">
              أكبر منصة عربية للتجارة الإلكترونية بين الشركات. نربط المشترين
              بالموردين الموثوقين من جميع أنحاء العالم. احصل على أفضل الأسعار
              بالجملة مع ضمان الجودة والشحن الآمن.
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="bg-gray-800 p-2 sm:p-2.5 rounded-full hover:bg-primary transition-all hover:scale-110 touch-feedback"
                  aria-label={`تابعنا على ${["فيسبوك", "تويتر", "إنستغرام", "يوتيوب"][i]}`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-white text-base sm:text-lg mb-3 sm:mb-4">الفئات</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-primary transition-all text-sm touch-target inline-flex items-center link-underline">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white text-base sm:text-lg mb-3 sm:mb-4">روابط سريعة</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {[
                { href: "/about", label: "من نحن" },
                { href: "/sell", label: "انضم كبائع" },
                { href: "/suppliers", label: "دليل الموردين" },
                { href: "/help", label: "مركز المساعدة" },
                { href: "/shipping", label: "الشحن والتوصيل" },
                { href: "/returns", label: "الإرجاع والاستبدال" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary transition-all text-sm touch-target inline-flex items-center link-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white text-base sm:text-lg mb-3 sm:mb-4">تواصل معنا</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                <span dir="ltr" className="text-sm">+966 50 123 4567</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                <span className="text-sm break-all">support@shabam.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-responsive py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-right">
              © 2026 شبام جملة. جميع الحقوق محفوظة.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
              <Link href="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">الشروط والأحكام</Link>
              <Link href="/sitemap" className="hover:text-primary transition-colors">خريطة الموقع</Link>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-400">طرق الدفع:</span>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {["VISA", "MC", "PayPal", "مدى"].map((name) => (
                  <div key={name} className="bg-white rounded px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold text-gray-800">
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
