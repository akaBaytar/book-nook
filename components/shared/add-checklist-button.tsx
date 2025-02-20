'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { EditIcon } from 'lucide-react';

import { Button } from '../ui/button';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

import CheckListForm from './checklist-form';

type PropTypes = {
  name?: string;
  isEdit?: boolean;
};

const AddCheckListButton = ({ isEdit, name }: PropTypes) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const onSuccess = () => {
    setIsOpen(false);

    router.refresh();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant='ghost' size='sm' className='h-6 w-full border border-pink-100 justify-between'>
            <EditIcon className='!size-3'/>
            <span>Rename</span>
          </Button>
        ) : (
          <Button>Create a Checklist</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit Checklist Name' : 'Create a Checklist'}
          </DialogTitle>
        </DialogHeader>
        <CheckListForm
          checkListName={name}
          isEdit={isEdit}
          setIsOpen={setIsOpen}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddCheckListButton;
