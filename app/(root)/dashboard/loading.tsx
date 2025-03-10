import { Skeleton } from '@/components/ui/skeleton';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

const DashboardLoading = () => {
  return (
    <div className='bg-sidebar rounded-md border p-4 min-h-[calc(100vh-2rem)]'>
      <Card className='flex flex-col rounded-md'>
        <CardHeader className='items-center pb-0'>
          <CardTitle className='text-2xl font-normal tracking-[0.015em]'>
            <Skeleton className='h-7 w-40' />
          </CardTitle>
          <CardDescription>
            <Skeleton className='h-4 w-60 mt-2' />
          </CardDescription>
        </CardHeader>
        <CardContent className='flex-1 my-5 flex justify-center items-center'>
          <Skeleton className='mx-auto aspect-square h-[266.5px] rounded-full mt-5' />
        </CardContent>
      </Card>
      <div className='mt-5'>
        <div className='grid grid-cols-1 gap-5 2xl:grid-cols-3'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className='rounded-md h-[120px]'>
              <CardHeader className='flex flex-row items-center justify-between pb-0'>
                <Skeleton className='h-6 w-32' />
                <Skeleton className='size-6' />
              </CardHeader>
              <CardContent>
                <Skeleton className='size-8 mt-4' />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className='grid grid-cols-1 2xl:grid-cols-2 gap-5 mt-5'>
          <Card className='rounded-md h-[168px]'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <Skeleton className='h-6 w-52' />
              <Skeleton className='size-6' />
            </CardHeader>
            <CardContent>
              <Skeleton className='size-8 mt-1' />
              <Skeleton className='h-2.5 w-full mt-2 rounded-md' />
              <Skeleton className='h-4 w-52 mt-2' />
            </CardContent>
          </Card>
          <Card className='rounded-md h-[168px]'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <Skeleton className='h-6 w-52' />
              <Skeleton className='size-6' />
            </CardHeader>
            <CardContent>
              <div className='flex items-center gap-2.5'>
                <Skeleton className='w-12 h-[72px]' />
                <div className='space-y-2'>
                  <Skeleton className='h-6 w-60' />
                  <Skeleton className='h-4 w-40' />
                  <Skeleton className='h-4 w-32' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='grid grid-cols-1 gap-5 2xl:grid-cols-3 mt-5'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className='rounded-md h-[144px]'>
              <CardHeader className='flex flex-row items-center justify-between pb-0'>
                <Skeleton className='h-6 w-32' />
                <Skeleton className='size-5' />
              </CardHeader>
              <CardContent>
                <Skeleton className='size-8 mt-4' />
                <Skeleton className='h-4 w-32 mt-2' />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading;
