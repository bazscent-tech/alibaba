import { categories } from "@/lib/data";
import CategoryContent from "./category-content";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default function CategoryPage() {
  return <CategoryContent />;
}
