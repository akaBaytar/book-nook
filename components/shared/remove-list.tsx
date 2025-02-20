'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

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
import { removeList } from '@/actions/list.actions';

const RemoveList = ({ id }: { id: string }) => {
  const { toast } = useToast();

  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  const onRemove = async () => {
    try {
      setIsDeleting(true);

      await removeList(id);

      router.push('/my-lists')

      toast({
        description: 'List removed successfully.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'An error occurred while removing the list.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
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

export default RemoveList;
