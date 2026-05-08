import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, company, type } = body;

    // Validation
    const errors: string[] = [];
    if (!name || name.length < 2) errors.push('الاسم يجب أن يكون حرفين على الأقل');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('البريد الإلكتروني غير صحيح');
    if (!password || password.length < 8) errors.push('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
    if (phone && !/^[\+]?[0-9\s\-\(\)]{8,15}$/.test(phone)) errors.push('رقم الهاتف غير صحيح');

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, error: errors.join(', ') },
        { status: 400 }
      );
    }

    // In production, save to database
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      phone: phone || '',
      company: company || '',
      type: type || 'buyer',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: { user: newUser },
      message: 'تم إنشاء الحساب بنجاح',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'خطأ في الخادم' },
      { status: 500 }
    );
  }
}
