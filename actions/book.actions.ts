'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/database';

import { handleError } from '@/utils';
import { AddBookSchema } from '@/schemas';
import { getCurrentUser } from '@/actions/user.actions';

import type { Prisma } from '@prisma/client';
import type { AddBook, GetAllBooks } from '@/types';

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

export const getAllBooks = async ({
  search = '',
  filter = 'all',
  sortBy = 'recent',
  genre = 'all',
  page = 1,
  limit = 9,
}: GetAllBooks = {}) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const whereConditions: Prisma.BookWhereInput = {
      userId,
      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
          {
            author: {
              contains: search,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
        ],
      }),
      ...(filter === 'completed' && { completed: true }),
      ...(filter === 'unread' && { completed: false }),
      ...(genre !== 'all' && { genre: { has: genre } }),
    };

    const orderBy: Prisma.BookOrderByWithRelationInput = (() => {
      switch (sortBy) {
        case 'oldest':
          return { createdAt: 'asc' };
        case 'name':
          return { name: 'asc' };
        case 'author':
          return { author: 'asc' };
        default:
          return { createdAt: 'desc' };
      }
    })();

    const skip = (page - 1) * limit;

    const [books, count] = await Promise.all([
      prisma.book.findMany({
        where: whereConditions,
        orderBy,
        skip,
        take: limit,
      }),

      prisma.book.count({
        where: whereConditions,
      }),
    ]);

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

export const getAllGenres = async () => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const genres = await prisma.book.findMany({
      where: { userId },
      select: {
        genre: true,
      },
    });

    const uniqueGenres = [...new Set(genres.flatMap((book) => book.genre))];

    const sortedGenres = uniqueGenres.sort((a, b) => a.localeCompare(b));

    return {
      success: true,
      genres: sortedGenres,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};
