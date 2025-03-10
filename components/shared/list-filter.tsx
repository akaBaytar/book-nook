'use client';

import { useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';

type Filter = 'all' | 'private' | 'public';

const ListFilter = ({ initialFilter = 'all' }) => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  
  const [isPending, startTransition] = useTransition();

  const currentFilter = searchParams.get('privacy') || initialFilter;

  const handleFilterChange = (filter: Filter) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      if (filter === 'all') {
        params.delete('privacy');
      } else {
        params.set('privacy', filter);
      }

      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className='flex items-center justify-between gap-2.5 w-full xl:w-fit'>
      <Button
        variant={currentFilter === 'all' ? 'default' : 'outline'}
        onClick={() => handleFilterChange('all')}
        disabled={isPending}
        className='w-full xl:w-[94px]'>
        All
      </Button>
      <Button
        variant={currentFilter === 'public' ? 'default' : 'outline'}
        onClick={() => handleFilterChange('public')}
        disabled={isPending}
        className='w-full xl:w-[94px]'>
        Public
      </Button>
      <Button
        variant={currentFilter === 'private' ? 'default' : 'outline'}
        onClick={() => handleFilterChange('private')}
        disabled={isPending}
        className='w-full xl:w-[94px]'>
        Private
      </Button>
    </div>
  );
};

export default ListFilter;
