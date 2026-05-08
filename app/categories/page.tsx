"use client";

import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { categories } from "@/lib/data";
import { ChevronLeft } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <main className="container-responsive py-4 sm:py-6 md:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-muted-foreground hover:text-primary">
            الرئيسية
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">جميع الفئات</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8">تصفح جميع الفئات</h1>

        <div className="grid gap-8">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              <div className="bg-gradient-to-l from-primary/5 to-transparent p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Image
                        src={category.icon}
                        alt={category.name}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{category.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {category.subcategories?.length || 0} فئة فرعية
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/category/${category.slug}`}
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    عرض الكل
                    <ChevronLeft className="w-4 h-4" />
                  </Link>
                </div>

                {/* Subcategories Grid */}
                {category.subcategories && category.subcategories.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/category/${category.slug}?sub=${sub.slug}`}
                        className="group"
                      >
                        <Card className="p-4 hover:shadow-md transition-all hover:border-primary/50">
                          <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={sub.image || category.icon}
                              alt={sub.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <h3 className="text-sm font-medium text-center group-hover:text-primary transition-colors line-clamp-2">
                            {sub.name}
                          </h3>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
