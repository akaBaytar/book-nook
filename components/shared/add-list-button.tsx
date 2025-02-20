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

import ListForm from './list-form';

const AddListButton = ({ onAdd }: { onAdd: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSuccess = () => {
    setIsOpen(false);

    onAdd();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size='sm'>
          <PlusIcon /> Add New List
        </Button>
      </DialogTrigger>
      <DialogContent className=''>
        <DialogHeader>
          <DialogTitle>Add New List</DialogTitle>
        </DialogHeader>
        <ListForm setIsOpen={setIsOpen} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default AddListButton;
