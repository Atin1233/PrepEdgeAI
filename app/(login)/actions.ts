'use server';

import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { users, type NewUser } from '@/lib/db/schema';
import { comparePasswords, hashPassword, setSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getUser } from '@/lib/db/queries';

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

// Action state type
export type ActionState = {
  error?: string;
  success?: string;
  [key: string]: any;
};

// Updated validation middleware for useActionState
export function validatedActionWithState<T>(
  schema: any,
  handler: (data: T) => Promise<ActionState>
) {
  return async (state: ActionState, formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const result = schema.safeParse(data);

    if (!result.success) {
      return {
        error: 'Invalid form data',
        ...data
      };
    }

    return handler(result.data);
  };
}

const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100)
});

export const signIn = validatedAction(signInSchema, async (data) => {
  const { email, password } = data;

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
});

const signUpSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100)
});

export const signUp = validatedAction(signUpSchema, async (data) => {
  const { name, email, password } = data;

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
});

export const signOut = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/');
};

export const updateAccount = validatedActionWithState(
  z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().min(3).max(255)
  }),
  async (data) => {
    const user = await getUser();
    if (!user) {
      return { error: 'Not authenticated' };
    }

    // Check if email is already taken by another user
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email))
      .limit(1);

    if (existingUser.length > 0 && existingUser[0].id !== user.id) {
      return { error: 'Email is already taken' };
    }

    await db
      .update(users)
      .set({ name: data.name, email: data.email })
      .where(eq(users.id, user.id));

    return { success: 'Account updated successfully', name: data.name };
  }
);

export const updatePassword = validatedActionWithState(
  z.object({
    currentPassword: z.string().min(8).max(100),
    newPassword: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100)
  }),
  async (data) => {
    const user = await getUser();
    if (!user) {
      return { error: 'Not authenticated' };
    }

    if (data.newPassword !== data.confirmPassword) {
      return { error: 'New password and confirmation password do not match' };
    }

    const isCurrentPasswordValid = await comparePasswords(
      data.currentPassword,
      user.passwordHash
    );

    if (!isCurrentPasswordValid) {
      return { error: 'Current password is incorrect' };
    }

    await db
      .update(users)
      .set({ passwordHash: await hashPassword(data.newPassword) })
      .where(eq(users.id, user.id));

    return { success: 'Password updated successfully' };
  }
);

export const deleteAccount = validatedActionWithState(
  z.object({
    password: z.string().min(8).max(100)
  }),
  async (data) => {
    const user = await getUser();
    if (!user) {
      return { error: 'Not authenticated' };
    }

    const isPasswordValid = await comparePasswords(
      data.password,
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
);

export const updateUser = validatedAction(
  z.object({
    name: z.string().min(2).max(100).optional(),
    email: z.string().email().min(3).max(255).optional(),
    currentPassword: z.string().min(8).max(100).optional(),
    newPassword: z.string().min(8).max(100).optional()
  }),
  async (data) => {
    const user = await getUser();
    if (!user) {
      return { error: 'Not authenticated' };
    }

    const updates: Partial<NewUser> = {};

    if (data.name) {
      updates.name = data.name;
    }

    if (data.email) {
      // Check if email is already taken by another user
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, data.email))
        .limit(1);

      if (existingUser.length > 0 && existingUser[0].id !== user.id) {
        return { error: 'Email is already taken' };
      }
      updates.email = data.email;
    }

    if (data.currentPassword && data.newPassword) {
      const isCurrentPasswordValid = await comparePasswords(
        data.currentPassword,
        user.passwordHash
      );

      if (!isCurrentPasswordValid) {
        return { error: 'Current password is incorrect' };
      }

      updates.passwordHash = await hashPassword(data.newPassword);
    }

    if (Object.keys(updates).length > 0) {
      await db
        .update(users)
        .set(updates)
        .where(eq(users.id, user.id));
    }

    return { success: true };
  }
);

export const deleteUser = validatedAction(
  z.object({
    password: z.string().min(8).max(100)
  }),
  async (data) => {
    const user = await getUser();
    if (!user) {
      return { error: 'Not authenticated' };
    }

    const isPasswordValid = await comparePasswords(
      data.password,
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
);
