'use server';

import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { users, type NewUser } from '@/lib/db/schema';
import { comparePasswords, hashPassword, setSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getUser } from '@/lib/db/queries';

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const userResult = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (userResult.length === 0) {
    return { error: 'Invalid email or password' };
  }

  const foundUser = userResult[0];
  const isPasswordValid = await comparePasswords(password, foundUser.passwordHash);

  if (!isPasswordValid) {
    return { error: 'Invalid email or password' };
  }

  await setSession(foundUser);
  redirect('/dashboard');
}

export async function signUp(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !password) {
    return { error: 'All fields are required' };
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { error: 'A user with this email already exists' };
  }

  const hashedPassword = await hashPassword(password);
  const newUser: NewUser = {
    name,
    email,
    passwordHash: hashedPassword,
    role: 'student'
  };

  const [createdUser] = await db.insert(users).values(newUser).returning();
  await setSession(createdUser);
  redirect('/dashboard');
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/');
}

export async function updateAccount(formData: FormData) {
  const user = await getUser();
  if (!user) {
    return { error: 'Not authenticated' };
  }

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  if (!name || !email) {
    return { error: 'Name and email are required' };
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0 && existingUser[0].id !== user.id) {
    return { error: 'Email is already taken' };
  }

  await db
    .update(users)
    .set({ name, email })
    .where(eq(users.id, user.id));

  return { success: 'Account updated successfully' };
}

export async function updatePassword(formData: FormData) {
  const user = await getUser();
  if (!user) {
    return { error: 'Not authenticated' };
  }

  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: 'All password fields are required' };
  }

  if (newPassword !== confirmPassword) {
    return { error: 'New passwords do not match' };
  }

  const isCurrentPasswordValid = await comparePasswords(currentPassword, user.passwordHash);
  if (!isCurrentPasswordValid) {
    return { error: 'Current password is incorrect' };
  }

  await db
    .update(users)
    .set({ passwordHash: await hashPassword(newPassword) })
    .where(eq(users.id, user.id));

  return { success: 'Password updated successfully' };
}

export async function deleteAccount(formData: FormData) {
  const user = await getUser();
  if (!user) {
    return { error: 'Not authenticated' };
  }

  const password = formData.get('password') as string;
  if (!password) {
    return { error: 'Password is required' };
  }

  const isPasswordValid = await comparePasswords(password, user.passwordHash);
  if (!isPasswordValid) {
    return { error: 'Password is incorrect' };
  }

  await db
    .update(users)
    .set({ deletedAt: new Date() })
    .where(eq(users.id, user.id));

  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/');
}
