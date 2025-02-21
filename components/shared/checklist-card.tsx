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

type CheckListItemProps = {
  id: string;
  name: string;
  completed: boolean;
};

type CheckListCardProps = {
  checkList: CheckList;
  id: string;
};

const CheckListItem = ({ id, name, completed }: CheckListItemProps) => {
  const { toast } = useToast();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completed);

  const onClick = async () => {
    try {
      setIsUpdating(true);

      await toggleCheckListItem(id);

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

      await removeCheckListItem(id);
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
            <CircleCheckBigIcon className='size-3 text-pink-500' />
          ) : (
            <CircleIcon className='size-3 text-gray-500' />
          )}
        </button>
        <button
          onClick={onClick}
          disabled={isUpdating}
          className={
            isCompleted ? 'line-through text-gray-300 truncate' : 'truncate'
          }>
          {name}
        </button>
      </div>
      <Popover>
        <PopoverTrigger>
          <EllipsisIcon
            className={`size-4 ${
              isCompleted ? 'text-gray-300' : 'text-gray-500'
            }`}
          />
        </PopoverTrigger>
        <PopoverContent
          side='bottom'
          className='p-0 border-pink-100 hover:bg-pink-50'>
          <button
            onClick={onDelete}
            disabled={isUpdating}
            className='flex items-center justify-center gap-0.5 p-2'>
            <TrashIcon className='size-4 text-gray-500' />
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
            <Popover>
              <PopoverTrigger>
                <EllipsisIcon className='size-4 text-gray-500' />
              </PopoverTrigger>
              <PopoverContent
                side='bottom'
                className='flex flex-col items-center gap-1.5'>
                <Button
                  size='sm'
                  variant='ghost'
                  className='h-6 w-full shadow justify-between rounded-sm'
                  onClick={() => setIsAddingNew(true)}>
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
        {checkList.items && (
          <div className='space-y-2'>
            {checkList.items.map((item) => (
              <CheckListItem
                key={item.id}
                id={item.id as string}
                name={item.name}
                completed={item.completed}
              />
            ))}
          </div>
        )}
        {isAddingNew ? (
          <div className='flex gap-2'>
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder='Enter item'
              onKeyDown={(e) => e.key === 'Enter' && onClick()}
              className='h-6 text-sm'
            />
            <Button onClick={onClick} disabled={isAdding} className='h-6'>
              Add
            </Button>
          </div>
        ) : (
          <p className='text-sm'>
            {checkList.items?.length === 0 ? 'There are no items. ' : ''}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckListCard;
