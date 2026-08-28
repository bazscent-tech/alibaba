"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/lib/store";
import { MessageCircle, Send, Store, User, ShieldCheck, ArrowLeft } from "lucide-react";

interface MessageItem { id: string; supplier: string; product?: string; message: string; createdAt: string; }

export default function MessagesPage() {
  const { isLoggedIn, user } = useUserStore();
  const [supplier, setSupplier] = useState("التاجر");
  const [product, setProduct] = useState<string>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSupplier(params.get("supplier") || "التاجر");
    setProduct(params.get("product") || undefined);
    try { setMessages(JSON.parse(window.localStorage.getItem("shibam-messages") || "[]") as MessageItem[]); } catch { setMessages([]); }
  }, []);

  const threadMessages = useMemo(() => messages.filter((item) => item.supplier === supplier), [messages, supplier]);

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;
    const next: MessageItem = { id: `msg-${Date.now()}`, supplier, product, message: trimmed, createdAt: new Date().toISOString() };
    const updated = [next, ...messages];
    setMessages(updated);
    window.localStorage.setItem("shibam-messages", JSON.stringify(updated));
    setMessage("");
  };

  if (!isLoggedIn) {
    return <div className="min-h-screen bg-muted/30"><Header /><main className="container-responsive messages-gate"><div className="surface messages-gate__card"><span className="messages-gate__icon"><MessageCircle /></span><p className="eyebrow">تواصل بثقة</p><h1>سجّل الدخول للمراسلة</h1><p>استخدم حسابك للشراء ومراسلة التجار ومتابعة ردودهم من مكان واحد.</p><div><Link href="/login" className="hero-cta__primary">تسجيل الدخول <ArrowLeft className="h-4 w-4" /></Link><Link href="/register" className="hero-cta__secondary">إنشاء حساب</Link></div></div></main><Footer /></div>;
  }

  return <div className="min-h-screen bg-muted/30"><Header /><main className="container-responsive messages-page"><div className="messages-heading"><div><p className="eyebrow">تواصل مباشر</p><h1>مراسلاتي</h1><p>اسأل التاجر عن السعر، الكمية، والشحن قبل الطلب.</p></div><Link href="/account" className="messages-heading__back">العودة إلى الحساب <ArrowLeft className="h-4 w-4" /></Link></div><div className="messages-layout"><section className="surface messages-thread"><div className="messages-thread__head"><div className="messages-thread__avatar"><Store className="h-5 w-5" /></div><div><strong>{supplier}</strong><small>{product ? `بخصوص: ${product}` : "محادثة تجارية"}</small></div><span className="messages-thread__status"><span /> متاح</span></div><div className="messages-thread__body">{threadMessages.length === 0 ? <div className="messages-empty"><MessageCircle className="h-8 w-8" /><strong>ابدأ المحادثة</strong><span>اكتب رسالة قصيرة وواضحة للتاجر.</span></div> : threadMessages.map((item) => <div key={item.id} className="message-bubble"><p>{item.message}</p><small>من {user?.name || "حسابي"} · {new Date(item.createdAt).toLocaleString("ar-YE")}</small></div>)}</div><form onSubmit={handleSend} className="messages-composer"><Textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="اكتب رسالتك للتاجر..." required /><Button type="submit" size="icon" aria-label="إرسال الرسالة"><Send className="h-4 w-4" /></Button></form></section><aside className="surface messages-tips"><span className="messages-tips__icon"><ShieldCheck className="h-5 w-5" /></span><p className="eyebrow">تواصل آمن</p><h2>نصائح للتواصل</h2><div><p><User className="h-4 w-4" /> اذكر الكمية المطلوبة وبلد التسليم.</p><p><MessageCircle className="h-4 w-4" /> اطلب السعر النهائي ومدة التجهيز.</p><p><Store className="h-4 w-4" /> لا تشارك كلمة المرور أو بيانات الدفع داخل الرسائل.</p></div></aside></div></main><Footer /></div>;
}
