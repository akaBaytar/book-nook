import { SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import BookCard from '@/components/shared/book-card';
import AddBookButton from '@/components/shared/add-book-button';

import { getAllBooks } from '@/actions/book.actions';

import type { Book } from '@/types';

const AllBooksPage = async () => {
  const { books, count } = await getAllBooks();

  return (
    <div className='space-y-5 bg-sidebar border rounded-md p-4 min-h-[calc(100vh-2rem)]'>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl'>All Books ({count})</h1>
          <AddBookButton />
        </div>
        <div className='flex items-center gap-5 justify-between lg:gap-2.5'>
          <div className='relative'>
            <SearchIcon className='absolute start-2 top-2.5 size-4 text-muted-foreground' />
            <Input placeholder='Search...' className='ps-7' />
          </div>
          <div className='flex gap-1 sm:gap-2.5'>
            <Button size='sm'>All</Button>
            <Button variant='outline' size='sm'>
              Completed
            </Button>
            <Button variant='outline' size='sm'>
              Unread
            </Button>
          </div>
        </div>
      </div>
      <div className='grid gap-5 xl:grid-cols-2 2xl:grid-cols-3'>
        {books.map((book: Book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default AllBooksPage;
