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

import { TBRSchema } from '@/schemas';
import { useToast } from '@/hooks/use-toast';
import { addTBR } from '@/actions/tbr.actions';

import type { Dispatch, SetStateAction } from 'react';

type PropTypes = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSuccess?: () => void;
};

const TBRForm = ({ setIsOpen, onSuccess }: PropTypes) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof TBRSchema>>({
    resolver: zodResolver(TBRSchema),
    defaultValues: { name: '', completed: false, favorite: false },
  });

  const onSubmit = async ({ name }: { name: string }) => {
    try {
      const response = await addTBR({
        name,
        favorite: false,
        completed: false,
      });

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
                  placeholder='e.g.: "Classic Literature"'
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
            Add TBR
          </Button>
        )}
      </form>
    </Form>
  );
};

export default TBRForm;
