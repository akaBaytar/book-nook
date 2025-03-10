import { ListTreeIcon } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

const LoadingListsPage = () => {
  const skeletonLists = Array.from({ length: 3 }, (_, i) => i);

  return (
    <div className='space-y-5 bg-sidebar rounded-md border p-4 min-h-[calc(100vh-2rem)]'>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center justify-between gap-5'>
          <h1 className='flex items-center gap-2 text-2xl tracking-[0.015em]'>
            <ListTreeIcon className='size-5 mt-0.5' />
            My Lists
          </h1>
          <Skeleton className='h-8 w-[94px]' />
        </div>
        <div className='flex items-center justify-between gap-5 sm:gap-10'>
          <div className='relative w-full'>
            <Skeleton className='h-9 w-full' />
          </div>
          <div className='flex gap-1 sm:gap-2.5'>
            <Skeleton className='h-9 w-[47px]' />
            <Skeleton className='h-9 w-[71px]' />
            <Skeleton className='h-9 w-[78px]' />
          </div>
        </div>
      </div>
      <div className='grid gap-5'>
        {skeletonLists.map((index) => (
          <div key={index} className='p-4 rounded-md border'>
            <div className='space-y-4'>
              <div className='flex items-start justify-between'>
                <div className='space-y-4 w-full'>
                  <div className='flex items-center justify-between gap-2.5'>
                    <Skeleton className='h-6 w-48' />
                    <Skeleton className='size-6 rounded-md' />
                  </div>
                  <Skeleton className='h-4 w-full max-w-md' />
                </div>
              </div>
              <div className='flex items-center gap-1'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 w-20' />
              </div>
            </div>
            <div className='border rounded-md mt-2.5'>
              <div className='flex items-center gap-2.5 p-2'>
                <Skeleton className='h-[42px] w-7 rounded-sm' />
                <div className='w-full flex flex-col justify-between gap-1 sm:flex-row lg:flex-col xl:flex-row'>
                  <div className='flex-1 min-w-0'>
                    <Skeleton className='h-4 w-32 mb-1.5 rounded-md' />
                    <Skeleton className='h-3 w-24 rounded-md' />
                  </div>
                  <div className='flex items-center gap-1.5 mt-1 sm:mt-0 lg:mt-1 xl:mt-0'>
                    <Skeleton className='h-5 w-12 rounded-md' />
                    <Skeleton className='h-5 w-10 rounded-md' />
                  </div>
                </div>
              </div>
            </div>
            <Skeleton className='w-full h-8 mt-2.5' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingListsPage;
