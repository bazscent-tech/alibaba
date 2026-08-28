"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/lib/store";
import { validateEmail, validatePassword, validateName, validatePhone, sanitizeInput, validateForm } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { Eye, EyeOff, Mail, Lock, User, Phone, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const login = useUserStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    if (!checkRateLimit("register", 3, 300000)) {
      setErrors(["محاولات كثيرة. يرجى الانتظار قليلًا ثم المحاولة مرة أخرى."]);
      return;
    }

    const validation = validateForm([
      validateName(form.name),
      validateEmail(form.email),
      validatePassword(form.password),
      validatePhone(form.phone),
    ]);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: sanitizeInput(form.name), email: sanitizeInput(form.email), password: form.password, phone: form.phone, type: "user" }),
      });
      const data = await response.json() as { success?: boolean; error?: string; data?: { user?: { id: string; name: string; email: string; phone?: string } } };
      if (!response.ok || !data.success || !data.data?.user) {
        setErrors([data.error || "تعذر إنشاء الحساب."]);
        return;
      }
      login(data.data.user);
      router.push("/account");
    } catch {
      setErrors(["تعذر الاتصال بالخادم. حاول مرة أخرى."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive animate-fade-in py-10 sm:py-14">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="p-6 sm:p-8">
              <div className="text-center mb-7">
                <div className="w-14 h-14 mx-auto mb-4 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20"><ShieldCheck className="h-7 w-7 text-primary-foreground" /></div>
                <h1 className="text-2xl font-bold">إنشاء حساب</h1>
                <p className="text-sm text-muted-foreground mt-2">حساب واحد للشراء ومراسلة التجار، مع خيار تسجيل متجرك لاحقًا.</p>
              </div>

              {errors.length > 0 && <div role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700 space-y-1">{errors.map((error, index) => <p key={`${error}-${index}`}>{error}</p>)}</div>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2"><Label htmlFor="register-name">الاسم الكامل</Label><div className="relative"><User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input id="register-name" autoComplete="name" placeholder="أدخل اسمك" className="pr-10" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></div></div>
                <div className="space-y-2"><Label htmlFor="register-email">البريد الإلكتروني</Label><div className="relative"><Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input id="register-email" type="email" autoComplete="email" placeholder="name@example.com" className="pr-10" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></div></div>
                <div className="space-y-2"><Label htmlFor="register-phone">رقم الهاتف <span className="text-muted-foreground font-normal">(اختياري)</span></Label><div className="relative"><Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input id="register-phone" type="tel" autoComplete="tel" placeholder="+967 7x xxx xxxx" className="pr-10" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></div></div>
                <div className="space-y-2"><Label htmlFor="register-password">كلمة المرور</Label><div className="relative"><Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input id="register-password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="8 أحرف على الأقل" className="pr-10 pl-10" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} minLength={8} required /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div><p className="text-xs text-muted-foreground">استخدم حرفًا كبيرًا وصغيرًا ورقمًا.</p></div>
                <label className="flex items-start gap-2 text-xs text-muted-foreground"><input type="checkbox" className="rounded mt-0.5" required /><span>أوافق على <Link href="/terms" className="text-primary hover:underline">شروط الاستخدام</Link> و<Link href="/privacy" className="text-primary hover:underline"> سياسة الخصوصية</Link>.</span></label>
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>{isLoading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}</Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">لديك حساب بالفعل؟ <Link href="/login" className="text-primary font-semibold hover:underline">تسجيل الدخول</Link></p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
