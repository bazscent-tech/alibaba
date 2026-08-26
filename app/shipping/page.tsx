"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import {
  Truck,
  Package,
  Clock,
  Globe,
  Shield,
  CheckCircle2,
  MapPin,
  Plane,
  Ship,
  Box,
} from "lucide-react";

const shippingMethods = [
  {
    icon: Plane,
    name: "الشحن الجوي السريع",
    duration: "3-7 أيام عمل",
    description: "أسرع طريقة للشحن الدولي، مثالية للطلبات العاجلة",
    features: ["تتبع مباشر", "تأمين شامل", "توصيل باب لباب"],
  },
  {
    icon: Ship,
    name: "الشحن البحري",
    duration: "15-30 يوم عمل",
    description: "الخيار الأكثر اقتصادية للشحنات الكبيرة",
    features: ["تكلفة منخفضة", "للشحنات الضخمة", "تتبع الحاويات"],
  },
  {
    icon: Truck,
    name: "الشحن البري",
    duration: "7-14 يوم عمل",
    description: "مناسب للشحن الإقليمي ودول الخليج",
    features: ["اقتصادي", "للشحنات المتوسطة", "تتبع الشحنة"],
  },
  {
    icon: Box,
    name: "الشحن السريع (DHL/FedEx)",
    duration: "2-5 أيام عمل",
    description: "خدمة متميزة من شركات الشحن العالمية",
    features: ["ضمان التسليم", "تتبع لحظي", "خدمة عملاء 24/7"],
  },
];

const regions = [
  { name: "دول الخليج", duration: "3-7 أيام", cost: "من $15" },
  { name: "الشرق الأوسط", duration: "5-10 أيام", cost: "من $20" },
  { name: "شمال أفريقيا", duration: "7-14 يوم", cost: "من $25" },
  { name: "أوروبا", duration: "7-14 يوم", cost: "من $30" },
  { name: "أمريكا الشمالية", duration: "10-15 يوم", cost: "من $35" },
  { name: "آسيا", duration: "7-12 يوم", cost: "من $20" },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-l from-primary to-accent py-8 sm:py-6 sm:py-8 md:py-12 md:py-16">
          <div className="container-responsive text-center text-primary-foreground">
            <Truck className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">الشحن والتوصيل</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              نوفر لك خيارات شحن متعددة لتوصيل منتجاتك إلى أي مكان في العالم
              بأمان وسرعة
            </p>
          </div>
        </section>

        <div className="container-responsive py-6 sm:py-8 md:py-12">
          {/* Shipping Methods */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">
              طرق الشحن المتاحة
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {shippingMethods.map((method, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <method.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg">{method.name}</h3>
                        <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {method.duration}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {method.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {method.features.map((feature, i) => (
                          <span
                            key={i}
                            className="text-xs bg-muted px-2 py-1 rounded flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Shipping Regions */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">
              مناطق الشحن والتكاليف التقديرية
            </h2>
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-right p-4 font-medium">المنطقة</th>
                      <th className="text-right p-4 font-medium">
                        مدة التوصيل
                      </th>
                      <th className="text-right p-4 font-medium">
                        التكلفة التقديرية
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {regions.map((region, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            {region.name}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            {region.duration}
                          </div>
                        </td>
                        <td className="p-4 font-medium text-primary">
                          {region.cost}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            <p className="text-sm text-muted-foreground text-center mt-4">
              * الأسعار تقديرية وقد تختلف حسب الوزن والحجم وطريقة الشحن المختارة
            </p>
          </section>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">
              مميزات الشحن لدينا
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-bold mb-2">تأمين شامل</h3>
                <p className="text-sm text-muted-foreground">
                  جميع الشحنات مؤمنة ضد التلف والفقدان
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <Globe className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-bold mb-2">شحن عالمي</h3>
                <p className="text-sm text-muted-foreground">
                  خيارات شحن مرنة من المورد إلى عنوانك
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                  <Package className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="font-bold mb-2">تتبع مباشر</h3>
                <p className="text-sm text-muted-foreground">
                  تتبع شحنتك لحظة بلحظة من المصنع حتى باب منزلك
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                  <Clock className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="font-bold mb-2">شحن سريع</h3>
                <p className="text-sm text-muted-foreground">
                  خيارات شحن سريعة للطلبات العاجلة
                </p>
              </Card>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold mb-8 text-center">
              أسئلة شائعة عن الشحن
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <Card className="p-4">
                <h3 className="font-bold mb-2">كيف يمكنني تتبع شحنتي؟</h3>
                <p className="text-muted-foreground">
                  بعد شحن طلبك، ستتلقى رقم تتبع عبر البريد الإلكتروني. يمكنك
                  استخدام هذا الرقم في صفحة &quot;طلباتي&quot; لتتبع شحنتك مباشرة.
                </p>
              </Card>
              <Card className="p-4">
                <h3 className="font-bold mb-2">
                  ماذا أفعل إذا تأخرت شحنتي؟
                </h3>
                <p className="text-muted-foreground">
                  إذا تجاوزت الشحنة المدة المتوقعة، يرجى التواصل مع خدمة العملاء
                  وسنتابع مع شركة الشحن لمعرفة حالة طلبك.
                </p>
              </Card>
              <Card className="p-4">
                <h3 className="font-bold mb-2">
                  هل يمكنني تغيير عنوان التوصيل؟
                </h3>
                <p className="text-muted-foreground">
                  نعم، يمكنك تغيير عنوان التوصيل قبل شحن الطلب. بعد الشحن، قد لا
                  يكون التغيير ممكناً حسب سياسة شركة الشحن.
                </p>
              </Card>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
