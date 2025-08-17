'use server';

import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { users, type NewUser } from '@/lib/db/schema';
import { comparePasswords, hashPassword, setSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getUser } from '@/lib/db/queries';

// Action state type
export type ActionState = {
  error?: string;
  success?: string;
  [key: string]: any;
};

const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100)
});

export async function signIn(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const result = signInSchema.safeParse(data);

  if (!result.success) {
    return {
      error: 'Invalid form data',
      ...data
    };
  }

  const { email, password } = result.data;

  const userResult = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (userResult.length === 0) {
    return {
      error: 'Invalid email or password. Please try again.',
      email,
      password
    };
  }

  const foundUser = userResult[0];

  const isPasswordValid = await comparePasswords(
    password,
    foundUser.passwordHash
  );

  if (!isPasswordValid) {
    return {
      error: 'Invalid email or password. Please try again.',
      email,
      password
    };
  }

  await setSession(foundUser);
  redirect('/dashboard');
}

const signUpSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100)
});

export async function signUp(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const result = signUpSchema.safeParse(data);

  if (!result.success) {
    return {
      error: 'Invalid form data',
      ...data
    };
  }

  const { name, email, password } = result.data;

  // Check if user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return {
      error: 'A user with this email already exists.',
      name,
      email,
      password
    };
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

export async function updateAccount(state: ActionState, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const schema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().min(3).max(255)
  });
  
  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      error: 'Invalid form data',
      ...data
    };
  }

  const user = await getUser();
  if (!user) {
    return { error: 'Not authenticated' };
  }

  // Check if email is already taken by another user
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, result.data.email))
    .limit(1);

  if (existingUser.length > 0 && existingUser[0].id !== user.id) {
    return { error: 'Email is already taken' };
  }

  await db
    .update(users)
    .set({ name: result.data.name, email: result.data.email })
    .where(eq(users.id, user.id));

  return { success: 'Account updated successfully', name: result.data.name };
}

export async function updatePassword(state: ActionState, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const schema = z.object({
    currentPassword: z.string().min(8).max(100),
    newPassword: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100)
  });
  
  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      error: 'Invalid form data',
      ...data
    };
  }

  const user = await getUser();
  if (!user) {
    return { error: 'Not authenticated' };
  }

  if (result.data.newPassword !== result.data.confirmPassword) {
    return { error: 'New password and confirmation password do not match' };
  }

  const isCurrentPasswordValid = await comparePasswords(
    result.data.currentPassword,
    user.passwordHash
  );

  if (!isCurrentPasswordValid) {
    return { error: 'Current password is incorrect' };
  }

  await db
    .update(users)
    .set({ passwordHash: await hashPassword(result.data.newPassword) })
    .where(eq(users.id, user.id));

  return { success: 'Password updated successfully' };
}

export async function deleteAccount(state: ActionState, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const schema = z.object({
    password: z.string().min(8).max(100)
  });
  
  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      error: 'Invalid form data',
      ...data
    };
  }

  const user = await getUser();
  if (!user) {
    return { error: 'Not authenticated' };
  }

  const isPasswordValid = await comparePasswords(
    result.data.password,
    user.passwordHash
  );

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

export async function updateUser(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const schema = z.object({
    name: z.string().min(2).max(100).optional(),
    email: z.string().email().min(3).max(255).optional(),
    currentPassword: z.string().min(8).max(100).optional(),
    newPassword: z.string().min(8).max(100).optional()
  });
  
  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      error: 'Invalid form data',
      ...data
    };
  }

  const user = await getUser();
  if (!user) {
    return { error: 'Not authenticated' };
  }

  const updates: Partial<NewUser> = {};

  if (result.data.name) {
    updates.name = result.data.name;
  }

  if (result.data.email) {
    // Check if email is already taken by another user
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, result.data.email))
      .limit(1);

    if (existingUser.length > 0 && existingUser[0].id !== user.id) {
      return { error: 'Email is already taken' };
    }
    updates.email = result.data.email;
  }

  if (result.data.currentPassword && result.data.newPassword) {
    const isCurrentPasswordValid = await comparePasswords(
      result.data.currentPassword,
      user.passwordHash
    );

    if (!isCurrentPasswordValid) {
      return { error: 'Current password is incorrect' };
    }

    updates.passwordHash = await hashPassword(result.data.newPassword);
  }

  if (Object.keys(updates).length > 0) {
    await db
      .update(users)
      .set(updates)
      .where(eq(users.id, user.id));
  }

  return { success: true };
}

export async function deleteUser(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const schema = z.object({
    password: z.string().min(8).max(100)
  });
  
  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      error: 'Invalid form data',
      ...data
    };
  }

  const user = await getUser();
  if (!user) {
    return { error: 'Not authenticated' };
  }

  const isPasswordValid = await comparePasswords(
    result.data.password,
    user.passwordHash
  );

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
