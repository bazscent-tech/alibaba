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
import { useCartStore, useUserStore } from "@/lib/store";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const router = useRouter();
  const cartItems = useCartStore((state) => state.getTotalItems());
  const { isLoggedIn, user, logout } = useUserStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+966 50 123 4567</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              <span>دعم فني على مدار الساعة</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors">
                <Globe className="h-4 w-4" />
                <span>العربية</span>
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>العربية</DropdownMenuItem>
                <DropdownMenuItem>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-gray-400">|</span>
            <span>USD $</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="bg-white rounded-lg p-2">
                <span className="text-primary font-bold text-xl">علي</span>
              </div>
              <div className="hidden sm:block text-white">
                <span className="font-bold text-xl">ماركت</span>
                <span className="block text-xs opacity-80">
                  B2B التجارة الإلكترونية
                </span>
              </div>
            </Link>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex-1 max-w-2xl hidden md:flex"
            >
              <div className="flex w-full">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      className="rounded-l-none rounded-r-lg bg-gray-100 border-l border-gray-300 hover:bg-gray-200 text-gray-700"
                    >
                      جميع الفئات
                      <ChevronDown className="h-4 w-4 mr-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
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
                  className="rounded-none border-y border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  type="submit"
                  className="rounded-r-none rounded-l-lg bg-accent hover:bg-accent/90"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* User */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 flex items-center gap-2"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden lg:inline">
                      {isLoggedIn ? user?.name : "حسابي"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {isLoggedIn ? (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/account">لوحة التحكم</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/orders">طلباتي</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout}>
                        تسجيل الخروج
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/login">تسجيل الدخول</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/register">إنشاء حساب</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart */}
              <Link href="/cart">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems > 0 && (
                    <span className="absolute -top-1 -left-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Sell Button */}
              <Link href="/sell" className="hidden sm:block">
                <Button
                  variant="secondary"
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  التسجيل كبائع
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mt-3 md:hidden">
            <div className="flex">
              <Input
                type="text"
                placeholder="ابحث عن منتجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-l-none rounded-r-lg"
              />
              <Button
                type="submit"
                className="rounded-r-none rounded-l-lg bg-accent hover:bg-accent/90"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 py-2 overflow-x-auto">
            {/* Categories Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button className="flex items-center gap-2 font-medium text-gray-700 hover:text-primary py-2">
                <Menu className="h-5 w-5" />
                <span>جميع الفئات</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Mega Menu Dropdown */}
              {megaMenuOpen && (
                <div className="absolute top-full right-0 bg-white shadow-xl border border-gray-200 rounded-lg w-[700px] z-50">
                  <div className="grid grid-cols-3 gap-4 p-6">
                    {categories.slice(0, 12).map((category) => (
                      <div key={category.id}>
                        <Link
                          href={`/category/${category.slug}`}
                          className="font-semibold text-gray-900 hover:text-primary block mb-2"
                        >
                          {category.name}
                        </Link>
                        <ul className="space-y-1">
                          {category.subcategories.slice(0, 3).map((sub) => (
                            <li key={sub.id}>
                              <Link
                                href={`/category/${category.slug}/${sub.slug}`}
                                className="text-sm text-gray-600 hover:text-primary"
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-4 rounded-b-lg">
                    <Link
                      href="/categories"
                      className="text-primary font-medium hover:underline"
                    >
                      عرض جميع الفئات ←
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <Link
              href="/deals"
              className="text-gray-700 hover:text-primary whitespace-nowrap"
            >
              عروض اليوم
            </Link>
            <Link
              href="/category/electronics"
              className="text-gray-700 hover:text-primary whitespace-nowrap"
            >
              إلكترونيات
            </Link>
            <Link
              href="/category/fashion"
              className="text-gray-700 hover:text-primary whitespace-nowrap"
            >
              أزياء
            </Link>
            <Link
              href="/category/machinery"
              className="text-gray-700 hover:text-primary whitespace-nowrap"
            >
              آلات ومعدات
            </Link>
            <Link
              href="/category/home-garden"
              className="text-gray-700 hover:text-primary whitespace-nowrap"
            >
              المنزل والحديقة
            </Link>
            <Link
              href="/suppliers"
              className="text-gray-700 hover:text-primary whitespace-nowrap"
            >
              الموردون
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/sell"
              className="block text-primary font-semibold py-2"
            >
              التسجيل كبائع
            </Link>
            <div className="border-t border-gray-200 pt-4">
              <p className="font-semibold text-gray-900 mb-2">الفئات</p>
              <div className="space-y-2">
                {categories.slice(0, 8).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="block text-gray-600 hover:text-primary py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
