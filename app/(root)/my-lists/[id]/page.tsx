import Link from 'next/link';
import Image from 'next/image';

import {
  EditIcon,
  LockIcon,
  TrashIcon,
  UnlockIcon,
  ArrowLeftIcon,
  LibraryBigIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';

import { getList } from '@/actions/list.actions';
import { getBooks } from '@/actions/book.actions';

type PropType = {
  params: Promise<{ id: string }>;
};

type Book = {
  id: string;
  name: string;
  image: string;
  author: string;
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
          <h1 className='text-2xl tracking-[0.015em]'>{list.name}</h1>
          {list.private ? (
            <LockIcon className='size-4 mt-0.5 text-pink-300' />
          ) : (
            <UnlockIcon className='size-4 mt-0.5 text-pink-400' />
          )}
        </div>
        <div className='flex items-center gap-2'>
          <Button size='icon'>
            <EditIcon />
          </Button>
          <Button size='icon'>
            <TrashIcon />
          </Button>
        </div>
      </div>
      <Card className='rounded-md'>
        <CardHeader>
          <CardTitle className='text-lg font-normal tracking-[0.015em]'>
            About this list
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>{list.description}</p>
          <div className='mt-5 flex items-center gap-0.5 text-sm text-muted-foreground'>
            <LibraryBigIcon className='size-4 text-pink-300' />
            <span>
              {books.length} {list.books.length < 2 ? 'book' : 'books'}
            </span>
          </div>
        </CardContent>
      </Card>
      {/* //TODO fix grid layout after all backend is done  */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {books.map((book: Book) => (
          <Link key={book.id} href={`/books/${book.id}`}>
            <Card className='rounded-md'>
              <CardContent className='p-4'>
                <Image
                  src={book.image}
                  alt={book.name}
                  width={300}
                  height={200}
                  className='rounded-md object-contain w-full'
                />
                <h3 className='mt-2 tracking-[0.015em]'>{book.name}</h3>
                <p className='text-sm text-muted-foreground'>{book.author}</p>
                {book.genre && book.genre.length > 0 && (
                  <div className='flex items-center gap-2.5 mt-1'>
                    {book.genre.map((g: string) => (
                      <Badge
                        key={g}
                        variant='secondary'
                        className='border border-input'>
                        {g}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want delete this list?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              list and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>
              Delete List
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ListDetailsPage;
