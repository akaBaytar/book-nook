'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Loader2Icon, TrashIcon } from 'lucide-react';

import { Button } from '../ui/button';

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';

import { useToast } from '@/hooks/use-toast';
import { removeBook } from '@/actions/book.actions';

const RemoveBook = ({ id }: { id: string }) => {
  const router = useRouter();

  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onRemove = async () => {
    try {
      setIsDeleting(true);

      await removeBook(id);

      toast({
        description: 'Book removed successfully.',
      });

      setOpen(false);
      
      router.push('/books');
    } catch {
      toast({
        title: 'Error',
        description: 'An error occurred.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <TrashIcon className='size-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-pretty'>
            Are you absolutely sure you want to remove this book?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove this book
            and remove book data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={onRemove}
            disabled={isDeleting}
            className='min-w-20'>
            {isDeleting ? (
              <Loader2Icon className='size-4 animate-spin' />
            ) : (
              'Remove'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveBook;
