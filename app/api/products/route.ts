import { NextResponse } from 'next/server';
import { products, searchProducts, filterProducts } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const sort = searchParams.get('sort') || 'featured';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  let result = [...products];

  // Search filter
  if (query) {
    result = searchProducts(query);
  }

  // Category filter
  if (category) {
    result = result.filter(p => p.categoryId === category);
  }

  // Price filter
  if (minPrice) {
    result = result.filter(p => p.priceMin >= Number(minPrice));
  }
  if (maxPrice) {
    result = result.filter(p => p.priceMax <= Number(maxPrice));
  }

  // Sorting
  switch (sort) {
    case 'price-asc':
      result.sort((a, b) => a.priceMin - b.priceMin);
      break;
    case 'price-desc':
      result.sort((a, b) => b.priceMin - a.priceMin);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'orders':
      result.sort((a, b) => b.orders - a.orders);
      break;
  }

  // Pagination
  const total = result.length;
  const start = (page - 1) * limit;
  const paginated = result.slice(start, start + limit);

  return NextResponse.json({
    success: true,
    data: paginated,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
