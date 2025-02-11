import Link from 'next/link';
import Image from 'next/image';

import { LockIcon, UnlockIcon, BookOpenIcon } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

import { BOOKS } from '@/mock';

import type { List } from '@/types';

const ListCard = ({ list }: { list: List }) => {
  const listBooks = BOOKS.filter((book) => list.books.includes(book.id));

  const previewBooks = listBooks.slice(0, 6);

  return (
    <Link href={`/lists/${list.id}`}>
      <Card className='p-4 rounded-md hover:shadow-md transition-shadow'>
        <div className='flex justify-between items-start'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <CardTitle className='line-clamp-1'>{list.name}</CardTitle>
              {list.privacy === 'PRIVATE' ? (
                <LockIcon className='size-4 text-muted-foreground' />
              ) : (
                <UnlockIcon className='size-4 text-muted-foreground' />
              )}
            </div>
            <CardDescription className='line-clamp-2'>
              {list.description}
            </CardDescription>
          </div>
          <div className='flex items-center gap-1'>
            <BookOpenIcon className='size-4 text-muted-foreground' />
            <span className='text-sm text-muted-foreground'>
              {list.books.length}
            </span>
          </div>
        </div>
        <div className='mt-4'>
          <div className='flex gap-4'>
            {previewBooks.map((book) => (
              <div key={book.id} className='relative'>
                <Image
                  src={book.image}
                  width={50}
                  height={75}
                  alt={book.name}
                  className='object-cover rounded-md aspect-[2/3]'
                />
              </div>
            ))}
            {list.books.length > 3 && (
              <div className='flex items-center justify-center w-[50px] h-[75px] bg-gray-100 rounded-md'>
                <span className='text-sm text-muted-foreground'>
                  +{list.books.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className='mt-4 flex flex-wrap gap-2'>
          {Array.from(new Set(listBooks.flatMap((book) => book.genre)))
            .slice(0, 3)
            .map((genre) => (
              <span
                key={genre}
                className='px-2 py-0.5 text-xs bg-gray-100 rounded-full'>
                {genre}
              </span>
            ))}
        </div>
      </Card>
    </Link>
  );
};

export default ListCard;
