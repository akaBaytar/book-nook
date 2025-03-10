'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Loader2Icon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

import { CheckListSchema } from '@/schemas';
import { useToast } from '@/hooks/use-toast';

import {
  createCheckList,
  updateCheckListName,
} from '@/actions/checklist.actions';

import type { Dispatch, SetStateAction } from 'react';

type PropTypes = {
  checkListName?: string;
  isEdit?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSuccess?: () => void;
};

const CheckListForm = ({
  isEdit,
  setIsOpen,
  onSuccess,
  checkListName,
}: PropTypes) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CheckListSchema>>({
    resolver: zodResolver(CheckListSchema),
    defaultValues: { name: isEdit ? checkListName : '', items: [] },
  });

  const onSubmit = async ({ name }: { name: string }) => {
    try {
      const response = isEdit
        ? await updateCheckListName({ name })
        : await createCheckList({ name });

      if (response.success) {
        toast({ description: response.message });

        if (onSuccess) {
          onSuccess();
        } else {
          setIsOpen(false);
        }
      } else {
        toast({
          title: 'Error',
          description: response.message,
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'An error occurred.',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 my-2.5'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='e.g.: "My reading list"'
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.isSubmitting ? (
          <Button type='submit' className='w-full'>
            <Loader2Icon className='animate-spin size-4' />
          </Button>
        ) : (
          <Button type='submit' className='w-full'>
            {isEdit ? 'Edit Checklist Name' : 'Create a Checklist'}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default CheckListForm;
