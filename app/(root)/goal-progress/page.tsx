import { PickaxeIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

import BookCard from '@/components/shared/book-card';

import { getBookReadThisYear } from '@/actions/book.actions';

import type { Book } from '@/types';
import { getBookStats } from '@/actions/dashboard.action';

const GoalProgressPage = async () => {
  const { books } = await getBookReadThisYear();
  const { booksReadThisYear, readingGoal } = await getBookStats();

  const percentage =
    booksReadThisYear && readingGoal
      ? Number(((booksReadThisYear / readingGoal) * 100).toFixed(2))
      : 0;

  return (
    <section className='space-y-5 bg-sidebar border rounded-md p-4 min-h-[calc(100vh-2rem)]'>
      <div className='flex flex-col gap-5'>
        <header className='flex gap-2.5 items-center justify-between'>
          <h1 className='flex items-center gap-2 text-2xl tracking-[0.015em]'>
            <PickaxeIcon className='size-5' />
            Goal Progress
          </h1>
          {percentage > 0 && (
            <div className='flex items-center gap-2.5'>
              <span className='flex items-center gap-1'>
                {booksReadThisYear}/{readingGoal}
                <span className='hidden sm:flex lg:hidden xl:flex'>completed</span>
              </span>
              <Badge variant='outline'>{percentage} %</Badge>
            </div>
          )}
        </header>
      </div>
      <div className='grid gap-5 xl:grid-cols-2 2xl:grid-cols-3'>
        {books.length === 0 ? (
          <div className='col-span-full'>
            <Alert>
              <AlertDescription>No books found.</AlertDescription>
            </Alert>
          </div>
        ) : (
          books.map((book: Book) => (
            <BookCard key={book.id} book={book} progress />
          ))
        )}
      </div>
    </section>
  );
};

export default GoalProgressPage;
