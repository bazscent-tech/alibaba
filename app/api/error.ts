import { NextResponse } from 'next/server';

export function errorHandler(error: unknown) {
  console.error('API Error:', error);
  
  if (error instanceof Error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: false, error: 'خطأ غير متوقع' },
    { status: 500 }
  );
}
