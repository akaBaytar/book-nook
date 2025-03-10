'use client';

import { useState } from 'react';

import { PlusIcon } from 'lucide-react';

import { Button } from '../ui/button';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

import BookForm from './book-form';

const AddBookButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleBookAdded = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size='sm'>
          <PlusIcon /> Add Book
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[calc(100%-2.5rem)] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
        </DialogHeader>
        <BookForm setIsOpen={setIsOpen} onSuccess={handleBookAdded} />
      </DialogContent>
    </Dialog>
  );
};

export default AddBookButton;
