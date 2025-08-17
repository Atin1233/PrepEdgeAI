import { NextResponse } from 'next/server';
import { getUser } from '@/lib/db/queries';

export async function GET() {
  try {
    const user = await getUser();
    
    if (!user) {
      return NextResponse.json({ user: null });
    }

    // Return user data without sensitive information
    const { passwordHash, ...safeUser } = user;
    
    return NextResponse.json({ user: safeUser });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ user: null });
  }
}
