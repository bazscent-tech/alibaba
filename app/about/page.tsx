import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Globe, Users, Shield, Truck, Award, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary text-white py-12 sm:py-16">
          <div className="container-responsive text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">عن شبام جملة</h1>
            <p className="text-sm sm:text-base opacity-90 max-w-2xl mx-auto">
              أكبر منصة عربية للتجارة الإلكترونية بين الشركات — نربط المشترين بالموردين الموثوقين حول العالم
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="container-responsive py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { value: "+10,000", label: "مورد موثوق" },
              { value: "+500,000", label: "منتج متاح" },
              { value: "+200", label: "دولة يتم توصيلها" },
              { value: "+50,000", label: "مشتري نشط" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 bg-white rounded-xl shadow-sm">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="bg-white py-8 sm:py-12">
          <div className="container-responsive">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-8">مهمتنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Target, title: "سهولة التجارة", desc: "نجعل عملية الشراء بالجملة سهلة وسريعة وآمنة للجميع" },
                { icon: Shield, title: "الجودة والثقة", desc: "نتحقق من جميع الموردين لضمان حصولك على منتجات عالية الجودة" },
                { icon: Globe, title: "تغطية عالمية", desc: "نصل إلى أكثر من 200 دولة حول العالم مع شحن سريع وموثوق" },
              ].map((item) => (
                <div key={item.title} className="text-center p-6">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="container-responsive py-8 sm:py-12">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-8">قيمنا</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { icon: Users, title: "المشتري أولاً", desc: "نضع احتياجات المشترين في المقام الأول ونعمل على توفير أفضل تجربة شراء" },
              { icon: Award, title: "الجودة العالية", desc: "نلتزم بأعلى معايير الجودة في كل ما نقدمه من خدمات ومنتجات" },
              { icon: Shield, title: "الأمان والموثوقية", desc: "نضمن أمن transactions وحماية بيانات المستخدمين" },
              { icon: Truck, title: "التسليم السريع", desc: "نعمل مع أفضل شركات الشحن لضمان وصول طلباتك في أسرع وقت" },
            ].map((value) => (
              <div key={value.title} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="bg-primary/10 rounded-full p-3 h-fit shrink-0">
                  <value.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">{value.title}</h3>
                  <p className="text-xs text-gray-600">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
