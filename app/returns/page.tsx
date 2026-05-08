import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RotateCcw, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive py-6 sm:py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <RotateCcw className="h-6 w-6 text-primary" />
            <h1 className="text-xl sm:text-2xl font-bold">سياسة الإرجاع والاستبدال</h1>
          </div>

          <div className="space-y-6">
            {/* Return Window */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h2 className="font-bold text-green-800">فترة الإرجاع: 7 أيام</h2>
              </div>
              <p className="text-sm text-green-700">يمكنك إرجاع المنتجات within 7 أيام من تاريخ الاستلام</p>
            </div>

            {/* Eligible */}
            <div className="bg-white rounded-xl border p-4 sm:p-6">
              <h2 className="font-bold mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                منتجات مؤهلة للإرجاع
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  المنتجات في حالتها الأصلية وغير مستخدمة
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  المنتجات مع التغليف الأصلي والملحقات
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  المنتجات التالفة أو المعيبة عند الاستلام
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  المنتجات المختلفة عن الوصف
                </li>
              </ul>
            </div>

            {/* Not Eligible */}
            <div className="bg-white rounded-xl border p-4 sm:p-6">
              <h2 className="font-bold mb-3 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                منتجات غير مؤهلة للإرجاع
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  المنتجات المصنعة حسب الطلب
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  المنتجات القابلة للتلف
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  المنتجات التي تم فتحها أو استخدامها
                </li>
              </ul>
            </div>

            {/* Process */}
            <div className="bg-white rounded-xl border p-4 sm:p-6">
              <h2 className="font-bold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                خطوات الإرجاع
              </h2>
              <div className="space-y-4">
                {[
                  { step: "1", title: "تقديم طلب الإرجاع", desc: "من خلال صفحة طلباتي واختر الطلب المراد إرجاعه" },
                  { step: "2", title: "مراجعة الطلب", desc: "سنراجع طلبك خلال 24-48 ساعة" },
                  { step: "3", title: "إرجاع المنتج", desc: "اتبع تعليمات الشحن لإرجاع المنتج" },
                  { step: "4", title: "استرداد المبلغ", desc: "سيتم استرداد المبلغ within 5-10 أيام عمل" },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <div className="bg-primary text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 sm:p-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-yellow-800 text-sm">ملاحظة هامة</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    رسوم الشحن للإرجاع يتحملها المشتري unless the product is defective or different from the description.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
