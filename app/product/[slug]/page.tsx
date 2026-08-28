import type { Metadata } from "next";
import { getProductBySlug, products } from "@/lib/data";
import ProductContent from "./product-content";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "المنتج غير موجود | شبام جملة" };
  return {
    title: `${product.name} بالجملة | شبام جملة`,
    description: `${product.description} الحد الأدنى للطلب: ${product.moq} ${product.unit}.`,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${product.name} بالجملة | شبام جملة`,
      description: `اطلب ${product.name} بالجملة من مورد موثوق عبر شبام جملة. الحد الأدنى: ${product.moq} ${product.unit}.`,
      type: "website",
      locale: "ar_YE",
      images: [{ url: product.image, width: 1200, height: 1200, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} بالجملة | شبام جملة`,
      description: `منتج جملة من شبام جملة — الحد الأدنى للطلب ${product.moq} ${product.unit}.`,
      images: [product.image],
    },
  };
}

export default function ProductPage() {
  return <ProductContent />;
}
