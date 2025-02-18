'use client';

import { useState } from 'react';

import { PenIcon } from 'lucide-react';

import { Button } from '../ui/button';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from '@/components/ui/dialog';

import BookForm from '@/components/shared/book-form';

import type { BookData } from '@/types';

type PropTypes = {
  book: BookData;
  bookId: string;
};

const UpdateBookButton = ({ book, bookId }: PropTypes) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PenIcon /> <span className='hidden md:flex'>Update Book</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='h-full md:h-[calc(100%-2.5rem)] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Update Book</DialogTitle>
        </DialogHeader>
        <BookForm
          isEdit={true}
          bookId={bookId}
          initialData={book}
          setIsOpen={setIsOpen}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBookButton;
