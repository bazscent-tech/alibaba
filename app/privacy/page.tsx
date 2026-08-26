import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive animate-fade-in py-6 sm:py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl sm:text-2xl font-bold">سياسة الخصوصية</h1>
          </div>

          <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2">1. مقدمة</h2>
              <p>نحن في شبام جملة ن高度重视 خصوصيتك. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية when using our platform.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2">2. المعلومات التي نجمعها</h2>
              <ul className="list-disc mr-6 space-y-1">
                <li>المعلومات الشخصية: الاسم، البريد الإلكتروني، رقم الهاتف</li>
                <li>معلومات الحساب: اسم الشركة، العنوان، تفضيلات التسوق</li>
                <li>معلومات الاستخدام: الصفحات التي تزورها، المنتجات التي تتصفحها</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2">3. كيفية استخدام المعلومات</h2>
              <ul className="list-disc mr-6 space-y-1">
                <li>توفير وتحسين خدماتنا</li>
                <li>معالجة الطلبات والمدفوعات</li>
                <li>التواصل معك بخصوص حسابك وطلباتك</li>
                <li>إرسال العروض والتحديثات (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2">4. حماية البيانات</h2>
              <p>نستخدم تقنيات تشفير متقدمة وبروتوكولات أمان strict لحماية بياناتك من الوصول غير المصرح به.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2">5. مشاركة المعلومات</h2>
              <p>لا نبيع أو نشارك معلوماتك الشخصية مع أطراف ثالثة إلا in the following cases:</p>
              <ul className="list-disc mr-6 space-y-1">
                <li>مع الموردين لمعالجة طلباتك</li>
                <li>مع شركات الشحن لتوصيل طلباتك</li>
                <li>عندما يتطلب ذلك القانون</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2">6. حقوقك</h2>
              <p>لك الحق في:</p>
              <ul className="list-disc mr-6 space-y-1">
                <li>الوصول إلى بياناتك الشخصية</li>
                <li>تصحيح أو تحديث بياناتك</li>
                <li>حذف حسابك وبياناتك</li>
                <li>إلغاء الاشتراك من الرسائل التسويقية</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2">7. التواصل</h2>
              <p>لأي استفسار حول الخصوصية، يمكنك مراجعة مركز المساعدة من خلال التنقل الرئيسي.</p>
            </section>

            <p className="text-xs text-gray-400 mt-8">آخر تحديث: مايو 2026</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
