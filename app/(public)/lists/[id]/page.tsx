import Link from 'next/link';
import Image from 'next/image';

import { LockIcon, UnlockIcon, LibraryBigIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';

import { getBooks } from '@/actions/book.actions';
import { getPublicList } from '@/actions/list.actions';

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

const PublicListDetailsPage = async ({ params }: PropType) => {
  const { id } = await params;

  const { list } = await getPublicList(id);

  const { books } = await getBooks(list.books);

  if (!list) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-xl'>List not found.</p>
      </div>
    );
  }

  return (
    <div className='space-y-5 bg-sidebar rounded-md border p-4 min-h-screen'>
      <div className='flex items-center gap-2.5 justify-center'>
        <h1 className='text-xl tracking-[0.015em] line-clamp-1'>{list.name}</h1>
        {list.private ? (
          <LockIcon className='size-4 mt-0.5 text-pink-300' />
        ) : (
          <UnlockIcon className='size-4 mt-0.5 text-pink-400' />
        )}
      </div>
      <Card className='rounded-md p-4'>
        <CardContent className='p-0'>
          <p className='text-muted-foreground text-center'>{list.description}</p>
          <div className='mt-2.5 flex items-center justify-center gap-0.5 text-sm text-muted-foreground'>
            <LibraryBigIcon className='size-4 text-pink-300' />
            <span>
              {books.length} {list.books.length < 2 ? 'book' : 'books'}
            </span>
          </div>
        </CardContent>
      </Card>
      <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {books.map((book: Book) => (
          <Link key={book.id} href={`/all-books/${book.id}`}>
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

export default PublicListDetailsPage;
