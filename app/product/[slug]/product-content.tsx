"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { getProductBySlug, getSupplierById } from "@/lib/data";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { showToast } from "@/components/toast-notification";
import { ShoppingCart, Heart, Star, Truck, ShieldCheck, ChevronLeft, Minus, Plus, CheckCircle, MessageCircle, PackageCheck, MapPin } from "lucide-react";

export default function ProductContent() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const supplier = product ? getSupplierById(product.supplierId) : null;
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlistStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(product?.moq || 1);

  if (!product) {
    return <div className="min-h-screen bg-background"><Header /><main className="shell product-not-found"><h1>المنتج غير موجود</h1><p>قد يكون الرابط قديمًا أو تم نقل المنتج.</p><Link href="/search">العودة إلى الاستكشاف</Link></main></div>;
  }

  const images = product.images?.length ? product.images : [product.image];
  const inWishlist = isInWishlist(product.id);
  const toggleWishlist = () => {
    if (inWishlist) { removeWishlist(product.id); showToast("wishlist", "تمت الإزالة من المفضلة"); }
    else { addWishlist(product); showToast("wishlist", "تمت الإضافة للمفضلة"); }
  };
  const handleAddToCart = () => { addItem(product, quantity); showToast("cart", `تمت إضافة ${quantity} ${product.unit} للسلة`); };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="shell product-page animate-fade-in">
        <div className="product-breadcrumb"><Link href="/">الرئيسية</Link><ChevronLeft className="h-3.5 w-3.5" /><Link href={`/category/${product.categoryId}`}>المنتجات</Link><ChevronLeft className="h-3.5 w-3.5" /><span>{product.name}</span></div>
        <div className="product-layout">
          <section className="product-gallery" aria-label="صور المنتج">
            <div className="product-gallery__main"><Image src={images[selectedImage]} alt={product.name} fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 55vw" /><button className={`product-gallery__favorite ${inWishlist ? "is-active" : ""}`} onClick={toggleWishlist} aria-label={inWishlist ? "إزالة من المفضلة" : "إضافة للمفضلة"}><Heart className="h-5 w-5" fill={inWishlist ? "currentColor" : "none"} /></button><div className="product-gallery__badge"><PackageCheck className="h-4 w-4" /> منتج موصى به</div></div>
            <div className="product-gallery__thumbs">{images.map((image, index) => <button key={image + index} onClick={() => setSelectedImage(index)} className={`product-gallery__thumb ${selectedImage === index ? "is-active" : ""}`} aria-label={`الصورة ${index + 1}`}><Image src={image} alt="" fill className="object-cover" /></button>)}</div>
          </section>
          <section className="product-info">
            <div className="product-info__eyebrow"><span>عرض جملة</span>{product.readyToShip ? <span className="product-info__status"><span /> جاهز للتجهيز</span> : null}</div>
            <h1>{product.name}</h1>
            <div className="product-info__rating"><span className="rating-stars"><Star className="h-4 w-4" fill="currentColor" /> {product.rating}</span><span>تقييم المشترين</span><i /> <span>{product.orders.toLocaleString("ar-YE")} طلب سابق</span></div>
            <div className="product-price-panel"><div><span className="product-price-panel__label">سعر القطعة بالجملة</span><div><strong>${product.priceMin.toFixed(2)}</strong><span>— ${product.priceMax.toFixed(2)} / {product.unit}</span></div></div><span className="product-price-panel__note">تدرّج سعري للكميات</span></div>
            <p className="product-description">{product.description}</p>
            <div className="product-facts"><div><span className="product-facts__icon"><PackageCheck className="h-4 w-4" /></span><span><small>الحد الأدنى</small><strong>{product.moq} {product.unit}</strong></span></div><div><span className="product-facts__icon"><Truck className="h-4 w-4" /></span><span><small>التجهيز</small><strong>{product.readyToShip ? "جاهز للشحن" : "حسب الطلب"}</strong></span></div><div><span className="product-facts__icon"><ShieldCheck className="h-4 w-4" /></span><span><small>الجودة</small><strong>مراجعة المورد</strong></span></div></div>
            <div className="purchase-panel"><div className="purchase-panel__head"><span>الكمية المطلوبة</span><small>ابدأ من {product.moq} {product.unit}</small></div><div className="purchase-panel__row"><div className="quantity-stepper"><button onClick={() => setQuantity(Math.max(product.moq, quantity - 1))} aria-label="تقليل الكمية"><Minus className="h-4 w-4" /></button><strong>{quantity}</strong><button onClick={() => setQuantity(quantity + 1)} aria-label="زيادة الكمية"><Plus className="h-4 w-4" /></button></div><span className="quantity-unit">{product.unit}</span><Button className="purchase-panel__add" onClick={handleAddToCart}><ShoppingCart className="h-4 w-4" /> أضف إلى السلة</Button><button className={`purchase-panel__wish ${inWishlist ? "is-active" : ""}`} onClick={toggleWishlist} aria-label="المفضلة"><Heart className="h-5 w-5" fill={inWishlist ? "currentColor" : "none"} /></button></div></div>
            {supplier ? <div className="supplier-panel"><div className="supplier-panel__avatar">{supplier.name.slice(0, 1)}</div><div className="supplier-panel__copy"><div><strong>{supplier.name}</strong>{supplier.verified ? <CheckCircle className="h-3.5 w-3.5 text-[#8d2941]" /> : null}</div><p><MapPin className="h-3 w-3" /> {supplier.country} <i /> {supplier.yearsInBusiness} سنوات خبرة</p></div><button className="supplier-panel__contact"><MessageCircle className="h-4 w-4" /> تواصل</button></div> : null}
          </section>
        </div>
        <section className="product-notes"><div><Truck className="h-5 w-5" /><span><strong>خيارات شحن مناسبة</strong><small>يحددها المورد حسب موقعك والكمية</small></span></div><div><ShieldCheck className="h-5 w-5" /><span><strong>تفاصيل واضحة</strong><small>الحد الأدنى والسعر أمامك قبل الطلب</small></span></div><div><PackageCheck className="h-5 w-5" /><span><strong>جاهز لنشاطك</strong><small>اطلب الكمية التي تناسب دورة عملك</small></span></div></section>
      </main>
    </div>
  );
}
