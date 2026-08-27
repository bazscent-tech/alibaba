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
import { Eye, EyeOff, Mail, Lock, User, Building, Phone } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const login = useUserStore((s) => s.login);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"buyer" | "seller">("buyer");
  const [errors, setErrors] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    company: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // Rate limiting
    if (!checkRateLimit('register', 3, 300000)) {
      setErrors(["محاولات كثيرة. يرجى الانتظار"]);
      return;
    }

    // Validate all fields
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

    // Sanitize inputs
    const sanitizedName = sanitizeInput(form.name);
    const sanitizedEmail = sanitizeInput(form.email);

    try {
      const response = await fetch('/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: sanitizedName,
          email: sanitizedEmail,
          password: form.password,
          phone: form.phone,
          company: form.company,
          type: userType,
        }),
      });
      const data = await response.json();

      if (data.success) {
        login(data.data.user, userType);
        router.push("/");
      } else {
        setErrors([data.error || "خطأ في إنشاء الحساب"]);
      }
    } catch {
      setErrors(["خطأ في الاتصال بالخادم"]);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive animate-fade-in py-8 sm:py-12 md:py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="p-6 sm:p-8">
              <h1 className="text-xl sm:text-2xl font-bold text-center mb-6">إنشاء حساب جديد</h1>

              {/* User Type Toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setUserType("buyer")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    userType === "buyer"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  مشتري
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("seller")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    userType === "seller"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  بائع
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  {errors.map((err, i) => (
                    <p key={i} className="text-red-600 text-sm">{err}</p>
                  ))}
                </div>
              )}
                <div>
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <div className="relative mt-1">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="أدخل اسمك"
                      className="pr-10 focus-ring"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      className="pr-10 focus-ring"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+967 7x xxx xxxx"
                      className="pr-10 focus-ring"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                {userType === "seller" && (
                  <div>
                    <Label htmlFor="company">اسم الشركة</Label>
                    <div className="relative mt-1">
                      <Building className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="company"
                        type="text"
                        placeholder="اسم شركتك"
                        className="pr-10 focus-ring"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="password">كلمة المرور</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pr-10 pl-10 focus-ring"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full press-effect">
                  إنشاء الحساب
                </Button>
              </form>

              <p className="text-center text-sm text-gray-600 mt-4">
                لديك حساب بالفعل؟{" "}
                <Link href="/login" className="text-primary font-medium hover:underline">
                  تسجيل الدخول
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
