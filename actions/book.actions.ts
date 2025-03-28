'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { utapi } from '@/server/uploadthing';

import prisma from '@/database';

import { handleError } from '@/utils';
import { BookSchema, BookEntrySchema } from '@/schemas';
import { getCurrentUser } from '@/actions/user.actions';

import type { Prisma } from '@prisma/client';
import type { BookData, GetAllBooks, BookEntryData } from '@/types';

export const addBook = async (data: BookData) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const book = BookSchema.parse(data);

    await prisma.book.create({ data: { ...book, userId } });

    revalidatePath('/books');

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

export const getBook = async (id: string) => {
  const userId = await getCurrentUser();

  try {
    const book = await prisma.book.findFirst({
      where: {
        id,
        OR: [{ userId: userId as string }, { private: false }],
      },
    });

    if (!book) throw new Error('Book not found.');

    return {
      book: JSON.parse(JSON.stringify(book)),
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const getBooks = async (ids: string[]) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const books = await prisma.book.findMany({
      where: { userId, id: { in: ids } },
      select: {
        id: true,
        name: true,
        image: true,
        genre: true,
        author: true,
        publisher: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    if (!books) throw new Error('Books not found.');

    return {
      books: JSON.parse(JSON.stringify(books)),
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const getPublicBooks = async (ids: string[]) => {
  try {
    const books = await prisma.book.findMany({
      where: { id: { in: ids }, private: false },
      orderBy: { createdAt: 'desc' },
    });

    if (!books) throw new Error('Books not found.');

    return {
      books: JSON.parse(JSON.stringify(books)),
      success: true,
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
  category = 'all',
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
          {
            publisher: {
              contains: search,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
        ],
      }),
      ...(filter === 'completed' && { completed: true }),
      ...(filter === 'unread' && { completed: false }),
      ...(genre !== 'all' && { genre: { has: genre } }),
      ...(category !== 'all' && { category: category }),
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

export const getGenresAndCategories = async () => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const data = await prisma.book.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        genre: true,
        category: true,
      },
    });

    const uniqueGenres = [...new Set(data.flatMap((book) => book.genre))];

    const sortedGenres = uniqueGenres.sort((a, b) => a.localeCompare(b));

    const uniqueCategories = [
      ...new Set(
        data.map((book) => book.category).filter((c): c is string => c !== null)
      ),
    ];

    const sortedCategories = uniqueCategories.sort((a, b) =>
      a.localeCompare(b)
    );

    return {
      success: true,
      genres: sortedGenres,
      categories: sortedCategories,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const removeBook = async (id: string) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const book = await prisma.book.findUnique({ where: { userId, id } });

    if (!book) throw new Error('Book not found.');

    const bookCover = book.image?.split('/').pop();

    if (bookCover) await utapi.deleteFiles(bookCover);

    await prisma.book.delete({ where: { id: book.id } });

    redirect('/books');
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const updateBook = async (id: string, data: BookData) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const book = BookSchema.parse(data);

    await prisma.book.update({ where: { userId, id }, data: book });

    revalidatePath(`/books/${id}`);

    return {
      success: true,
      message: 'Book updated successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const getAllBooksForTBR = async () => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const books = await prisma.book.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      select: { id: true, name: true, favorite: true, completed: true },
    });
    return {
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

export const toggleFavorite = async (id: string) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  const book = await prisma.book.findUnique({ where: { id } });

  if (!book) throw new Error('Book not found.');

  await prisma.book.update({
    where: { id: book.id },
    data: { favorite: !book.favorite },
  });

  revalidatePath('/tbr-game');
};

export const toggleCompleted = async (id: string) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  const book = await prisma.book.findUnique({ where: { id } });

  if (!book) throw new Error('Book not found.');

  await prisma.book.update({
    where: { id },
    data: { completed: !book.completed },
  });

  revalidatePath('/tbr-game');
};

export const getPublicBook = async (id: string) => {
  try {
    const book = await prisma.book.findFirst({
      where: {
        id,
        private: false,
      },
    });

    if (!book) {
      throw new Error('Book is not public.');
    }

    return {
      book: JSON.parse(JSON.stringify(book)),
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const upsertBookEntry = async (data: BookEntryData) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  const { day, month, pagesRead } = BookEntrySchema.parse(data);

  const year = new Date().getFullYear();

  try {
    if (pagesRead === 0) {
      await prisma.bookEntry.deleteMany({
        where: {
          userId,
          day,
          month,
          year,
        },
      });
    } else {
      await prisma.bookEntry.upsert({
        where: {
          userId_day_month_year: {
            userId,
            day,
            month,
            year,
          },
        },
        update: {
          pagesRead,
        },
        create: {
          userId,
          day,
          month,
          year,
          pagesRead,
        },
      });
    }

    revalidatePath('/', 'layout');

    return {
      success: true,
      message:
        pagesRead === 0
          ? 'Book entry removed successfully.'
          : 'Book entry submitted successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const getBookEntries = async () => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const entries = await prisma.bookEntry.findMany({
      where: {
        userId,
        year: new Date().getFullYear(),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      entries: JSON.parse(JSON.stringify(entries)),
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const getBookReadThisYear = async () => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  const now = new Date();

  const startOfYear = new Date(now.getFullYear(), 0, 1);

  try {
    const books = await prisma.book.findMany({
      where: {
        userId,
      },
      orderBy: { endDate: 'desc' },
    });

    const booksReadThisYear = books.filter(
      (book) =>
        book.completed &&
        book.endDate &&
        book.endDate >= startOfYear &&
        book.endDate <= now
    );

    return {
      success: true,
      books: JSON.parse(JSON.stringify(booksReadThisYear)),
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};
