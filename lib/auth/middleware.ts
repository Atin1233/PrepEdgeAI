import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/db/queries';

export async function middleware(request: NextRequest) {
  const user = await getUser();

  // If user is not authenticated and trying to access protected routes
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // If user is authenticated and trying to access auth pages
  if (user && (request.nextUrl.pathname.startsWith('/sign-in') || request.nextUrl.pathname.startsWith('/sign-up'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up']
};

// Validation middleware for server actions
export function validatedAction<T>(
  schema: any,
  handler: (data: T, formData?: FormData) => Promise<any>
) {
  return async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const result = schema.safeParse(data);

    if (!result.success) {
      return {
        error: 'Invalid form data',
        ...data
      };
    }

    return handler(result.data, formData);
  };
}
