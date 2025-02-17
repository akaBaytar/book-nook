import Link from 'next/link';
import Image from 'next/image';

import { BookCheckIcon, BookIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

import { formatDate } from '@/utils';

import type { Book } from '@/types';

const BookCard = ({ book }: { book: Book }) => (
  <Link href={`/books/${book.id}`}>
    <Card className='flex items-center justify-between gap-5 p-2.5 rounded-md hover:shadow-md transition-shadow border-pink-100'>
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
            {book.name}
          </CardTitle>
          <CardDescription title={book.author} className='line-clamp-1'>
            {book.author}
          </CardDescription>
          <CardDescription
            title={book.publisher}
            className='text-xs font-light line-clamp-1'>
            {book.publisher}
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
        title={book.completed ? 'Completed' : 'Not completed'}
        className='flex flex-col items-center justify-center gap-3 w-24'>
        {book.completed ? (
          <BookCheckIcon className='fill-pink-100 text-pink-500' />
        ) : (
          <BookIcon className='fill-pink-100 text-pink-300' />
        )}
        <CardDescription className='text-xs line-clamp-1'>
          {formatDate(book.endDate as Date)}
        </CardDescription>
      </div>
    </Card>
  </Link>
);

export default BookCard;
