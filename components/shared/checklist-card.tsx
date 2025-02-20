'use client';

import { useState } from 'react';

import { CheckSquare, PlusIcon, Square } from 'lucide-react';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

import RemoveCheckList from './remove-checklist';
import AddCheckListButton from './add-checklist-button';

import { useToast } from '@/hooks/use-toast';

import {
  addCheckListItem,
  toggleCheckListItem,
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

  const handleToggle = async () => {
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

  return (
    <div className='flex items-center gap-1'>
      <button onClick={handleToggle} disabled={isUpdating}>
        {isCompleted ? (
          <CheckSquare className='size-4 text-pink-500' />
        ) : (
          <Square className='size-4 text-pink-500' />
        )}
      </button>
      <button
        onClick={handleToggle}
        disabled={isUpdating}
        className={
          isCompleted
            ? 'line-through text-gray-400 line-clamp-1'
            : 'line-clamp-1'
        }>
        {name}
      </button>
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
    <Card>
      <CardHeader>
        <CardTitle className='text-lg font-normal tracking-wide flex items-center justify-between'>
          <span className='line-clamp-1'>{checkList.name}</span>
          <div className='flex items-center gap-2'>
            <Button
              size='sm'
              variant='outline'
              className='size-6'
              onClick={() => setIsAddingNew(true)}>
              <PlusIcon className='!size-3' />
            </Button>
            <AddCheckListButton isEdit={true} name={checkList.name} />
            <RemoveCheckList id={id} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {checkList.items && (
          <div className='space-y-2'>
            {checkList.items.map((item, index) => (
              <CheckListItem
                key={index}
                id={id}
                name={item.name}
                completed={item.completed}
              />
            ))}
          </div>
        )}
        {isAddingNew ? (
          <div className='mt-4 flex gap-2'>
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder='Enter item'
              onKeyDown={(e) => e.key === 'Enter' && onClick()}
            />
            <Button onClick={onClick} disabled={isAdding}>
              Add
            </Button>
          </div>
        ) : (
          <p>{checkList.items?.length === 0 ? 'There are no items, ' : ''}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckListCard;
