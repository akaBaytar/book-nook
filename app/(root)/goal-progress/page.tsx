import { PickaxeIcon } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';

import BookCard from '@/components/shared/book-card';

import { getBookReadThisYear } from '@/actions/book.actions';

import type { Book } from '@/types';

const GoalProgressPage = async () => {
  const { books } = await getBookReadThisYear();

  return (
    <section className='space-y-5 bg-sidebar border rounded-md p-4 min-h-[calc(100vh-2rem)]'>
      <div className='flex flex-col gap-5'>
        <header className='flex items-center justify-between'>
          <h1 className='flex items-center gap-2 text-2xl tracking-[0.015em]'>
            <PickaxeIcon className='size-5' />
            Goal Progress
          </h1>
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
