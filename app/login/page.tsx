"use client";

import { useState } from "react";
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
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    setIsLoading(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive animate-fade-in py-10 sm:py-14">
        <div className="max-w-md mx-auto">
          <Card className="p-6 sm:p-8 shadow-sm">
            <div className="text-center mb-7">
              <div className="w-14 h-14 mx-auto mb-4 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20"><ShieldCheck className="w-7 h-7 text-primary-foreground" /></div>
              <h1 className="text-2xl font-bold">تسجيل الدخول</h1>
              <p className="text-muted-foreground mt-2 text-sm">ادخل إلى حسابك للشراء والتواصل مع التجار.</p>
            </div>

            {error && <div role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">{error}</div>}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2"><Label htmlFor="login-email">البريد الإلكتروني</Label><div className="relative"><Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input id="login-email" type="email" autoComplete="email" placeholder="name@example.com" className="pr-10" value={email} onChange={(event) => setEmail(event.target.value)} required /></div></div>
              <div className="space-y-2"><Label htmlFor="login-password">كلمة المرور</Label><div className="relative"><Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input id="login-password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="••••••••" className="pr-10 pl-10" value={password} onChange={(event) => setPassword(event.target.value)} required /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}>{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>
              <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">حساب آمن وموحّد</span><Link href="/help" className="text-primary hover:underline">مساعدة الدخول</Link></div>
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>{isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}</Button>
            </form>

            <div className="mt-6 rounded-xl bg-primary/5 border border-primary/10 p-3 text-xs text-muted-foreground text-center">كل حساب يستطيع الشراء ومراسلة التجار. يمكنك تسجيل متجرك كتاجر من داخل الحساب بعد الدخول.</div>
            <p className="text-center text-sm text-muted-foreground mt-6">ليس لديك حساب؟ <Link href="/register" className="text-primary font-semibold hover:underline">إنشاء حساب</Link></p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
