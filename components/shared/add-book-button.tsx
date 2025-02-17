import { PlusIcon } from 'lucide-react';

import { Button } from '../ui/button';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

import AddBookForm from './add-book-form';

const AddBookButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm'>
          <PlusIcon /> Add New Book
        </Button>
      </DialogTrigger>
      <DialogContent className='h-full md:h-[calc(100%-2.5rem)] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
        </DialogHeader>
        <AddBookForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddBookButton;
