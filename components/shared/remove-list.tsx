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
import { removeList } from '@/actions/list.actions';

const RemoveList = ({ id }: { id: string }) => {
  const { toast } = useToast();

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onRemove = async () => {
    try {
      setIsDeleting(true);

      await removeList(id);

      setOpen(false);

      router.push('/my-lists');

      toast({
        description: 'List removed successfully.',
      });
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
        <Button size='icon'>
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-pretty'>
            Are you absolutely sure you want to remove this list?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove this list
            and remove list data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={onRemove} disabled={isDeleting} className='min-w-20'>
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

export default RemoveList;
