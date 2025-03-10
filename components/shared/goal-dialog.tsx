import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Loader2Icon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { GoalSchema } from '@/schemas';
import { updateReadingGoal } from '@/actions/dashboard.action';

import type { Dispatch, SetStateAction } from 'react';

import type { Goal } from '@/types';

type PropTypes = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const GoalDialog = ({ open, onOpenChange }: PropTypes) => {
  const form = useForm<Goal>({
    resolver: zodResolver(GoalSchema),
    defaultValues: {
      goal: 0,
    },
  });

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
                      type='number'
                      placeholder='Number of books'
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className='w-full'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              {form.formState.isSubmitting ? (
                <Button disabled className='w-[85.45px]'>
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
