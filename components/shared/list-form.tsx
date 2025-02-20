'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

import { ListSchema } from '@/schemas';
import { useToast } from '@/hooks/use-toast';
import { createList, updateList } from '@/actions/list.actions';

import type { Dispatch, SetStateAction } from 'react';
import type { List } from '@/types';

type PropTypes = {
  list?: List;
  isEdit?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSuccess?: () => void;
};

const ListForm = ({ isEdit, setIsOpen, onSuccess, list }: PropTypes) => {
  const { toast } = useToast();

  const form = useForm<List>({
    resolver: zodResolver(ListSchema),
    defaultValues: {
      name: isEdit ? list?.name : '',
      books: isEdit ? list?.books : [],
      description: isEdit ? list?.description : '',
      private: isEdit ? list?.private : false,
    },
  });

  const onSubmit = async (values: List) => {
    try {
      const { message, success } = isEdit
        ? await updateList({ ...values, id: list!.id })
        : await createList(values);

      if (success) {
        toast({ description: message });

        if (onSuccess) {
          onSuccess();
        } else {
          setIsOpen(false);
        }
      } else {
        toast({
          title: 'Error',
          description: message,
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
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Enter list description'
                  {...field}
                  value={field.value || ''}
                  className='h-16 resize-none'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='private'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-md shadow-sm border border-pink-100 p-2.5'>
              <div className='space-y-0.5'>
                <FormLabel>Private</FormLabel>
                <FormDescription className='text-xs text-pretty'>
                  Mark if you want your list to be visible only to you
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          {isEdit ? 'Update List' : 'Create a List'}
        </Button>
      </form>
    </Form>
  );
};

export default ListForm;
