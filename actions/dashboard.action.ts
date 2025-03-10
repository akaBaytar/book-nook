'use server';

import prisma from '@/database';

import { handleError } from '@/utils';
import { getCurrentUser } from '@/actions/user.actions';
import { revalidatePath } from 'next/cache';

const calculateReadingStreak = async () => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  const today = new Date();

  const entries = await prisma.bookEntry.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  if (!entries.length) return { currentStreak: 0, personalBest: 0 };

  const dateMap = new Map<string, boolean>();
  entries.forEach((entry) => {
    const dateKey = `${entry.year}-${entry.month}-${entry.day}`;
    dateMap.set(dateKey, true);
  });

  let currentStreak = 0;

  const checkDate = new Date(today);

  const todayKey = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  const hasReadToday = dateMap.has(todayKey);

  if (!hasReadToday) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const dateKey = `${checkDate.getFullYear()}-${
      checkDate.getMonth() + 1
    }-${checkDate.getDate()}`;

    if (dateMap.has(dateKey)) {
      currentStreak++;

      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  let personalBest = currentStreak;

  const allDates = Array.from(dateMap.keys()).sort();

  for (let i = 0; i < allDates.length; i++) {
    let tempStreak = 1;

    const [year, month, day] = allDates[i].split('-').map(Number);

    let currentDate = new Date(year, month - 1, day);

    for (let j = i + 1; j < allDates.length; j++) {
      const [nextYear, nextMonth, nextDay] = allDates[j].split('-').map(Number);

      const nextDate = new Date(nextYear, nextMonth - 1, nextDay);

      const diffDays = Math.floor(
        (nextDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
      );

      if (diffDays === 1) {
        tempStreak++;

        currentDate = nextDate;
      } else {
        break;
      }
    }

    if (tempStreak > personalBest) {
      personalBest = tempStreak;
    }
  }

  return { currentStreak, personalBest };
};

export const getBookStats = async () => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    const books = await prisma.book.findMany({
      where: {
        userId,
      },
    });

    const totalBooks = books.length;

    const booksRead = books.filter((book) => book.completed).length;

    const booksRemaining = totalBooks - booksRead;

    const user = (await prisma.user.findUnique({
      where: { id: userId },
      select: { readingGoal: true },
    })) || {
      readingGoal: 0,
    };

    const currentlyReadingBook = books.find(
      (book) => book.readingNow && !book.completed
    );

    const now = new Date();

    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const booksReadThisYear = books.filter(
      (book) =>
        book.completed &&
        book.endDate &&
        book.endDate >= startOfYear &&
        book.endDate <= now
    ).length;

    const booksReadThisMonth = books.filter(
      (book) =>
        book.completed &&
        book.endDate &&
        book.endDate >= startOfMonth &&
        book.endDate <= now
    ).length;

    const monthlyBooksCompleted = books.filter(
      (book) =>
        book.completed &&
        book.endDate &&
        book.endDate >= startOfMonth &&
        book.endDate <= now
    );

    const goalProgress =
      user.readingGoal > 0
        ? Math.round((booksReadThisYear / user.readingGoal) * 100)
        : 0;

    const monthlyTotalBooks = monthlyBooksCompleted.length;

    const monthlyPagesRead = monthlyBooksCompleted.reduce(
      (sum, entry) => sum + entry.pageCount,
      0
    );

    const yearlyEntries = await prisma.bookEntry.findMany({
      where: {
        userId,
        year: now.getFullYear(),
      },
    });

    const yearlyPagesRead = yearlyEntries.reduce(
      (sum, entry) => sum + entry.pagesRead,
      0
    );

    const streak = await calculateReadingStreak();

    const startOfWeek = new Date();

    startOfWeek.setDate(now.getDate() - now.getDay() + 1);

    const weeklyEntries = await prisma.bookEntry.findMany({
      where: {
        userId,
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: {
          gte: startOfWeek.getDate(),
          lte: now.getDate(),
        },
      },
    });

    const dayCount = weeklyEntries.length || 1;

    const totalPagesThisWeek = weeklyEntries.reduce(
      (sum, entry) => sum + entry.pagesRead,
      0
    );

    const dailyAveragePages = Math.round(totalPagesThisWeek / dayCount);

    return {
      success: true,
      totalBooks,
      booksRead,
      readingGoal: user.readingGoal,
      goalProgress,
      booksRemaining,
      booksReadThisYear,
      booksReadThisMonth,
      currentlyReading: {
        book: currentlyReadingBook
          ? {
              id: currentlyReadingBook.id,
              name: currentlyReadingBook.name,
              author: currentlyReadingBook.author,
              publisher: currentlyReadingBook.publisher,
              image: currentlyReadingBook.image || '/placeholder.jpg',
            }
          : null,
      },
      monthlyProgress: {
        count: monthlyTotalBooks,
        pagesRead: monthlyPagesRead,
      },
      yearlyProgress: {
        count: booksReadThisYear,
        pagesRead: yearlyPagesRead,
      },
      readingStreak: {
        currentStreak: streak.currentStreak,
        personalBest: streak.personalBest,
      },
      dailyAverage: {
        pages: dailyAveragePages,
        period: totalPagesThisWeek,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};

export const updateReadingGoal = async (readingGoal: number) => {
  const userId = await getCurrentUser();

  if (!userId) throw new Error('User is not authenticated.');

  try {
    await prisma.user.update({ where: { id: userId }, data: { readingGoal } });

    revalidatePath('/dashboard');

    return {
      success: true,
      message: 'Your reading goal updated successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message: handleError(error),
    };
  }
};
