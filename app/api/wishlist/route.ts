import { NextResponse } from 'next/server';
import { products } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids')?.split(',') || [];

  const wishlistProducts = products.filter(p => ids.includes(p.id));

  return NextResponse.json({
    success: true,
    data: wishlistProducts,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, action } = body;

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'معرف المنتج مطلوب' },
        { status: 400 }
      );
    }

    const product = products.find(p => p.id === productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'المنتج غير موجود' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: action === 'add' ? 'تمت الإضافة للمفضلة' : 'تمت الإزالة من المفضلة',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'خطأ في الخادم' },
      { status: 500 }
    );
  }
}
