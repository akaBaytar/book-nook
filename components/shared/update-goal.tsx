'use client';

import { useRef, useState, useEffect } from 'react';

import { Input } from '../ui/input';
import { Button } from '../ui/button';

import { updateReadingGoal } from '@/actions/dashboard.action';

const UpdateGoal = ({ readingGoal }: { readingGoal: number }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [goal, setGoal] = useState(readingGoal || 0);

  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setGoal(readingGoal || 0);
  }, [readingGoal]);

  const enable = (e: React.MouseEvent) => {
    e.preventDefault();

    setIsEditing(true);

    setTimeout(() => input.current?.focus(), 0);
  };

  const disable = async () => {
    setIsEditing(false);
    if (goal !== readingGoal) {
      await updateReadingGoal(goal);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value >= 0) setGoal(+e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') disable();
  };

  return (
    <div className='inline-flex'>
      {isEditing ? (
        <Input
          type='number'
          ref={input}
          value={goal}
          onChange={onChange}
          onBlur={disable}
          onKeyDown={onKeyDown}
          className='h-8 p-0 ms-1 w-8 focus-visible:ring-transparent shadow-none border-none'
        />
      ) : (
        <Button
          variant='ghost'
          size='sm'
          onClick={(e) => enable(e)}
          className='h-8 text-sm p-1 hover:bg-inherit opacity-100 '>
          <span className='truncate'>{goal}</span>
        </Button>
      )}
    </div>
  );
};

export default UpdateGoal;
