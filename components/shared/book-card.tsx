import Link from 'next/link';
import Image from 'next/image';

import { BookHeartIcon } from 'lucide-react';

import { Card, CardTitle, CardDescription } from '@/components/ui/card';

import { cn } from '@/lib/utils';

import type { Book } from '@/types';

const BookCard = ({ book }: { book: Book }) => (
  <Link href={`/books/${book.id}`}>
    <Card className='flex items-center justify-between gap-5 p-2.5 rounded-md hover:shadow-md transition-shadow'>
      <div className='flex items-center gap-2.5'>
        <Image
          src={book.image || '/placeholder.jpg'}
          width={60}
          height={90}
          alt={book.name}
          className='object-cover rounded-md aspect-[2/3]'
        />
        <div className='flex flex-col'>
          <CardTitle title={book.name} className='line-clamp-1'>
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
              <span
                key={genre}
                className='px-2 py-0.5 text-xs bg-gray-100 rounded-full'>
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div
        title={book.completed ? 'Completed' : 'Not completed'}
        className='flex flex-col items-center justify-center gap-3 w-24'>
        <BookHeartIcon
          className={cn(
            'size-6',
            book.completed ? 'text-pink-600' : 'text-emerald-600'
          )}
        />
        <CardDescription
          title={book.endDate?.toDateString()}
          className='text-xs line-clamp-1'>
          {book.endDate?.toLocaleDateString()}
        </CardDescription>
      </div>
    </Card>
  </Link>
);

export default BookCard;
