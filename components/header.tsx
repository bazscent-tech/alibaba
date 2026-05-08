"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Globe,
  Phone,
  Headphones,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/lib/data";
import { useCartStore, useUserStore, useWishlistStore } from "@/lib/store";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const router = useRouter();
  const cartItems = useCartStore((state) => state.getTotalItems());
  const wishlistItems = useWishlistStore((state) => state.items.length);
  const { isLoggedIn, user, logout } = useUserStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm w-full max-w-[100vw]">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-xs sm:text-sm">
        <div className="container-responsive py-1.5 sm:py-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span className="whitespace-nowrap">+966 50 123 4567</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Headphones className="h-4 w-4 shrink-0" />
              <span>دعم فني على مدار الساعة</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors touch-target">
                <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>العربية</span>
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>العربية</DropdownMenuItem>
                <DropdownMenuItem>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-gray-400 hidden sm:inline">|</span>
            <span className="hidden sm:inline">USD $</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-primary">
        <div className="container-responsive py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0 touch-target">
              <div className="bg-white rounded-lg p-1.5 sm:p-2">
                <span className="text-primary font-bold text-base sm:text-xl">شبام</span>
              </div>
              <div className="hidden sm:block text-white">
                <span className="font-bold text-lg sm:text-xl">جملة</span>
                <span className="block text-[10px] sm:text-xs opacity-80">
                  B2B التجارة الإلكترونية
                </span>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex">
              <div className="flex w-full">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      className="rounded-l-none rounded-r-lg bg-gray-100 border-l border-gray-300 hover:bg-gray-200 text-gray-700 text-sm whitespace-nowrap px-2 lg:px-3"
                    >
                      <span className="hidden lg:inline">جميع الفئات</span>
                      <span className="lg:hidden">الفئات</span>
                      <ChevronDown className="h-4 w-4 mr-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 max-h-[60vh] overflow-y-auto">
                    {categories.map((cat) => (
                      <DropdownMenuItem key={cat.id} asChild>
                        <Link href={`/category/${cat.slug}`}>{cat.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Input
                  type="text"
                  placeholder="ابحث عن منتجات، موردين..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-none border-y border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                />
                <Button type="submit" className="rounded-r-none rounded-l-lg bg-accent hover:bg-accent/90 px-3">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
              {/* User */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:bg-white/10 flex items-center gap-1 sm:gap-2 px-2 sm:px-3">
                    <User className="h-5 w-5" />
                    <span className="hidden lg:inline text-sm">
                      {isLoggedIn ? user?.name : "حسابي"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {isLoggedIn ? (
                    <>
                      <DropdownMenuItem asChild><Link href="/account">لوحة التحكم</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/orders">طلباتي</Link></DropdownMenuItem>
                      <DropdownMenuItem onClick={logout}>تسجيل الخروج</DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild><Link href="/login">تسجيل الدخول</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/register">إنشاء حساب</Link></DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Wishlist */}
              <Link href="/wishlist" className="touch-target flex items-center justify-center hidden sm:flex">
                <Button variant="ghost" className="text-white hover:bg-white/10 relative px-2 sm:px-3">
                  <Heart className="h-5 w-5" />
                  {wishlistItems > 0 && (
                    <span className="absolute -top-1 -left-1 bg-red-500 text-white text-[10px] sm:text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                      {wishlistItems}
                    </span>
                  )}
                </Button>
              </Link>
              {/* Cart */}
              <Link href="/cart" className="touch-target flex items-center justify-center">
                <Button variant="ghost" className="text-white hover:bg-white/10 relative px-2 sm:px-3">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems > 0 && (
                    <span className="absolute -top-1 -left-1 bg-accent text-white text-[10px] sm:text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                      {cartItems}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Sell Button - Desktop */}
              <Link href="/sell" className="hidden sm:block">
                <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100 text-sm px-3 sm:px-4">
                  التسجيل كبائع
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 md:hidden px-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mt-2 sm:mt-3 md:hidden">
            <div className="flex">
              <Input
                type="text"
                placeholder="ابحث عن منتجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-l-none rounded-r-lg text-sm h-10"
              />
              <Button type="submit" className="rounded-r-none rounded-l-lg bg-accent hover:bg-accent/90 px-3">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Navigation Bar - Desktop */}
      <nav className="bg-white border-b border-gray-200 hidden md:block">
        <div className="container-responsive">
          <div className="flex items-center gap-4 lg:gap-6 py-2 overflow-x-auto hide-scrollbar">
            <div
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button className="flex items-center gap-2 font-medium text-gray-700 hover:text-primary py-2 text-sm whitespace-nowrap">
                <Menu className="h-5 w-5" />
                <span>جميع الفئات</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {megaMenuOpen && (
                <div className="absolute top-full right-0 bg-white shadow-xl border border-gray-200 rounded-lg w-[min(700px,calc(100vw-2rem))] z-50">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 p-4 lg:p-6">
                    {categories.slice(0, 12).map((category) => (
                      <div key={category.id}>
                        <Link href={`/category/${category.slug}`} className="font-semibold text-gray-900 hover:text-primary block mb-2 text-sm">
                          {category.name}
                        </Link>
                        <ul className="space-y-1">
                          {category.subcategories.slice(0, 3).map((sub) => (
                            <li key={sub.id}>
                              <Link href={`/category/${category.slug}/${sub.slug}`} className="text-xs lg:text-sm text-gray-600 hover:text-primary block py-0.5">
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-3 lg:p-4 rounded-b-lg">
                    <Link href="/categories" className="text-primary font-medium hover:underline text-sm">
                      عرض جميع الفئات ←
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {[
              { href: "/deals", label: "عروض اليوم" },
              { href: "/category/electronics", label: "إلكترونيات" },
              { href: "/category/fashion", label: "أزياء" },
              { href: "/category/machinery", label: "آلات ومعدات" },
              { href: "/category/home-garden", label: "المنزل والحديقة" },
              { href: "/suppliers", label: "الموردون" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-700 hover:text-primary whitespace-nowrap text-sm py-2">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 bottom-0 top-[var(--header-height,120px)] bg-white z-40 overflow-y-auto overscroll-contain">
          <div className="container-responsive py-4 space-y-1">
            <div className="pb-3 mb-3 border-b border-gray-100">
              <Link href="/sell" className="block text-primary font-semibold py-3 text-base" onClick={() => setMobileMenuOpen(false)}>
                التسجيل كبائع
              </Link>
              <Link href="/deals" className="block text-gray-700 py-3 text-base" onClick={() => setMobileMenuOpen(false)}>
                عروض اليوم
              </Link>
              <Link href="/suppliers" className="block text-gray-700 py-3 text-base" onClick={() => setMobileMenuOpen(false)}>
                الموردون
              </Link>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2 text-base">الفئات</p>
              <div className="space-y-0">
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/category/${cat.slug}`} className="block text-gray-600 hover:text-primary py-3 text-sm border-b border-gray-50" onClick={() => setMobileMenuOpen(false)}>
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-gray-100 space-y-1">
              <Link href="/login" className="block text-gray-700 py-3 text-base" onClick={() => setMobileMenuOpen(false)}>تسجيل الدخول</Link>
              <Link href="/register" className="block text-gray-700 py-3 text-base" onClick={() => setMobileMenuOpen(false)}>إنشاء حساب</Link>
              <Link href="/cart" className="block text-gray-700 py-3 text-base" onClick={() => setMobileMenuOpen(false)}>سلة التسوق</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
