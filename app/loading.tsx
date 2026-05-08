import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Loading() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container-responsive py-16">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-500">جاري التحميل...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
