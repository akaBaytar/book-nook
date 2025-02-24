'use client';

import { SparklesIcon } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

const LoadingPage = () => {
  return (
    <div className='flex flex-col gap-5 bg-sidebar rounded-md border p-4 min-h-[calc(100vh-2rem)]'>
      <div className='flex gap-5 items-center justify-between'>
        <h1 className='flex items-center gap-2 text-2xl tracking-[0.015em]'>
          <SparklesIcon className='size-5 mt-0.5' />
          <span className='block lg:hidden'>TBR</span>
          <span className='hidden lg:block'>To Be Read</span>
        </h1>
        <div className='flex gap-2.5'>
          <Skeleton className='sm:w-[170px] lg:w-auto xl:w-[170px] h-9' />
        </div>
      </div>
      <Skeleton className='p-3 rounded-md border h-12' />
      <div className='flex flex-col gap-5 md:flex-row-reverse lg:flex-col xl:flex-row-reverse'>
        <Skeleton className='grid w-full grid-cols-2' />
        <div className='flex flex-col gap-5 xl:flex-row xl:items-center w-full'>
          <Skeleton className='relative flex-1 min-w-48'>
            <Skeleton className='h-10 w-full' />
          </Skeleton>
        </div>
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className='p-5 flex rounded-md border'>
            <div className='flex flex-col gap-2.5 w-full'>
              <div className='flex justify-between items-start'>
                <Skeleton className='h-5 w-4/5' />
                <div className='flex gap-1.5'>
                  <Skeleton className='h-5 w-5 rounded-full' />
                  <Skeleton className='h-5 w-5 rounded-full' />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingPage;
