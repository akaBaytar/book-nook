'use client'

import { useState } from 'react';

import Image from 'next/image';

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

import type { Book } from '@/types';

const ListCardBooks = ({ books }: { books: Book[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const capitalize = (str: string) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  };
  return (
    <>
      {books.length > 0 && (
        <div className='space-y-2.5'>
          <div className='space-y-2.5'>
            {books.slice(0, 1).map((book: Book) => (
              <div
                key={book.id}
                className='flex items-center gap-2.5 p-2 rounded-md shadow-sm border'>
                <Image
                  src={book.image || '/placeholder.jpg'}
                  alt={book.name}
                  width={27}
                  height={48}
                  className='rounded-sm object-contain'
                />
                <div className='w-full flex flex-col justify-between gap-1 sm:flex-row lg:flex-col xl:flex-row'>
                  <div className='flex-1 min-w-0'>
                    <h4 className='text-sm font-medium truncate'>
                      {capitalize(book.name)}
                    </h4>
                    <p className='text-xs text-muted-foreground truncate'>
                      {capitalize(book.author)}
                    </p>
                  </div>
                  <div className='flex items-center gap-1'>
                    {book.genre.map((g, i) => (
                      <Badge
                        key={i}
                        variant='secondary'
                        className='text-xs font-light p-0.5 px-1'>
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {books.length > 1 && (
            <>
              {isExpanded && (
                <div className='space-y-2.5 animate-in fade-in'>
                  {books.slice(1).map((book: Book) => (
                    <div
                      key={book.id}
                      className='flex items-center gap-2.5 p-2 rounded-md shadow-sm border'>
                      <Image
                        src={book.image || '/placeholder.jpg'}
                        alt={book.name}
                        width={27}
                        height={48}
                        className='rounded-sm object-contain'
                      />
                      <div className='w-full flex flex-col justify-between gap-1 sm:flex-row lg:flex-col xl:flex-row'>
                        <div className='flex-1 min-w-0'>
                          <h4 className='text-sm font-medium truncate'>
                            {capitalize(book.name)}
                          </h4>
                          <p className='text-xs text-muted-foreground truncate'>
                            {capitalize(book.author)}
                          </p>
                        </div>
                        <div className='flex items-center gap-1'>
                          {book.genre.map((g, i) => (
                            <Badge
                              key={i}
                              variant='secondary'
                              className='text-xs font-light p-0.5 px-1'>
                              {g}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Button
                variant='ghost'
                size='sm'
                className='w-full text-xs'
                onClick={onClick}>
                {isExpanded ? (
                  <ChevronUpIcon className='size-4 mr-1' />
                ) : (
                  <ChevronDownIcon className='size-4 mr-1' />
                )}
                {isExpanded
                  ? 'Show less'
                  : `Show ${books.length - 1} ${
                      books.length - 1 === 1 ? 'more book' : 'more books'
                    }`}
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ListCardBooks;
