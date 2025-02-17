'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import {
  EditIcon,
  LockIcon,
  TrashIcon,
  UnlockIcon,
  ArrowLeftIcon,
  LibraryBigIcon,
} from 'lucide-react';

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

import { LISTS } from '@/mock';

import type { List } from '@/types';

const ListDetailsPage = () => {
  const { id } = useParams();

  const [list, setList] = useState<null | List>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const foundList = LISTS.find((l) => l.id === id);

    setList(foundList as List);
  }, [id]);

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
          {list.privacy === 'PRIVATE' ? (
            <LockIcon className='size-4 mt-0.5 text-pink-300' />
          ) : (
            <UnlockIcon className='size-4 mt-0.5 text-pink-400' />
          )}
        </div>
        <div className='flex items-center gap-2'>
          <Button size='icon'>
            <EditIcon />
          </Button>
          <Button size='icon' onClick={() => setIsDeleteDialogOpen(true)}>
            <TrashIcon />
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className='text-lg font-normal tracking-[0.015em]'>
            About this list
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>{list.description}</p>
          <div className='mt-5 flex items-center gap-0.5 text-sm text-muted-foreground'>
            <LibraryBigIcon className='size-4 text-pink-300' />
            <span>{list.books.length} books</span>
          </div>
        </CardContent>
      </Card>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {list.books.map((book, index) => (
          <Card key={index}>
            <CardContent className='p-4'>
              <div className='aspect-[16/9] bg-muted rounded-md' />
              <h3 className='mt-2 tracking-[0.015em]'>
                Book {book.toString()}
              </h3>
              <p className='text-sm text-muted-foreground'>Author Name</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}>
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
