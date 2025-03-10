import { PickaxeIcon } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

import { BOOKS_PER_PAGE } from '@/constants';

const LoadingGoalProgressPage = () => {
  return (
    <section className='space-y-5 bg-sidebar border rounded-md p-4 min-h-[calc(100vh-2rem)]'>
      <div className='flex flex-col gap-5'>
        <h1 className='flex items-center gap-2 text-2xl tracking-[0.015em]'>
          <PickaxeIcon className='size-5' />
          Goal Progress
        </h1>
      </div>
      <div className='grid gap-5 xl:grid-cols-2 2xl:grid-cols-3'>
        {[...Array(BOOKS_PER_PAGE)].map((_, index) => (
          <div
            key={index}
            className='relative flex items-center justify-between gap-5 p-2.5 h-[112px] border rounded-md shadow'>
            <div className='flex items-center gap-2'>
              <Skeleton className='w-[60px] h-[90px] rounded-md' />
              <div className='flex flex-col gap-1'>
                <Skeleton className='h-5 w-[140px]' />
                <Skeleton className='h-4 w-[120px]' />
                <Skeleton className='h-3 w-[120px]' />
                <div className='flex gap-2 mt-1'>
                  <Skeleton className='h-5 w-12 rounded-md' />
                  <Skeleton className='h-5 w-12 rounded-md' />
                </div>
              </div>
            </div>
            <Skeleton className='absolute end-2.5 top-2.5 h-7 w-6 rounded-md' />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LoadingGoalProgressPage;
