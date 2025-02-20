import Link from 'next/link';

import { LockIcon, UnlockIcon } from 'lucide-react';

import { Card, CardTitle, CardDescription } from '@/components/ui/card';

import type { List } from '@/types';

const ListCard = ({ list }: { list: List & { id?: string } }) => {
  return (
    <Link href={`/my-lists/${list.id}`}>
      <Card className='p-4 rounded-md hover:shadow-md transition-shadow'>
        <div className='flex justify-between items-start'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <CardTitle className='line-clamp-1 font-normal tracking-[0.015em]'>
                {list.name}
              </CardTitle>
              {list.private ? (
                <LockIcon className='size-4 text-pink-400' />
              ) : (
                <UnlockIcon className='size-4 text-pink-300' />
              )}
            </div>
            <CardDescription className='line-clamp-1'>
              {list.description}
            </CardDescription>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ListCard;
