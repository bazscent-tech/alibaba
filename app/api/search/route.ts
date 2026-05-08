import { NextResponse } from 'next/server';
import { searchProducts, categories } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  if (!query || query.length < 2) {
    return NextResponse.json({
      success: true,
      data: { products: [], suggestions: [] },
    });
  }

  const products = searchProducts(query);
  
  // Generate suggestions
  const suggestions = categories
    .filter(c => c.name.includes(query) || c.subcategories.some(s => s.name.includes(query)))
    .map(c => ({ id: c.id, name: c.name, type: 'category' }))
    .slice(0, 5);

  return NextResponse.json({
    success: true,
    data: {
      products: products.slice(0, 20),
      suggestions,
      total: products.length,
    },
  });
}
