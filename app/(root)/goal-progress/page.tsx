'use client';

import { useState, useEffect, useCallback } from 'react';

import { PickaxeIcon } from 'lucide-react';

import BookCard, { BookSkeleton } from '@/components/shared/book-card';

import { useToast } from '@/hooks/use-toast';

import { getBookReadThisYear } from '@/actions/book.actions';

import type { Book } from '@/types';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AllBooksPage = () => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);

  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await getBookReadThisYear();

      if (result.success) {
        setBooks(result.books);
      }
    } catch (error) {
      toast({ description: `An error occurred. ${error}` });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

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
        {isLoading ? (
          <BookSkeleton />
        ) : books.length === 0 ? (
          <div className='col-span-full'>
            <Alert>
              <AlertDescription>
                No books found.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          books.map((book) => <BookCard key={book.id} book={book} progress />)
        )}
      </div>
    </section>
  );
};

export default AllBooksPage;
