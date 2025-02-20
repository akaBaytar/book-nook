'use client';

import { useState } from 'react';

import { Loader2Icon, TrashIcon } from 'lucide-react';

import { Button } from '../ui/button';

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
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

  const [isDeleting, setIsDeleting] = useState(false);

  const onRemove = async () => {
    try {
      setIsDeleting(true);

      await removeCheckList(id);

      toast({
        description: 'Checklist removed successfully.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'An error occurred while removing the checklist.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost' size='sm' className='h-6 w-full border border-pink-100'>
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
            This action cannot be undone. This will permanently remove this checklist
            and remove checklist data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onRemove}
            disabled={isDeleting}
            className='min-w-20'>
            {isDeleting ? (
              <span>
                <Loader2Icon className='animate-spin' />
              </span>
            ) : (
              'Remove'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveCheckList;
