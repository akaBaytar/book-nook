import Link from 'next/link';
import Image from 'next/image';

import { BookCheckIcon, BookIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

import { formatDate } from '@/utils';

import type { Book } from '@/types';

const BookCard = ({ book, progress }: { book: Book; progress?: boolean }) => {
  return (
    <Link href={progress ? `/goal-progress/${book.id}` : `/books/${book.id}`}>
      <Card className='relative flex items-center justify-between gap-5 p-2.5 rounded-md hover:shadow-md transition-shadow'>
        <div className='flex items-center gap-2.5'>
          <Image
            src={book.image || '/placeholder.jpg'}
            width={60}
            height={90}
            alt={book.name}
            className='object-cover rounded-md aspect-[2/3]'
            priority
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
            <BookCheckIcon className='opacity-70' />
          ) : (
            <BookIcon className='opacity-30' />
          )}
        </div>
      </Card>
    </Link>
  );
};

export default BookCard;
