'use server';

import { auth } from '@clerk/nextjs/server';

import prisma from '@/database';

export const getCurrentUser = async (): Promise<string | null> => {
  const session = await auth();

  if (!session.userId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId: session.userId },
  });

  if (!user) return null;

  return user.id;
};
