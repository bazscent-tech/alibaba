import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive py-6 sm:py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-xl sm:text-2xl font-bold">الشروط والأحكام</h1>
          </div>

          <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2">1. القبول بالشروط</h2>
              <p>باستخدامك لمنصة شبام جملة، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا لم توافق، يرجى عدم استخدام المنصة.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2">2. استخدام المنصة</h2>
              <ul className="list-disc mr-6 space-y-1">
                <li>يجب أن تكون عمرك 18 سنة أو أكثر لاستخدام المنصة</li>
                <li>يجب تقديم معلومات صحيحة ودقيقة عند التسجيل</li>
                <li>أنت مسؤول عن الحفاظ على أمان حسابك</li>
                <li>يُمنع استخدام المنصة لأي أغراض غير قانونية</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2">3. الطلبات والدفع</h2>
              <ul className="list-disc mr-6 space-y-1">
                <li>جميع الأسعار معروضة بالدولار الأمريكي ما لم يُذكر خلاف ذلك</li>
                <li>الحد الأدنى للطلب يختلف حسب المنتج</li>
                <li>نقبل الدفع عبر بطاقات الائتمان والتحويل البنكي وPayPal</li>
                <li>الأسعار لا تشمل الرسوم الجمركية والضرائب المحلية</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2">4. الشحن والتوصيل</h2>
              <ul className="list-disc mr-6 space-y-1">
                <li>أوقات التوصيل تقديرية وقد تختلف حسب الموقع</li>
                <li>رسوم الشحن تُحسب based on الوزن والوجهة</li>
                <li>نتحمل المسؤولية عنفقدان orتلف الشحنة</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2">5. الإرجاع والاستبدال</h2>
              <ul className="list-disc mr-6 space-y-1">
                <li>يمكن إرجاع المنتجات within 7 أيام من الاستلام</li>
                <li>يجب أن تكون المنتجات في حالتها الأصلية</li>
                <li>رسوم الإرجاع يتحملها المشتري unless the product is defective</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2">6. حدود المسؤولية</h2>
              <p>شبام جملة ليست مسؤولة عن أي أضرار غير مباشرة أو عرضية resulting from استخدام المنصة.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2">7. التعديلات</h2>
              <p>نحتفظ بالحق في تعديل هذه الشروط في أي time. سيتم إخطارك بأي تغييرات جوهرية.</p>
            </section>

            <p className="text-xs text-gray-400 mt-8">آخر تحديث: مايو 2026</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
