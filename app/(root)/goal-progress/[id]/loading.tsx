'use client'

import Link from 'next/link';

import { ArrowLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const BookDetailsLoadingPage = () => {
return (
  <Card className='relative rounded-md bg-sidebar min-h-[calc(100vh-2rem)]'>
    <div className='flex items-center justify-between gap-2.5 mt-4 mx-4'>
      <Button asChild>
        <Link href='/books'>
          <ArrowLeftIcon className='size-4' />
          <span>My Books</span>
        </Link>
      </Button>
      <div className='space-x-2.5'>
        <Skeleton className='h-10 w-10 rounded-md inline-block' />
        <Skeleton className='h-10 w-10 rounded-md inline-block' />
        <Skeleton className='h-10 w-10 rounded-md inline-block' />
      </div>
    </div>
    <CardHeader className='flex items-center text-center xl:flex-row xl:items-start gap-5 sm:gap-10'>
      <Skeleton className='min-w-[200px] h-[300px] rounded-md' />
      <div className='flex flex-col items-center text-center xl:text-start xl:items-start space-y-5 w-full'>
        <div className='w-full'>
          <Skeleton className='h-8 w-3/4 mb-2.5' />
          <Skeleton className='h-6 w-1/2' />
        </div>
        <div className='flex flex-wrap gap-2.5'>
          <Skeleton className='h-6 w-20 rounded-md' />
          <Skeleton className='h-6 w-24 rounded-md' />
          <Skeleton className='h-6 w-16 rounded-md' />
        </div>
        <Skeleton className='h-6 w-20' />
        <div className='flex flex-wrap gap-5 w-full'>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-6 w-40' />
        </div>
      </div>
    </CardHeader>
    <CardContent className='space-y-10'>
      <div className='space-y-5'>
        <div className='space-y-2.5 text-center xl:text-start'>
          <Skeleton className='h-7 w-24 mb-2' />
          <Skeleton className='h-4 w-full mb-1' />
          <Skeleton className='h-4 w-full mb-1' />
          <Skeleton className='h-4 w-full mb-1' />
          <Skeleton className='h-4 w-3/4' />
        </div>
        <Skeleton className='h-16 w-full rounded-md' />
      </div>
      <Separator />
      <div>
        <Skeleton className='h-7 w-32 mb-4' />
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5'>
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className='space-y-1'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-5 w-32' />
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);
}
 
export default BookDetailsLoadingPage;