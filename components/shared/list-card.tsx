import { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import {
  LockIcon,
  UnlockIcon,
  ChevronUpIcon,
  LibraryBigIcon,
  ChevronDownIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

import type { List } from '@/types';

type Book = {
  id: string;
  name: string;
  author: string;
  image: string;
  genre: string[];
};

type PropType = {
  list: List;
  books?: Book[];
  isLoading: boolean;
};

const ListCard = ({ list, books = [], isLoading }: PropType) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();

    setIsExpanded(!isExpanded);
  };

  return (
    <Link href={`/my-lists/${list.id}`}>
      <Card className='p-4 rounded-md'>
        <div className='space-y-2.5'>
          <div className='flex items-start justify-between'>
            <div className='space-y-2.5 w-full'>
              <div className='flex items-center justify-between gap-2.5'>
                <CardTitle className='line-clamp-1 font-normal tracking-[0.015em] text-lg'>
                  {list.name}
                </CardTitle>
                {list.private ? (
                  <LockIcon className='size-4' />
                ) : (
                  <UnlockIcon className='size-4' />
                )}
              </div>
              <CardDescription className='line-clamp-1 text-sm'>
                {list.description}
              </CardDescription>
            </div>
          </div>
          <div className='flex items-center gap-1 text-muted-foreground'>
            <LibraryBigIcon className='size-4 mt-0.5' />
            <span className='text-sm'>
              {books.length} {books.length < 2 ? 'book' : 'books'}
            </span>
          </div>
          {books.length > 0 && (
            <div className='space-y-2.5'>
              <div className='space-y-2.5'>
                {books.slice(0, 1).map((book: Book) => (
                  <div
                    key={book.id}
                    className='flex items-center gap-2.5 p-2 rounded-md shadow-sm border'>
                    {isLoading ? (
                      <Skeleton className='w-[27px] h-[48px]' />
                    ) : (
                      <Image
                        src={book.image}
                        alt={book.name}
                        width={27}
                        height={48}
                        className='rounded-sm object-contain'
                      />
                    )}
                    <div className='w-full flex flex-col justify-between gap-1 sm:flex-row lg:flex-col xl:flex-row'>
                      <div className='flex-1 min-w-0'>
                        <h4 className='text-sm font-medium truncate'>
                          {book.name.charAt(0).toUpperCase() +
                            book.name.slice(1)}
                        </h4>
                        <p className='text-xs text-muted-foreground truncate'>
                          {book.author.charAt(0).toUpperCase() +
                            book.author.slice(1)}
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
                            src={book.image}
                            alt={book.name}
                            width={27}
                            height={48}
                            className='rounded-sm object-contain'
                          />
                          <div className='w-full flex flex-col justify-between gap-1 sm:flex-row lg:flex-col xl:flex-row'>
                            <div className='flex-1 min-w-0'>
                              <h4 className='text-sm font-medium truncate'>
                                {book.name.charAt(0).toUpperCase() +
                                  book.name.slice(1)}
                              </h4>
                              <p className='text-xs text-muted-foreground truncate'>
                                {book.author.charAt(0).toUpperCase() +
                                  book.author.slice(1)}
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
                          books.length - 1 < 2 ? 'more book' : 'more books'
                        }`}
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default ListCard;
