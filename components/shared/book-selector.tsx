'use client';

import { useState, useEffect } from 'react';

import { CheckIcon, Loader2Icon, SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

import { getAllBooksForTBR } from '@/actions/book.actions';

import type { Book } from '@prisma/client';

type PropTypes = {
  selectedBooks?: string[];
  onSelect: (books: string[]) => void;
};

const BookSelector = ({ selectedBooks = [], onSelect }: PropTypes) => {
  const [books, setBooks] = useState<Book[] | []>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getAllBooksForTBR();

        if (response.success) {
          setBooks(response.books);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSelected = (bookId: string) => selectedBooks.includes(bookId);

  const toggleBookSelection = (bookId: string) => {
    if (isSelected(bookId)) {
      onSelect(selectedBooks.filter((id) => id !== bookId));
    } else {
      onSelect([...selectedBooks, bookId]);
    }
  };

  const selectedBooksList = filteredBooks.filter((book) => isSelected(book.id));
  const unselectedBooksList = filteredBooks.filter(
    (book) => !isSelected(book.id)
  );

  return (
    <div className='space-y-2.5'>
      <div className='relative'>
        <SearchIcon className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Search books...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='pl-8'
        />
      </div>
      <ScrollArea className='h-52 rounded-md border shadow-sm'>
        {loading ? (
          <div className='p-4 grid place-content-center h-52'>
            <Loader2Icon className='size-6 animate-spin' />
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className='p-4 text-center text-muted-foreground'>
            No books found.
          </div>
        ) : (
          <div className='p-4 space-y-2'>
            {selectedBooksList.map((book) => (
              <div
                key={book.id}
                className='flex items-center justify-between p-2 rounded-lg bg-muted'
                onClick={() => toggleBookSelection(book.id)}>
                <div className='flex items-center space-x-2'>
                  <div className='flex-1'>{book.name}</div>
                </div>
                <CheckIcon className='h-4 w-4 text-primary' />
              </div>
            ))}
            {unselectedBooksList.map((book) => (
              <div
                key={book.id}
                className='flex items-center justify-between p-2 rounded-lg hover:bg-accent cursor-pointer'
                onClick={() => toggleBookSelection(book.id)}>
                <div className='flex items-center space-x-2'>
                  <div className='flex-1'>{book.name}</div>
                </div>
                {isSelected(book.id) && (
                  <CheckIcon className='h-4 w-4 text-primary' />
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
      <div className='text-sm text-muted-foreground'>
        Selected: {selectedBooks.length}{' '}
        {selectedBooks.length < 2 ? 'book' : 'books'}
      </div>
    </div>
  );
};

export default BookSelector;
