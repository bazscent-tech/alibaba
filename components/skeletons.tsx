export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border">
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-4 skeleton w-3/4" />
        <div className="h-4 skeleton w-1/2" />
        <div className="h-6 skeleton w-1/3" />
        <div className="h-3 skeleton w-full" />
        <div className="h-3 skeleton w-2/3" />
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-4 text-center border">
      <div className="w-16 h-16 rounded-full skeleton mx-auto mb-3" />
      <div className="h-3 skeleton w-2/3 mx-auto" />
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-4 py-8">
      <div className="h-8 skeleton w-1/3" />
      <div className="h-4 skeleton w-1/2" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <div className="w-16 h-16 skeleton rounded" />
      <div className="flex-1 space-y-2">
        <div className="h-4 skeleton w-1/3" />
        <div className="h-3 skeleton w-1/2" />
      </div>
      <div className="h-8 w-20 skeleton rounded" />
    </div>
  );
}
