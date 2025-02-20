'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/database';

import { handleError } from '@/utils';
import { ListSchema } from '@/schemas';
import { getCurrentUser } from '@/actions/user.actions';

import type { List } from '@/types';

export const getAllList = async () => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const lists = await prisma.list.findMany({ where: { userId } });

    return {
      success: true,
      lists: JSON.parse(JSON.stringify(lists)),
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const createList = async (data: List) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const listData = ListSchema.parse(data);

    await prisma.list.create({ data: { ...listData, userId } });

    revalidatePath('/my-lists', 'page');

    return {
      success: true,
      message: 'List created successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const getList = async (id: string) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const list = await prisma.list.findUnique({ where: { userId, id } });

    if (!list) throw new Error('List not found.');

    return {
      list: JSON.parse(JSON.stringify(list)),
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};
