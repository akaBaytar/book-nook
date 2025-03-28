'use server';

import { revalidatePath } from 'next/cache';

import { z } from 'zod';

import prisma from '@/database';
import { handleError } from '@/utils';
import { TBRSchema } from '@/schemas';
import { getCurrentUser } from '@/actions/user.actions';

export const addTBR = async (data: z.infer<typeof TBRSchema>) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const tbr = TBRSchema.parse(data);

    await prisma.tbr.create({ data: { name: tbr.name, userId } });

    revalidatePath('/tbr-game');

    return {
      success: true,
      message: 'TBR added successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const getAllTBR = async () => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const TBRs = await prisma.tbr.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      TBRs: JSON.parse(JSON.stringify(TBRs)),
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const toggleTBRFavorite = async (id: string) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  const tbr = await prisma.tbr.findUnique({ where: { id } });

  if (!tbr) throw new Error('TBR not found.');

  await prisma.tbr.update({
    where: { id: tbr.id },
    data: { favorite: !tbr.favorite },
  });

  revalidatePath('/tbr-game');
};

export const toggleTBRCompleted = async (id: string) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  const tbr = await prisma.tbr.findUnique({ where: { id } });

  if (!tbr) throw new Error('TBR not found.');

  await prisma.tbr.update({
    where: { id },
    data: { completed: !tbr.completed },
  });

  revalidatePath('/tbr-game');
};

export const removeTBRs = async (ids: string[]) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const deletedTbr = await prisma.tbr.deleteMany({
      where: { id: { in: ids }, userId },
    });

    if (deletedTbr.count === 0) throw new Error('No matching TBRs found.');

    revalidatePath('/tbr-game');

    return { success: true, message: 'Selected TBRs removed successfully.' };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};
