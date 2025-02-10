import Image from 'next/image';

import { BookHeartIcon } from 'lucide-react';

import { Card, CardTitle, CardDescription } from '@/components/ui/card';

import { cn } from '@/lib/utils';

import { BOOKS } from '@/mock';
import Link from 'next/link';

const AllBooksPage = () => {
  return (
    <>
      <h1 className='text-2xl font-medium'>All Books</h1>
      <div className='mt-2.5'>
        <div className='grid gap-5 xl:grid-cols-2 2xl:grid-cols-3'>
          {BOOKS.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`}>
              <Card className='flex items-center justify-between gap-5 p-2.5 rounded-md'>
                <div className='flex items-center gap-2.5'>
                  <Image
                    src={book.image}
                    width={60}
                    height={60}
                    alt={book.name}
                    className='object-cover rounded-md'
                  />
                  <div className='flex flex-col'>
                    <CardTitle title={book.name} className='line-clamp-1'>
                      {book.name}
                    </CardTitle>
                    <CardDescription
                      title={book.author}
                      className='line-clamp-1'>
                      {book.author}
                    </CardDescription>
                    <CardDescription
                      title={book.publisher}
                      className='text-xs font-light line-clamp-1'>
                      {book.publisher}
                    </CardDescription>
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
          ))}
        </div>
      </div>
    </>
  );
};

export default AllBooksPage;
