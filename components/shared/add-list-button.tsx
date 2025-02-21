'use client';

import { useState } from 'react';

import { EditIcon, PlusIcon } from 'lucide-react';

import { Button } from '../ui/button';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

import ListForm from './list-form';

import type { List } from '@/types';

type PropTypes = {
  list?: List;
  isEdit?: boolean;
  onAdd?: () => void;
};

const AddListButton = ({ onAdd, isEdit, list }: PropTypes) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSuccess = () => {
    setIsOpen(false);

    if (onAdd) onAdd();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={isEdit ? 'icon' : 'sm'}>
          {isEdit ? <EditIcon /> : <PlusIcon />}
          {!isEdit && <span>Add List</span>}
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[calc(100%-2.5rem)] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Update List' : 'Add New List'}</DialogTitle>
        </DialogHeader>
        <ListForm
          list={list}
          isEdit={isEdit}
          setIsOpen={setIsOpen}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddListButton;
