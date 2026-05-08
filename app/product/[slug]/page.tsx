import { products } from "@/lib/data";
import ProductContent from "./product-content";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductPage() {
  return <ProductContent />;
}
