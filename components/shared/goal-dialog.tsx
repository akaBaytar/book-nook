'use client';

import { useState, useEffect } from 'react';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Loader2Icon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';

import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

import { GoalSchema } from '@/schemas';
import { updateReadingGoal, getBookStats } from '@/actions/dashboard.action';

import type { Dispatch, SetStateAction } from 'react';

import type { Goal } from '@/types';

type PropTypes = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const GoalDialog = ({ open, onOpenChange }: PropTypes) => {
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<Goal>({
    resolver: zodResolver(GoalSchema),
    defaultValues: {
      goal: 0,
    },
  });

  useEffect(() => {
    if (open) {
      const fetchGoal = async () => {
        try {
          setIsLoading(true);

          const { success, readingGoal } = await getBookStats();

          if (success && readingGoal) {
            form.reset({ goal: readingGoal });
          }
        } catch {
          toast.error('Failed to fetch current goal.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchGoal();
    }
  }, [open, form]);

  const onSubmitGoal = async (values: Goal) => {
    try {
      const response = await updateReadingGoal(values.goal);

      if (response.success) {
        toast.success(response.message);

        onOpenChange(false);
      } else {
        toast.error(response.message || 'Failed to update reading goal');
      }
    } catch {
      toast.error('An error occurred.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent style={{ zIndex: 9999 }}>
        <DialogHeader>
          <DialogTitle>Set Reading Goal</DialogTitle>
          <DialogDescription>Set your yearly reading target.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitGoal)}
            className='space-y-4'>
            <FormField
              control={form.control}
              name='goal'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      disabled={isLoading}
                      placeholder='Number of books'
                      onFocus={(e) => e.target.select()}
                      value={field.value === 0 ? '' : field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className='w-full'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              {form.formState.isSubmitting || isLoading ? (
                <Button disabled className='min-w-[85.45px]'>
                  <Loader2Icon className='animate-spin size-4' />
                </Button>
              ) : (
                <Button type='submit'>Set Goal</Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default GoalDialog;
