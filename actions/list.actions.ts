'use server';

import { revalidatePath } from 'next/cache';

import { Prisma } from '@prisma/client';

import prisma from '@/database';

import { handleError } from '@/utils';
import { ListSchema } from '@/schemas';
import { getCurrentUser } from '@/actions/user.actions';

import type { List } from '@/types';

export const getAllList = async (searchQuery = '', privacyFilter = 'all') => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const searchCondition = searchQuery
      ? {
          OR: [
            {
              name: {
                contains: searchQuery,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              description: {
                contains: searchQuery,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }
      : {};

    const privacyCondition =
      privacyFilter === 'all'
        ? {}
        : privacyFilter === 'public'
        ? { private: false }
        : { private: true };

    const lists = await prisma.list.findMany({
      where: {
        userId,
        ...searchCondition,
        ...privacyCondition,
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      count: lists.length,
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
    const list = await prisma.list.findFirst({
      where: {
        id,
        OR: [{ userId }, { private: false }],
      },
    });

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

export const getPublicList = async (id: string) => {
  try {
    const list = await prisma.list.findFirst({
      where: {
        id,
        private: false,
      },
    });

    if (!list) {
      throw new Error('List is not public.');
    }

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

export const removeList = async (id: string) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    await prisma.list.delete({ where: { id, userId } });

    revalidatePath('/my-lists');

    return { success: true, message: 'List removed successfully.' };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const updateList = async (data: List) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const listData = ListSchema.parse(data);

    await prisma.list.update({
      where: { userId, id: data.id },
      data: listData,
    });

    revalidatePath(`/my-lists/${data.id}`);

    return {
      success: true,
      message: 'Your list updated successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};
