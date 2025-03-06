import Link from 'next/link';

import { ArrowLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const ListDetailsLoadingPage = () => {
  return (
    <div className='space-y-5 bg-sidebar rounded-md border p-4 min-h-[calc(100vh-2rem)]'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2.5'>
          <Button size='icon' asChild>
            <Link href='/my-lists'>
              <ArrowLeftIcon className='size-4' />
            </Link>
          </Button>
          <div className='hidden sm:flex items-center justify-between md:hidden xl:flex'>
            <Skeleton className='h-7 w-48' />
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-10 w-10 rounded-md inline-block' />
          <Skeleton className='h-10 w-10 rounded-md inline-block' />
          <Skeleton className='h-10 w-10 rounded-md inline-block' />
        </div>
      </div>
      <div className='sm:hidden flex items-center gap-2.5 justify-between md:flex xl:hidden'>
        <Skeleton className='h-7 w-48' />
        <Skeleton className='h-5 w-5 rounded-md' />
      </div>
      <Card className='rounded-md p-4'>
        <CardContent className='p-0'>
          <Skeleton className='h-4 w-full mb-2' />
          <div className='mt-2.5 flex items-center gap-0.5 text-sm'>
            <Skeleton className='h-5 w-20' />
          </div>
        </CardContent>
      </Card>
      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3'>
        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={index}
            className='relative flex items-center justify-between gap-5 p-2.5 rounded-md'>
            <div className='flex items-center gap-2.5'>
              <Skeleton className='w-[60px] h-[90px] rounded-md' />
              <div className='flex flex-col'>
                <Skeleton className='h-5 w-36 mb-1' />
                <Skeleton className='h-4 w-24 mb-1' />
                <Skeleton className='h-3 w-20 mb-2' />
                <div className='flex gap-2 mt-1'>
                  <Skeleton className='h-5 w-16 rounded-md' />
                  <Skeleton className='h-5 w-12 rounded-md' />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListDetailsLoadingPage;
