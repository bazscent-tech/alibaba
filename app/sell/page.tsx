"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useUserStore } from "@/lib/store";
import { createNetworkStore } from "@/lib/network-store";
import {
  ChevronLeft,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const steps = [
  { id: 1, title: "معلومات الشركة", icon: Building },
  { id: 2, title: "معلومات الاتصال", icon: User },
  { id: 3, title: "تفاصيل النشاط", icon: Briefcase },
];

const countries = ["اليمن"];

const yemenGovernorates = [
  "أمانة العاصمة صنعاء",
  "عدن",
  "تعز",
  "الحديدة",
  "إب",
  "حضرموت",
  "ذمار",
  "مأرب",
  "عمران",
  "حجة",
  "صعدة",
  "لحج",
  "أبين",
  "شبوة",
  "البيضاء",
  "المحويت",
  "ريمة",
  "الضالع",
  "الجوف",
  "سقطرى",
];

const businessTypes = [
  "شركة تصنيع",
  "تاجر جملة",
  "موزع",
  "وكيل تصدير",
  "شركة تجارية",
  "مزود خدمات",
  "أخرى",
];

const productCategories = [
  "الإلكترونيات والكهربائيات",
  "الآلات والمعدات الصناعية",
  "الملابس والأزياء",
  "المنزل والحديقة",
  "الصحة والجمال",
  "قطع غيار السيارات",
  "الرياضة والترفيه",
  "المواد الغذائية",
  "مواد البناء",
  "الزراعة والمزارع",
  "التغليف والطباعة",
  "المجوهرات والساعات",
];

export default function SellPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { login } = useUserStore();

  const [formData, setFormData] = useState({
    companyName: "",
    companyNameEn: "",
    businessLicense: "",
    country: "",
    city: "",
    address: "",
    contactName: "",
    email: "",
    phone: "",
    whatsapp: "",
    businessType: "",
    mainProducts: "",
    productCategories: [] as string[],
    annualRevenue: "",
    employeeCount: "",
    description: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.companyName) newErrors.companyName = "اسم الشركة مطلوب";
      if (!formData.country) newErrors.country = "الدولة مطلوبة";
      if (!formData.city) newErrors.city = "المدينة مطلوبة";
    } else if (step === 2) {
      if (!formData.contactName) newErrors.contactName = "اسم المسؤول مطلوب";
      if (!formData.email) newErrors.email = "البريد الإلكتروني مطلوب";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "البريد الإلكتروني غير صحيح";
      if (!formData.phone) newErrors.phone = "رقم الهاتف مطلوب";
    } else if (step === 3) {
      if (!formData.businessType) newErrors.businessType = "نوع النشاط مطلوب";
      if (!formData.mainProducts) newErrors.mainProducts = "المنتجات الرئيسية مطلوبة";
      if (!formData.agreeTerms) newErrors.agreeTerms = "يجب الموافقة على الشروط والأحكام";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      createNetworkStore({
        name: formData.companyName,
        owner: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        category: formData.productCategories[0] || formData.mainProducts,
      });
      login(
        {
          id: `seller-${Date.now()}`,
          name: formData.contactName,
          email: formData.email,
          companyName: formData.companyName,
          phone: formData.phone,
          country: formData.country,
        },
        "seller"
      );
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-responsive animate-fade-in py-6 sm:py-4 sm:py-6 md:py-8 md:py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              تم تسجيلك بنجاح!
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              مرحباً بك في شبام جملة. تم إنشاء حساب البائع الخاص بك بنجاح.
              سيتواصل فريقنا معك خلال 24-48 ساعة للتحقق من بياناتك وتفعيل حسابك.
            </p>
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">ملخص التسجيل</h3>
                <div className="grid grid-cols-2 gap-4 text-right">
                  <div>
                    <p className="text-gray-500 text-sm">اسم الشركة</p>
                    <p className="font-medium">{formData.companyName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">البريد الإلكتروني</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">الدولة</p>
                    <p className="font-medium">{formData.country}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">نوع النشاط</p>
                    <p className="font-medium">{formData.businessType}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-center gap-4">
              <Link href="/">
                <Button variant="outline">العودة للرئيسية</Button>
              </Link>
              <Link href="/account"><Button>الذهاب للوحة التحكم</Button></Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-responsive animate-fade-in py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-primary">
            الرئيسية
          </Link>
          <ChevronLeft className="h-4 w-4" />
          <span className="text-gray-900 font-medium">التسجيل كبائع</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-l from-primary to-primary/80 text-white rounded-xl p-8 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              انضم كبائع في شبام جملة
            </h1>
            <p className="text-lg opacity-90 mb-6">
              اعرض منتجاتك لملايين المشترين حول العالم واحصل على فرص تجارية جديدة.
              التسجيل مجاني والبدء سهل.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>تسجيل مجاني</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>ملايين المشترين</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>دعم فني متواصل</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 ${
                    currentStep >= step.id ? "text-primary" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step.id
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`hidden sm:block font-medium ${
                      currentStep >= step.id ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 sm:w-32 h-1 mx-2 sm:mx-4 ${
                      currentStep > step.id ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Step 1: Company Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="companyName">
                        اسم الشركة (بالعربية) *
                      </Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) =>
                          updateField("companyName", e.target.value)
                        }
                        placeholder="مثال: شركة النور للتجارة"
                        className={errors.companyName ? "border-red-500" : ""}
                      />
                      {errors.companyName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.companyName}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="companyNameEn">
                        اسم الشركة (بالإنجليزية)
                      </Label>
                      <Input
                        id="companyNameEn"
                        value={formData.companyNameEn}
                        onChange={(e) =>
                          updateField("companyNameEn", e.target.value)
                        }
                        placeholder="Example: Al Noor Trading Co."
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="businessLicense">رقم السجل التجاري</Label>
                    <Input
                      id="businessLicense"
                      value={formData.businessLicense}
                      onChange={(e) =>
                        updateField("businessLicense", e.target.value)
                      }
                      placeholder="أدخل رقم السجل التجاري"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="country">الدولة *</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => updateField("country", value)}
                      >
                        <SelectTrigger
                          className={errors.country ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder="اختر الدولة" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.country && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.country}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="city">المدينة *</Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) => updateField("city", value)}
                      >
                        <SelectTrigger className={errors.city ? "border-red-500" : ""}>
                          <SelectValue placeholder="اختر المحافظة" />
                        </SelectTrigger>
                        <SelectContent>
                          {yemenGovernorates.map((governorate) => (
                            <SelectItem key={governorate} value={governorate}>{governorate}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">العنوان التفصيلي</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      placeholder="أدخل العنوان التفصيلي للشركة"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Contact Info */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="contactName">اسم المسؤول *</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) =>
                        updateField("contactName", e.target.value)
                      }
                      placeholder="الاسم الكامل"
                      className={errors.contactName ? "border-red-500" : ""}
                    />
                    {errors.contactName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.contactName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">البريد الإلكتروني *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="example@company.com"
                        dir="ltr"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">رقم الهاتف *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="+967 7X XXX XXXX"
                        dir="ltr"
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="whatsapp">رقم الواتساب</Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => updateField("whatsapp", e.target.value)}
                      placeholder="+967 7X XXX XXXX"
                      dir="ltr"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Business Details */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="businessType">نوع النشاط التجاري *</Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) =>
                        updateField("businessType", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.businessType ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="اختر نوع النشاط" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.businessType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.businessType}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="mainProducts">المنتجات الرئيسية *</Label>
                    <Textarea
                      id="mainProducts"
                      value={formData.mainProducts}
                      onChange={(e) =>
                        updateField("mainProducts", e.target.value)
                      }
                      placeholder="صف المنتجات أو الخدمات الرئيسية التي تقدمها"
                      rows={3}
                      className={errors.mainProducts ? "border-red-500" : ""}
                    />
                    {errors.mainProducts && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.mainProducts}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="annualRevenue">الإيرادات السنوية</Label>
                      <Select
                        value={formData.annualRevenue}
                        onValueChange={(value) =>
                          updateField("annualRevenue", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر النطاق" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="less-100k">
                            أقل من 100,000 دولار
                          </SelectItem>
                          <SelectItem value="100k-500k">
                            100,000 - 500,000 دولار
                          </SelectItem>
                          <SelectItem value="500k-1m">
                            500,000 - 1,000,000 دولار
                          </SelectItem>
                          <SelectItem value="1m-5m">
                            1,000,000 - 5,000,000 دولار
                          </SelectItem>
                          <SelectItem value="more-5m">
                            أكثر من 5,000,000 دولار
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="employeeCount">عدد الموظفين</Label>
                      <Select
                        value={formData.employeeCount}
                        onValueChange={(value) =>
                          updateField("employeeCount", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر النطاق" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 موظفين</SelectItem>
                          <SelectItem value="11-50">11-50 موظف</SelectItem>
                          <SelectItem value="51-200">51-200 موظف</SelectItem>
                          <SelectItem value="201-500">201-500 موظف</SelectItem>
                          <SelectItem value="more-500">
                            أكثر من 500 موظف
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">نبذة عن الشركة</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        updateField("description", e.target.value)
                      }
                      placeholder="اكتب نبذة مختصرة عن شركتك وتاريخها وخبراتها"
                      rows={4}
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) =>
                        updateField("agreeTerms", checked as boolean)
                      }
                    />
                    <div>
                      <Label
                        htmlFor="agreeTerms"
                        className={`text-sm ${
                          errors.agreeTerms ? "text-red-500" : "text-gray-700"
                        }`}
                      >
                        أوافق على{" "}
                        <Link
                          href="/terms"
                          className="text-primary hover:underline"
                        >
                          الشروط والأحكام
                        </Link>{" "}
                        و{" "}
                        <Link
                          href="/privacy"
                          className="text-primary hover:underline"
                        >
                          سياسة الخصوصية
                        </Link>
                      </Label>
                      {errors.agreeTerms && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.agreeTerms}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {currentStep > 1 ? (
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowRight className="h-4 w-4 ml-2" />
                    السابق
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <Button onClick={nextStep}>
                    التالي
                    <ArrowLeft className="h-4 w-4 mr-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 ml-2" />
                    إنشاء حساب البائع
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
