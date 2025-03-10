'use client';

import { useState } from 'react';

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
import { removeCheckList } from '@/actions/checklist.actions';

const RemoveCheckList = ({ id }: { id: string }) => {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const onRemove = async () => {
    try {
      setIsDeleting(true);

      await removeCheckList(id);

      setOpen(false);

      toast({
        description: 'Checklist removed successfully.',
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
        <Button
          variant='ghost'
          size='sm'
          className='h-6 w-full shadow rounded-sm justify-between'>
          <TrashIcon className='!size-3' />
          <span>Remove</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-pretty'>
            Are you absolutely sure you want to remove this checklist?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove this
            checklist and remove checklist data from our servers.
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

export default RemoveCheckList;
