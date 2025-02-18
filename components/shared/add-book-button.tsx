'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

const AddBookButton = ({ onBookAdded }: { onBookAdded: () => void }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleBookAdded = () => {
    setIsOpen(false);

    router.refresh();

    if (onBookAdded) onBookAdded();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size='sm'>
          <PlusIcon /> Add New Book
        </Button>
      </DialogTrigger>
      <DialogContent className='h-full md:h-[calc(100%-2.5rem)] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
        </DialogHeader>
        <AddBookForm setIsOpen={setIsOpen} onBookAdded={handleBookAdded} />
      </DialogContent>
    </Dialog>
  );
};

export default AddBookButton;
