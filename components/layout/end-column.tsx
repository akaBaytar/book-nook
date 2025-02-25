import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetContent,
  SheetDescription,
} from '@/components/ui/sheet';

import ImageCarousel from './image-carousel';
import BookTracker from '../shared/book-tracker';
import CheckListCard from '../shared/checklist-card';
import AddCheckListButton from '../shared/add-checklist-button';

import { getCheckList } from '@/actions/checklist.actions';

import type { CheckList } from '@/types';

const EndColumn = async () => {
  const { checkList } = await getCheckList();

  return (
    <div className='bg-sidebar rounded-md border p-4 mx-4 md:mx-0 mb-5 lg:mb-4 flex flex-col gap-5 lg:w-[19rem] lg:fixed lg:right-4 lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto'>
      <Card className='grid p-4 min-h-[76px] items-center rounded-md'>
        <Sheet>
          <SheetTrigger asChild>
            <Button className='shadow-md'>Open Tracker</Button>
          </SheetTrigger>
          <SheetContent className='overflow-y-scroll py-10'>
            <SheetHeader>
              <SheetTitle className='text-center'>Book Tracker</SheetTitle>
              <SheetDescription className='text-center text-pretty'>
                Mark your pages, track weekly averages and
                monitor your reading streak.
              </SheetDescription>
            </SheetHeader>
            <BookTracker />
          </SheetContent>
        </Sheet>
      </Card>
      {checkList ? (
        <CheckListCard checkList={checkList as CheckList} id={checkList.id} />
      ) : (
        <Card className='grid p-4 min-h-[76px] items-center rounded-md'>
          <AddCheckListButton />
        </Card>
      )}
      <div className='flex flex-col items-center justify-between gap-5'>
        <Card className='rounded-md w-full'>
          <CardContent className='p-4'>
            <Calendar
              mode='single'
              selected={new Date()}
              className='w-full grid place-content-center'
            />
          </CardContent>
        </Card>
      </div>
      <ImageCarousel orientation='end' />
    </div>
  );
};

export default EndColumn;
