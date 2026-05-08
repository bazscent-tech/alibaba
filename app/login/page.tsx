"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store";
import { validateEmail, validatePassword, validateName, validatePhone, sanitizeInput } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  Phone,
  Globe,
  CheckCircle2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const login = useUserStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    company: "",
    country: "",
    userType: "buyer",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      login({
        id: "1",
        name: "مستخدم تجريبي",
        email: loginData.email,
      }, "buyer");
      setIsLoading(false);
      router.push("/");
    }, 1000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    // Rate limiting
    if (!checkRateLimit('register', 3, 300000)) {
      setError("محاولات كثيرة. يرجى الانتظار 5 دقائق");
      return;
    }
    e.preventDefault();
    setIsLoading(true);

    if (registerData.password !== registerData.confirmPassword) {
      alert("كلمات المرور غير متطابقة");
      setIsLoading(false);
      return;
    }

    // Simulate registration
    setTimeout(() => {
      login({
        id: "1",
        name: registerData.name,
        email: registerData.email,
        companyName: registerData.company,
        phone: registerData.phone,
        country: registerData.country,
      }, registerData.userType as "buyer" | "seller");
      setIsLoading(false);
      router.push("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <main className="container-responsive animate-fade-in py-6 sm:py-4 sm:py-6 md:py-8 md:py-12">
        <div className="max-w-md mx-auto">
          <Card className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">مرحباً بك في شبام جملة</h1>
              <p className="text-muted-foreground mt-2">
                منصة التجارة الإلكترونية B2B الرائدة
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
                <TabsTrigger value="register">حساب جديد</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="example@company.com"
                        className="pr-10 focus-ring"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">كلمة المرور</Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pr-10 pl-10 focus-ring"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>تذكرني</span>
                    </label>
                    <Link
                      href="#"
                      className="text-primary hover:underline"
                    >
                      نسيت كلمة المرور؟
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-name">الاسم الكامل</Label>
                      <div className="relative">
                        <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="reg-name"
                          placeholder="أحمد محمد"
                          className="pr-10 focus-ring"
                          value={registerData.name}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-phone">رقم الهاتف</Label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="reg-phone"
                          placeholder="+966 5XX XXX XXX"
                          className="pr-10 focus-ring"
                          value={registerData.phone}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              phone: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-email">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="example@company.com"
                        className="pr-10 focus-ring"
                        value={registerData.email}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-company">اسم الشركة</Label>
                      <div className="relative">
                        <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="reg-company"
                          placeholder="شركة ABC"
                          className="pr-10 focus-ring"
                          value={registerData.company}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              company: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-country">الدولة</Label>
                      <div className="relative">
                        <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <select
                          id="reg-country"
                          className="w-full h-10 pr-10 pl-3 rounded-md border border-input bg-background text-sm"
                          value={registerData.country}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              country: e.target.value,
                            })
                          }
                        >
                          <option value="">اختر الدولة</option>
                          <option value="SA">السعودية</option>
                          <option value="AE">الإمارات</option>
                          <option value="EG">مصر</option>
                          <option value="JO">الأردن</option>
                          <option value="KW">الكويت</option>
                          <option value="QA">قطر</option>
                          <option value="BH">البحرين</option>
                          <option value="OM">عُمان</option>
                          <option value="MA">المغرب</option>
                          <option value="DZ">الجزائر</option>
                          <option value="TN">تونس</option>
                          <option value="IQ">العراق</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>نوع الحساب</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <label
                        className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                          registerData.userType === "buyer"
                            ? "border-primary bg-primary/5"
                            : "border-input hover:border-primary/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="userType"
                          value="buyer"
                          checked={registerData.userType === "buyer"}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              userType: e.target.value,
                            })
                          }
                          className="sr-only"
                        />
                        <CheckCircle2
                          className={`w-5 h-5 ${
                            registerData.userType === "buyer"
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                        <span>مشتري</span>
                      </label>
                      <label
                        className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                          registerData.userType === "seller"
                            ? "border-primary bg-primary/5"
                            : "border-input hover:border-primary/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="userType"
                          value="seller"
                          checked={registerData.userType === "seller"}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              userType: e.target.value,
                            })
                          }
                          className="sr-only"
                        />
                        <CheckCircle2
                          className={`w-5 h-5 ${
                            registerData.userType === "seller"
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                        <span>بائع/مورد</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">كلمة المرور</Label>
                      <Input
                        id="reg-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerData.password}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-confirm">تأكيد كلمة المرور</Label>
                      <Input
                        id="reg-confirm"
                        type="password"
                        placeholder="••••••••"
                        value={registerData.confirmPassword}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="text-sm">
                    <label className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        className="rounded mt-1"
                        required
                      />
                      <span className="text-muted-foreground">
                        أوافق على{" "}
                        <Link href="#" className="text-primary hover:underline">
                          شروط الاستخدام
                        </Link>{" "}
                        و{" "}
                        <Link href="#" className="text-primary hover:underline">
                          سياسة الخصوصية
                        </Link>
                      </span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب جديد"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t">
              <p className="text-center text-sm text-muted-foreground mb-4">
                أو تسجيل الدخول باستخدام
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </Card>

          {/* Seller CTA */}
          <Card className="mt-6 p-6 bg-gradient-to-l from-primary/10 to-transparent border-primary/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">هل أنت مورد أو مصنّع؟</h3>
                <p className="text-sm text-muted-foreground">
                  انضم إلينا وابدأ ببيع منتجاتك لملايين المشترين
                </p>
              </div>
              <Link href="/sell">
                <Link href="/sell"><Button>ابدأ البيع</Button></Link>
              </Link>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
