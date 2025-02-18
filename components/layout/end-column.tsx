'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import ImageCarousel from './image-carousel';
import BookTracker from '../shared/book-tracker';

const EndColumn = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Read a book', done: false },
    { id: 2, text: 'Write notes', done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div className='bg-sidebar rounded-md border p-4 mx-4 lg:mx-0 mb-5 lg:mb-4 flex flex-col gap-5 lg:w-[19rem] lg:fixed lg:right-4 lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto'>
      <Sheet>
        <SheetTrigger asChild>
          <Button className='shadow-md'>Open Tracker</Button>
        </SheetTrigger>
        <SheetContent className='overflow-y-scroll'>
          <SheetHeader>
            <SheetTitle>Book Tracker</SheetTitle>
            <SheetDescription>
              You can track your books and update your tracker.
            </SheetDescription>
          </SheetHeader>
          <BookTracker />
          <SheetFooter>
            <SheetClose asChild>
              <Button type='submit' className='w-full'>
                Save Changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <div className='flex flex-col items-center justify-between gap-5'>
        <Card className='rounded-md w-full'>
          <CardContent className='p-4'>
            <Calendar
              mode='single'
              selected={new Date()}
              className='w-full grid place-content-center'
            />
          </CardContent>
        </Card>
        <Card className='rounded-md size-full'>
          <CardContent className='p-4'>
            <h3 className='text-lg mb-2'>Check List</h3>
            {tasks.map((task) => (
              <div key={task.id} className='flex items-center gap-2'>
                <Checkbox
                  checked={task.done}
                  onCheckedChange={() => toggleTask(task.id)}
                />
                <span className={task.done ? 'line-through text-gray-500' : ''}>
                  {task.text}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <ImageCarousel orientation='end' />
    </div>
  );
};

export default EndColumn;
