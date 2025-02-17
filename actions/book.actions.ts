'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/database';

import { handleError } from '@/utils';
import { AddBookSchema } from '@/schemas';
import { getCurrentUser } from '@/actions/user.actions';

import type { AddBook } from '@/types';

export const addBook = async (data: AddBook) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const book = AddBookSchema.parse(data);

    await prisma.book.create({ data: { ...book, userId } });

    revalidatePath('/all-books');

    return {
      success: true,
      message: 'Book added successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const getAllBooks = async () => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const books = await prisma.book.findMany({ where: { userId } });

    const count = await prisma.book.count({ where: { userId } });

    return {
      count,
      success: true,
      books: JSON.parse(JSON.stringify(books)),
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const getBook = async () => {};
