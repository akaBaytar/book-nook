import Link from 'next/link';

import { LockIcon, UnlockIcon, LibraryBigIcon } from 'lucide-react';

import { Card, CardTitle, CardDescription } from '@/components/ui/card';

import ListCardBooks from './list-card-books';

import { getBooks } from '@/actions/book.actions';

import type { List } from '@/types';

type PropType = {
  list: List;
  books?: string[];
};

const ListCard = async ({ list, books = [] }: PropType) => {
  const allBookIds = list.books?.filter(Boolean) || [];

  const { books: booksData } = await getBooks(allBookIds);

  return (
    <Card className='p-4 rounded-md'>
      <div className='space-y-2.5'>
        <div className='flex items-start justify-between'>
          <div className='space-y-2.5 w-full'>
            <div className='flex items-center justify-between gap-2.5'>
              <Link href={`/my-lists/${list.id}`}>
                <CardTitle className='line-clamp-1 font-normal tracking-[0.015em] text-lg'>
                  {list.name}
                </CardTitle>
              </Link>
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
            {books.length} {books.length === 1 ? 'book' : 'books'}
          </span>
        </div>
        <ListCardBooks books={booksData} />
      </div>
    </Card>
  );
};

export default ListCard;
