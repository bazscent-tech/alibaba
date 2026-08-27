"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/lib/store";
import { MessageCircle, Send, Store, User } from "lucide-react";

interface MessageItem { id: string; supplier: string; product?: string; message: string; createdAt: string; }

function readMessages(): MessageItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(window.localStorage.getItem("shibam-messages") || "[]") as MessageItem[]; } catch { return []; }
}

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const { isLoggedIn, user } = useUserStore();
  const supplier = searchParams.get("supplier") || "التاجر";
  const product = searchParams.get("product") || undefined;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>(readMessages);

  if (!isLoggedIn) {
    return <div className="min-h-screen bg-muted/30"><Header /><main className="container-responsive py-16 text-center"><MessageCircle className="h-14 w-14 mx-auto text-primary/60 mb-4" /><h1 className="text-2xl font-bold mb-2">سجّل الدخول للمراسلة</h1><p className="text-muted-foreground mb-6">استخدم حسابك لمراسلة التجار ومتابعة ردودهم.</p><Link href="/login"><Button>تسجيل الدخول</Button></Link></main><Footer /></div>;
  }

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

  return <div className="min-h-screen bg-muted/30"><Header /><main className="container-responsive animate-fade-in py-6 sm:py-8"><div className="mb-6"><p className="text-sm text-primary font-semibold mb-1">تواصل مباشر</p><h1 className="text-2xl font-bold">مراسلاتي</h1><p className="text-sm text-muted-foreground mt-1">اسأل التاجر عن السعر، الكمية، والشحن قبل الطلب.</p></div><div className="grid lg:grid-cols-3 gap-5"><Card className="lg:col-span-2"><CardContent className="p-5"><div className="flex items-center gap-3 border-b pb-4 mb-5"><div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center"><Store className="h-5 w-5 text-primary" /></div><div><p className="font-bold">{supplier}</p><p className="text-xs text-muted-foreground">{product ? `بخصوص: ${product}` : "محادثة تجارية"}</p></div></div><div className="min-h-40 space-y-3 mb-5">{messages.filter((item) => item.supplier === supplier).length === 0 ? <div className="py-10 text-center text-sm text-muted-foreground">ابدأ برسالة قصيرة وواضحة للتاجر.</div> : messages.filter((item) => item.supplier === supplier).map((item) => <div key={item.id} className="rounded-xl bg-primary/5 border border-primary/10 p-3"><p className="text-sm">{item.message}</p><p className="text-[11px] text-muted-foreground mt-2">من {user?.name || "حسابي"} · {new Date(item.createdAt).toLocaleString("ar-YE")}</p></div>)}</div><form onSubmit={handleSend} className="flex gap-2 items-end"><Textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="اكتب رسالتك للتاجر..." className="min-h-20" required /><Button type="submit" size="icon" aria-label="إرسال الرسالة" className="shrink-0"><Send className="h-4 w-4" /></Button></form></CardContent></Card><Card><CardContent className="p-5"><h2 className="font-bold mb-4">نصائح للتواصل</h2><div className="space-y-3 text-sm text-muted-foreground"><p className="flex gap-2"><User className="h-4 w-4 text-primary shrink-0" />اذكر الكمية المطلوبة وبلد التسليم.</p><p className="flex gap-2"><MessageCircle className="h-4 w-4 text-primary shrink-0" />اطلب السعر النهائي ومدة التجهيز.</p><p className="flex gap-2"><Store className="h-4 w-4 text-primary shrink-0" />لا تشارك كلمة المرور أو بيانات الدفع داخل الرسائل.</p></div></CardContent></Card></div></main><Footer /></div>;
}
