import Link from 'next/link';
import Image from 'next/image';

import { BookCheckIcon, BookIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

import { formatDate } from '@/utils';
import { BOOKS_PER_PAGE } from '@/constants';

import type { Book } from '@/types';

const BookCard = ({ book, progress }: { book: Book; progress?: boolean }) => {
  return (
    <Link href={progress ? `/goal-progress/${book.id}` : `/books/${book.id}`}>
      <Card className='relative flex items-center justify-between gap-5 p-2.5 rounded-md hover:shadow-md transition-shadow border-pink-100'>
        <div className='flex items-center gap-2.5'>
          <Image
            src={book.image || '/placeholder.jpg'}
            width={60}
            height={90}
            alt={book.name}
            className='object-cover rounded-md aspect-[2/3]'
          />
          <div className='flex flex-col'>
            <CardTitle
              title={book.name}
              className='line-clamp-1 font-normal tracking-[0.015em]'>
              {book.name.charAt(0).toUpperCase() + book.name.slice(1)}
            </CardTitle>
            <CardDescription title={book.author} className='line-clamp-1'>
              {book.author.charAt(0).toUpperCase() + book.author.slice(1)}
            </CardDescription>
            <CardDescription
              title={book.publisher}
              className='text-xs font-light line-clamp-1'>
              {book.publisher.charAt(0).toUpperCase() + book.publisher.slice(1)}
            </CardDescription>
            <div className='flex gap-2 mt-1'>
              {book.genre.slice(0, 2).map((genre) => (
                <Badge key={genre} variant='secondary' className='truncate'>
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div
          title={
            book.completed ? formatDate(book.endDate as Date) : 'Not completed'
          }
          className='absolute end-2.5 top-2.5'>
          {book.completed ? (
            <BookCheckIcon className='fill-pink-100 text-pink-500' />
          ) : (
            <BookIcon className='fill-pink-100 text-pink-300' />
          )}
        </div>
      </Card>
    </Link>
  );
};

export const BookSkeleton = () => {
  return (
    <>
      {[...Array(BOOKS_PER_PAGE)].map((_, index) => (
        <div
          key={index}
          className='relative flex items-center justify-between gap-5 p-2.5 h-[112px] border rounded-md shadow'>
          <div className='flex items-center gap-2'>
            <Skeleton className='w-[60px] h-[90px] rounded-md' />
            <div className='flex flex-col gap-1'>
              <Skeleton className='h-5 w-[140px]' />
              <Skeleton className='h-4 w-[120px]' />
              <Skeleton className='h-3 w-[120px]' />
              <div className='flex gap-2 mt-1'>
                <Skeleton className='h-5 w-12 rounded-md' />
                <Skeleton className='h-5 w-12 rounded-md' />
              </div>
            </div>
          </div>
          <Skeleton className='absolute end-2.5 top-2.5 h-7 w-6 rounded-md' />
        </div>
      ))}
    </>
  );
};

export default BookCard;
