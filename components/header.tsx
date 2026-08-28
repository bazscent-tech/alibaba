"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, UserRound, ChevronDown, Globe2, Heart, Sparkles } from "lucide-react";
import { useCartStore, useUserStore, useWishlistStore } from "@/lib/store";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const cartItems = useCartStore((state) => state.getTotalItems());
  const wishlistItems = useWishlistStore((state) => state.items.length);
  const { isLoggedIn, user, logout } = useUserStore();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      router.push("/search");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="site-header">
      <div className="header-utility">
        <div className="shell header-utility__inner">
          <span className="header-utility__note"><Sparkles className="h-3.5 w-3.5" /> سوق جملة أبسط، أذكى، وأسرع</span>
          <div className="header-utility__links">
            <span>تسوق بثقة</span>
            <span className="header-dot" />
            <details className="header-dropdown header-language-dropdown">
              <summary className="header-language-trigger"><Globe2 className="h-3.5 w-3.5" /> العربية <ChevronDown className="h-3 w-3" /></summary>
              <div className="header-dropdown__menu" role="menu">
                <button type="button" className="header-dropdown__item is-current" role="menuitem" disabled>العربية (الحالية)</button>
              </div>
            </details>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="shell header-main__inner">
          <Link href="/" className="brand" aria-label="شبام جملة - الرئيسية">
            <span className="brand__mark">ش</span>
            <span className="brand__copy"><strong>شبام</strong><small>سوق الجملة</small></span>
          </Link>

          <form onSubmit={handleSearch} className="header-search">
            <Search className="header-search__icon" />
            <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="ابحث عن منتج أو مورد..." aria-label="البحث عن منتج أو مورد" />
            <button type="submit">بحث</button>
          </form>

          <div className="header-actions">
            <Link href="/wishlist" className="header-action" aria-label="المفضلة">
              <span className="header-action__icon"><Heart className="h-[19px] w-[19px]" />{wishlistItems > 0 ? <b>{wishlistItems}</b> : null}</span>
              <span className="header-action__label">المفضلة</span>
            </Link>
            <Link href="/cart" className="header-action" aria-label="السلة">
              <span className="header-action__icon"><ShoppingBag className="h-[19px] w-[19px]" />{cartItems > 0 ? <b>{cartItems > 99 ? "99+" : cartItems}</b> : null}</span>
              <span className="header-action__label">السلة</span>
            </Link>
            <details className="header-dropdown header-account-dropdown">
              <summary className="header-action" aria-label="الحساب">
                <span className="header-action__icon"><UserRound className="h-[19px] w-[19px]" /></span>
                <span className="header-action__label">{isLoggedIn ? user?.name || "حسابي" : "حسابي"}</span>
              </summary>
              <div className="header-dropdown__menu" role="menu">
                {isLoggedIn ? (
                  <>
                    <Link href="/account" className="header-dropdown__item" role="menuitem">حسابي</Link>
                    <Link href="/orders" className="header-dropdown__item" role="menuitem">طلباتي</Link>
                    <button type="button" className="header-dropdown__item is-danger" role="menuitem" onClick={logout}>تسجيل الخروج</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="header-dropdown__item" role="menuitem">تسجيل الدخول</Link>
                    <Link href="/register" className="header-dropdown__item" role="menuitem">إنشاء حساب</Link>
                  </>
                )}
              </div>
            </details>
            <Link href="/account" className="header-sell">سجّل كتاجر <span>↗</span></Link>
          </div>
        </div>
      </div>

      <nav className="desktop-nav" aria-label="روابط الموقع">
        <div className="shell desktop-nav__inner">
          <Link href="/categories" className="desktop-nav__category"><span className="category-grid-icon"><i /><i /><i /><i /></span> جميع الأقسام <ChevronDown className="h-4 w-4" /></Link>
          <div className="desktop-nav__links">
            <Link href="/deals">العروض اليومية <span className="nav-hot">جديد</span></Link>
            <Link href="/category/electronics">إلكترونيات</Link>
            <Link href="/category/fashion">أزياء</Link>
            <Link href="/category/machinery">آلات ومعدات</Link>
            <Link href="/category/home-garden">المنزل والحديقة</Link>
            <Link href="/suppliers">الموردون</Link>
          </div>
          <span className="desktop-nav__meta">50+ موردًا موثوقًا</span>
        </div>
      </nav>
    </header>
  );
}
