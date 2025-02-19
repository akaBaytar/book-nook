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

import TBRForm from './tbr-form';

const AddTBRButton = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const onTBRAdded = () => {
    setIsOpen(false);

    router.refresh();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <PlusIcon /> Add TBR
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New To Be Read</DialogTitle>
        </DialogHeader>
        <TBRForm setIsOpen={setIsOpen} onSuccess={onTBRAdded} />
      </DialogContent>
    </Dialog>
  );
};

export default AddTBRButton;
