import { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import {
  LockIcon,
  UnlockIcon,
  BookOpenIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
};

const ListCard = ({ list, books = [] }: PropType) => {
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
                  <LockIcon className='size-4 text-pink-400' />
                ) : (
                  <UnlockIcon className='size-4 text-pink-300' />
                )}
              </div>
              <CardDescription className='line-clamp-1 text-sm'>
                {list.description}
              </CardDescription>
            </div>
          </div>
          <div className='flex items-center gap-1 text-muted-foreground'>
            <BookOpenIcon className='size-4 mt-0.5' />
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
                    className='flex items-center gap-1 p-2 rounded-md bg-muted'>
                    <Image
                      src={book.image}
                      alt={book.name}
                      width={27}
                      height={48}
                      className='rounded-sm object-contain'
                    />
                    <div className='flex-1 min-w-0'>
                      <h4 className='text-sm font-medium truncate'>
                        {book.name}
                      </h4>
                      <p className='text-xs text-muted-foreground truncate'>
                        {book.author}
                      </p>
                    </div>
                    {book.genre.map((g, i) => (
                      <Badge key={i} variant='secondary' className='text-xs'>
                        {g}
                      </Badge>
                    ))}
                  </div>
                ))}
              </div>
              {books.length > 1 && (
                <>
                  {isExpanded && (
                    <div className='space-y-2.5 animate-in fade-in slide-in-from-top-1'>
                      {books.slice(1).map((book: Book) => (
                        <div
                          key={book.id}
                          className='flex items-center gap-1 p-2 rounded-md bg-muted'>
                          <Image
                            src={book.image}
                            alt={book.name}
                            width={27}
                            height={48}
                            className='rounded-sm object-contain'
                          />
                          <div className='flex-1 min-w-0'>
                            <h4 className='text-sm font-medium truncate'>
                              {book.name}
                            </h4>
                            <p className='text-xs text-muted-foreground truncate'>
                              {book.author}
                            </p>
                          </div>
                          {book.genre.map((g, i) => (
                            <Badge
                              key={i}
                              variant='secondary'
                              className='text-xs'>
                              {g}
                            </Badge>
                          ))}
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
                      : `Show ${books.length - 1} more books`}
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
