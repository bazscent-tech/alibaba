"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store";
import { validateEmail, validatePassword } from "@/lib/validation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const login = useUserStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "google_not_configured") {
      setError("تسجيل Google غير مفعّل بعد. أضف مفاتيح Google OAuth في إعدادات النشر.");
    } else if (params.get("error") === "google_failed") {
      setError("تعذر تسجيل الدخول باستخدام Google. حاول مرة أخرى.");
    }

    if (params.get("google") !== "success") return;
    setIsGoogleLoading(true);
    fetch("/api/auth/google/session", { credentials: "include" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Google session unavailable");
        return response.json() as Promise<{ user: { id: string; name: string; email: string; avatar?: string } }>;
      })
      .then(({ user }) => {
        login(user);
        router.replace("/");
      })
      .catch(() => setError("تعذر إكمال جلسة Google. حاول مرة أخرى."))
      .finally(() => setIsGoogleLoading(false));
  }, [login, router]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    if (!emailValidation.isValid) {
      setError(emailValidation.errors[0] || "أدخل بريدًا إلكترونيًا صحيحًا.");
      return;
    }
    if (!passwordValidation.isValid) {
      setError(passwordValidation.errors[0] || "تحقق من كلمة المرور.");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    login({ id: `user-${email.toLowerCase()}`, name: email.split("@")[0] || "مستخدم شبام", email });
    router.push("/");
  };

  const handleGoogleLogin = () => {
    setError("");
    setIsGoogleLoading(true);
    window.location.assign(new URL("/api/auth/google", window.location.origin).toString());
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive animate-fade-in py-10 sm:py-14">
        <div className="max-w-md mx-auto">
          <Card className="p-6 sm:p-8 shadow-sm">
            <div className="text-center mb-7">
              <div className="w-14 h-14 mx-auto mb-4 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <ShieldCheck className="w-7 h-7 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">تسجيل الدخول</h1>
              <p className="text-muted-foreground mt-2 text-sm">ادخل إلى حسابك للشراء والتواصل مع التجار.</p>
            </div>

            {error && <div role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">{error}</div>}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="login-email" type="email" autoComplete="email" placeholder="name@example.com" className="pr-10" value={email} onChange={(event) => setEmail(event.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="login-password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="••••••••" className="pr-10 pl-10" value={password} onChange={(event) => setPassword(event.target.value)} required />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}>
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">حساب آمن وموحّد</span>
                <Link href="/help" className="text-primary hover:underline">مساعدة الدخول</Link>
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isLoading || isGoogleLoading}>{isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}</Button>
            </form>

            <div className="relative my-6"><div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-3 text-muted-foreground">أو</span></div></div>

            <Button type="button" variant="outline" className="w-full gap-3 h-11" onClick={handleGoogleLogin} disabled={isLoading || isGoogleLoading}>
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.35 12.24c0-.74-.07-1.45-.21-2.12H12v4.01h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.28Z"/><path fill="#34A853" d="M12 21.6c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.74 9.74 0 0 0 12 21.6Z"/><path fill="#FBBC05" d="M6.54 13.69A5.86 5.86 0 0 1 6.23 12c0-.59.11-1.16.31-1.69V7.78H3.29A9.7 9.7 0 0 0 2.26 12c0 1.56.37 3.03 1.03 4.22l3.25-2.53Z"/><path fill="#EA4335" d="M12 6.28c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.84 3.33 14.63 2.4 12 2.4a9.74 9.74 0 0 0-8.71 5.38l3.25 2.53C7.31 8 9.46 6.28 12 6.28Z"/></svg>
              {isGoogleLoading ? "جاري فتح Google..." : "المتابعة باستخدام Google"}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">ليس لديك حساب؟ <Link href="/register" className="text-primary font-semibold hover:underline">إنشاء حساب بالبريد</Link></p>
            <div className="mt-5 rounded-xl bg-primary/5 border border-primary/10 p-3 text-xs text-muted-foreground text-center">كل حساب يستطيع الشراء ومراسلة التجار. يمكنك تسجيل متجرك كتاجر من داخل الحساب بعد الدخول.</div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
