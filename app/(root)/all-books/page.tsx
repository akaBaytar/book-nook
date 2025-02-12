'use client';

import { useState } from 'react';

import { SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import BookCard from '@/components/shared/book-card';

import { BOOKS } from '@/mock';

const AllBooksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCompleted, setFilterCompleted] = useState('all');

  const filteredBooks = BOOKS.filter((book) => {
    const matchesSearch =
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.translator?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.publisher.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterCompleted === 'all'
        ? true
        : filterCompleted === 'completed'
        ? book.completed
        : !book.completed;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className='space-y-5 bg-sidebar border rounded-md p-4 min-h-[calc(100vh-2rem)]'>
      <div className='flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between'>
        <h1 className='text-2xl font-medium'>
          All Books ({filteredBooks.length})
        </h1>
        <div className='flex items-center gap-5 justify-between lg:gap-2.5'>
          <div className='relative'>
            <SearchIcon className='absolute start-2 top-2.5 size-4 text-muted-foreground' />
            <Input
              placeholder='Search...'
              className='ps-7'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className='flex gap-1 sm:gap-2.5'>
            <Button
              variant={filterCompleted === 'all' ? 'default' : 'outline'}
              size='sm'
              onClick={() => setFilterCompleted('all')}>
              All
            </Button>
            <Button
              variant={filterCompleted === 'completed' ? 'default' : 'outline'}
              size='sm'
              onClick={() => setFilterCompleted('completed')}>
              Completed
            </Button>
            <Button
              variant={filterCompleted === 'unread' ? 'default' : 'outline'}
              size='sm'
              onClick={() => setFilterCompleted('unread')}>
              Unread
            </Button>
          </div>
        </div>
      </div>
      <div className='grid gap-5 xl:grid-cols-2 2xl:grid-cols-3'>
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default AllBooksPage;
