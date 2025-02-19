'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
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
    defaultValues: { name: '' },
  });

  const onSubmit = async ({ name }: { name: string }) => {
    try {
      const response = await addTBR({ name });

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
                  placeholder='Enter TBR name'
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          Add TBR
        </Button>
      </form>
    </Form>
  );
};

export default TBRForm;
