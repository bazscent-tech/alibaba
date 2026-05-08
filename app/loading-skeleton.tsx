import { ProductCardSkeleton, CategoryCardSkeleton } from "@/components/skeletons";

export function HomePageSkeleton() {
  return (
    <div className="container-responsive section-padding space-y-8">
      {/* Hero Skeleton */}
      <div className="aspect-[16/6] skeleton rounded-xl" />
      
      {/* Categories Grid Skeleton */}
      <div>
        <div className="h-6 skeleton w-1/4 mb-4" />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div>
        <div className="h-6 skeleton w-1/3 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
