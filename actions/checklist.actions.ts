'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/database';

import { handleError } from '@/utils';
import { getCurrentUser } from '@/actions/user.actions';
import { CheckListSchema, CheckListItemSchema } from '@/schemas';

import type { CheckList, CheckListItem } from '@/types';

export const createCheckList = async (data: CheckList) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const { name } = CheckListSchema.parse(data);

    await prisma.checkList.create({
      data: {
        userId,
        name,
        items: undefined,
      },
    });

    return {
      success: true,
      message: 'Your list created successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const getCheckList = async () => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const checkList = await prisma.checkList.findUnique({
      where: { userId },
      select: { id: true, items: true, name: true, userId: true },
    });

    return {
      success: true,
      checkList: JSON.parse(JSON.stringify(checkList)),
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const updateCheckListName = async (data: CheckList) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const { name } = CheckListSchema.parse(data);

    await prisma.checkList.update({ where: { userId }, data: { name } });

    return {
      success: true,
      message: 'Your list name updated successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const removeCheckList = async (id: string) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    await prisma.checkList.delete({ where: { id, userId } });

    revalidatePath('/', 'layout');

    return { success: true, message: 'Checklist removed successfully.' };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const addCheckListItem = async (data: CheckListItem) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const { completed, name, checkListId } = CheckListItemSchema.parse(data);

    await prisma.checkListItem.create({
      data: { name, completed, checkListId },
    });

    revalidatePath('/', 'layout');

    return { success: true, message: 'Item added successfully.' };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const toggleCheckListItem = async (id: string) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const item = await prisma.checkListItem.findUnique({ where: { id } });

    await prisma.checkListItem.update({
      where: { id },
      data: { completed: !item?.completed },
    });

    revalidatePath('/', 'layout');

    return { success: true, message: 'Item status updated successfully.' };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const removeCheckListItem = async (id: string) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    await prisma.checkListItem.delete({ where: { id } });

    revalidatePath('/', 'layout');

    return { success: true, message: 'Item removed successfully.' };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};
