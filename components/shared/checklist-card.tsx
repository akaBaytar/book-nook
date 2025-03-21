'use client';

import { useState } from 'react';

import {
  PlusIcon,
  TrashIcon,
  CircleIcon,
  EllipsisIcon,
  CircleCheckBigIcon,
} from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

import RemoveCheckList from './remove-checklist';
import AddCheckListButton from './add-checklist-button';

import { useToast } from '@/hooks/use-toast';

import {
  addCheckListItem,
  toggleCheckListItem,
  removeCheckListItem,
} from '@/actions/checklist.actions';

import type { CheckList } from '@/types';

type Item = {
  id: string;
  name: string;
  completed: boolean;
  checkListId: string;
};

type CheckListItemProps = {
  item: Item;
};

type CheckListCardProps = {
  checkList: CheckList;
  id: string;
};

const CheckListItem = ({ item }: CheckListItemProps) => {
  const { toast } = useToast();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(item.completed);

  const onClick = async () => {
    try {
      setIsUpdating(true);

      await toggleCheckListItem(item.id);

      setIsCompleted(!isCompleted);
    } catch {
      toast({ description: 'Failed to update.' });
    } finally {
      setIsUpdating(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsUpdating(true);

      await removeCheckListItem(item.id);
    } catch {
      toast({ description: 'Failed to update.' });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className='flex items-center justify-between gap-2.5'>
      <div className='flex items-center gap-1'>
        <button onClick={onClick} disabled={isUpdating}>
          {isCompleted ? (
            <CircleCheckBigIcon className='size-3 opacity-60' />
          ) : (
            <CircleIcon className='size-3' />
          )}
        </button>
        <button
          onClick={onClick}
          disabled={isUpdating}
          className={
            isCompleted ? 'line-through line-clamp-1 opacity-60 text-start' : 'line-clamp-1 text-start'
          }>
          {item.name}
        </button>
      </div>
      <Popover>
        <PopoverTrigger>
          <EllipsisIcon
            className={`size-4 ${
              isCompleted ? '' : ''
            }`}
          />
        </PopoverTrigger>
        <PopoverContent
          side='bottom'
          className='p-0'>
          <button
            onClick={onDelete}
            disabled={isUpdating}
            className='flex items-center justify-center gap-0.5 p-2'>
            <TrashIcon className='size-4' />
            <span className='text-xs'>Remove</span>
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

const CheckListCard = ({ checkList, id }: CheckListCardProps) => {
  const { toast } = useToast();

  const [newItem, setNewItem] = useState('');
  const [open, setOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const onClick = async () => {
    if (!newItem.trim()) return;

    try {
      setIsAdding(true);

      await addCheckListItem({
        checkListId: id,
        completed: false,
        name: newItem.trim(),
      });

      setNewItem('');

      setIsAddingNew(false);
    } catch {
      toast({ description: 'Failed to add new item.' });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card className='rounded-md'>
      <CardHeader>
        <CardTitle className='text-lg font-normal tracking-wide flex items-center justify-between gap-1'>
          <p className='truncate'>{checkList.name}</p>
          <div className='flex items-center gap-2'>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger>
                <EllipsisIcon className='size-4' />
              </PopoverTrigger>
              <PopoverContent
                side='bottom'
                className='flex flex-col items-center gap-1.5'>
                <Button
                  size='sm'
                  variant='ghost'
                  className='h-6 w-full shadow justify-between rounded-sm'
                  onClick={() => {
                    setIsAddingNew(true);
                    setOpen(false);
                  }}>
                  <PlusIcon className='!size-3' />
                  <span>Add Item</span>
                </Button>
                <AddCheckListButton isEdit={true} name={checkList.name} />
                <RemoveCheckList id={id} />
              </PopoverContent>
            </Popover>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isAddingNew ? (
          <div className='flex gap-2.5 items-center'>
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder='Enter item'
              onKeyDown={(e) => e.key === 'Enter' && onClick()}
              className='h-6 text-sm mb-2.5'
            />
            <Button
              onClick={onClick}
              disabled={isAdding}
              className='h-6 mb-2.5'>
              Add
            </Button>
          </div>
        ) : (
          <p className='text-sm'>
            {checkList.items?.length === 0 ? 'There are no items. ' : ''}
          </p>
        )}
        {checkList.items && (
          <div className='space-y-2'>
            {checkList.items.map((item) => (
              <CheckListItem key={item.id} item={item as Item} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckListCard;
