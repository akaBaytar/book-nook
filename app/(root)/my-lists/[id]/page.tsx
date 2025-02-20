import Link from 'next/link';
import Image from 'next/image';

import {
  LockIcon,
  UnlockIcon,
  ArrowLeftIcon,
  LibraryBigIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';

import RemoveList from '@/components/shared/remove-list';
import AddListButton from '@/components/shared/add-list-button';

import { getList } from '@/actions/list.actions';
import { getBooks } from '@/actions/book.actions';

import type { List } from '@/types';

type PropType = {
  params: Promise<{ id: string }>;
};

type Book = {
  id: string;
  name: string;
  image: string;
  author: string;
  publisher: string;
  genre: string[];
};

const ListDetailsPage = async ({ params }: PropType) => {
  const { id } = await params;

  const { list } = await getList(id);

  const { books } = await getBooks(list.books);

  if (!list) {
    return (
      <div className='flex items-center justify-center h-[calc(100vh-2rem)]'>
        <p className='text-xl'>List not found.</p>
      </div>
    );
  }

  return (
    <div className='space-y-5 bg-sidebar rounded-md border p-4 min-h-[calc(100vh-2rem)]'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2.5'>
          <Button size='icon' asChild>
            <Link href='/my-lists'>
              <ArrowLeftIcon className='size-4' />
            </Link>
          </Button>
          <div className='hidden sm:flex items-center justify-between md:hidden xl:flex'>
            <h1 className='text-xl tracking-[0.015em] line-clamp-1'>
              {list.name}
            </h1>
            {list.private ? (
              <LockIcon className='!size-4 mt-0.5 ms-2.5 me-5 text-pink-300' />
            ) : (
              <UnlockIcon className='!size-4 mt-0.5 ms-2.5 me-5 text-pink-400' />
            )}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <AddListButton isEdit={true} list={list as List} />
          <RemoveList id={id} />
        </div>
      </div>
      <div className='sm:hidden flex items-center gap-2.5 justify-between md:flex xl:hidden'>
        <h1 className='text-xl tracking-[0.015em] line-clamp-1'>
          {list.name}
        </h1>
        {list.private ? (
          <LockIcon className='size-4 mt-0.5 text-pink-300' />
        ) : (
          <UnlockIcon className='size-4 mt-0.5 text-pink-400' />
        )}
      </div>
      <Card className='rounded-md p-4'>
        <CardContent className='p-0'>
          <p className='text-muted-foreground'>{list.description}</p>
          <div className='mt-2.5 flex items-center gap-0.5 text-sm text-muted-foreground'>
            <LibraryBigIcon className='size-4 text-pink-300' />
            <span>
              {books.length} {list.books.length < 2 ? 'book' : 'books'}
            </span>
          </div>
        </CardContent>
      </Card>
      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3'>
        {books.map((book: Book) => (
          <Link key={book.id} href={`/books/${book.id}`}>
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
                      <Badge
                        key={genre}
                        variant='secondary'
                        className='truncate'>
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListDetailsPage;
