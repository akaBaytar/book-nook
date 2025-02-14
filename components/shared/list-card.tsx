import Link from 'next/link';
import Image from 'next/image';

import { LockIcon, UnlockIcon, LibraryBigIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

import { BOOKS } from '@/mock';

import type { List } from '@/types';

const ListCard = ({ list }: { list: List }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listBooks = BOOKS.filter((book) => list.books.includes(book.id as any));

  const previewBooks = listBooks.slice(0, 6);

  return (
    <Link href={`/my-lists/${list.id}`}>
      <Card className='p-4 rounded-md hover:shadow-md transition-shadow'>
        <div className='flex justify-between items-start'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <CardTitle className='line-clamp-1 font-normal tracking-[0.015em]'>
                {list.name}
              </CardTitle>
              {list.privacy === 'PRIVATE' ? (
                <LockIcon className='size-4 text-pink-400' />
              ) : (
                <UnlockIcon className='size-4 text-pink-300' />
              )}
            </div>
            <CardDescription className='line-clamp-2'>
              {list.description}
            </CardDescription>
          </div>
          <div className='flex items-center gap-0.5'>
            <LibraryBigIcon className='size-4 text-pink-300' />
            <span className='text-muted-foreground'>
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
              <Badge key={genre} variant='secondary'>
                {genre}
              </Badge>
            ))}
        </div>
      </Card>
    </Link>
  );
};

export default ListCard;
