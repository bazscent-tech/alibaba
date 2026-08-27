"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Compass, ShoppingBag, UserRound } from "lucide-react";
import { useCartStore } from "@/lib/store";

const items = [
  { href: "/", label: "الرئيسية", icon: Home },
  { href: "/categories", label: "الأقسام", icon: LayoutGrid },
  { href: "/search", label: "استكشاف", icon: Compass },
  { href: "/cart", label: "السلة", icon: ShoppingBag, badge: "cart" },
  { href: "/account", label: "حسابي", icon: UserRound },
];

export function BottomNav() {
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.getTotalItems());

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="bottom-nav" aria-label="التنقل الرئيسي">
      <div className="bottom-nav__inner">
        {items.map(({ href, label, icon: Icon, badge }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          const count = badge === "cart" ? cartItems : 0;
          return (
            <Link
              key={href}
              href={href}
              className={`bottom-nav__item ${active ? "is-active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <span className="bottom-nav__icon">
                <Icon className="h-[19px] w-[19px]" strokeWidth={active ? 2.5 : 1.9} />
                {badge && count > 0 ? <span className="bottom-nav__badge">{count > 99 ? "99+" : count}</span> : null}
              </span>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
