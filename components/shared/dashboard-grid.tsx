import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

import {
  BookIcon,
  BookXIcon,
  TargetIcon,
  CalendarIcon,
  BookCheckIcon,
  BookHeartIcon,
  TrendingUpIcon,
  BookMarkedIcon,
} from 'lucide-react';

import type { ElementType } from 'react';

const DashboardGrid = () => {
  const booksRead = 60;
  const totalBooks = 100;
  const readingGoal = 120;
  const booksThisMonth = 10;
  const totalPagesThisMonth = 150;
  const booksNotReadYet = totalBooks - booksRead;
  const currentlyReading = 'Küllerimle Dans Ettim';
  const readingProgress = (booksRead / readingGoal) * 100;

  type CardPropType = {
    title: string;
    color?: string;
    subtitle?: string;
    icon: ElementType;
    value: number | string;
  };

  const StatCard = ({
    color,
    title,
    value,
    subtitle,
    icon: Icon,
  }: CardPropType) => (
    <Card className='rounded-md'>
      <CardHeader className='flex flex-row items-center justify-between pb-1'>
        <h3 className='text-xl text-gray-500'>{title}</h3>
        <Icon className={`size-5 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className='mt-1'>
          <p className='text-2xl'>{value}</p>
          {subtitle && <p className='text-sm text-gray-500 mt-1'>{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className='mt-5'>
      <div className='grid grid-cols-1 gap-5 xl:grid-cols-3'>
        <StatCard
          title='Total Books'
          value={totalBooks}
          icon={BookIcon}
          color='text-pink-600'
        />
        <StatCard
          title='Books Read'
          value={booksRead}
          icon={BookCheckIcon}
          color='text-green-600'
        />
        <StatCard
          title='Books Remaining'
          value={booksNotReadYet}
          icon={BookXIcon}
          color='text-orange-600'
        />
      </div>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5'>
        <Card className='rounded-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <h3 className='text-lg tracking-[0.015em] text-gray-700'>
              Reading Goal Progress
            </h3>
            <TargetIcon className='h-5 w-5 text-violet-600' />
          </CardHeader>
          <CardContent>
            <div className='mt-1'>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-2xl'>{booksRead}</span>
                <span className='text-gray-500'>of {readingGoal} books</span>
              </div>
              <Progress
                value={readingProgress}
                max={100}
                className='h-3 bg-violet-100'
              />
              <p className='text-sm text-gray-500 mt-2'>
                {Math.round(readingProgress)}% of yearly goal completed
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className='rounded-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <h3 className='text-lg tracking-[0.015em] text-gray-700'>
              Currently Reading
            </h3>
            <BookMarkedIcon className='h-5 w-5 text-blue-500' />
          </CardHeader>
          <CardContent>
            <div className='mt-1'>
              <p className='text-2xl tracking-[0.015em]'>{currentlyReading}</p>
              <div className='mt-4 flex items-center'>
                <div className='w-2 h-2 bg-green-500 rounded-full' />
                <span className='text-sm text-gray-500 ml-2'>
                  Currently on Chapter 5
                </span>
              </div>
              <div className='mt-2'>
                <Progress value={45} max={100} className='h-2 bg-indigo-100' />
                <p className='text-sm text-gray-500 mt-1'>45% completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='mt-5 grid grid-cols-1 xl:grid-cols-3 gap-5'>
        <StatCard
          title='Monthly Progress'
          value={booksThisMonth}
          subtitle={`${totalPagesThisMonth} pages read`}
          icon={CalendarIcon}
          color='text-rose-800'
        />
        <StatCard
          title='Reading Streak'
          value='15 days'
          subtitle='Personal best: 30 days'
          icon={TrendingUpIcon}
          color='text-emerald-600'
        />
        <StatCard
          title='Daily Average'
          value='52 pages'
          subtitle='This week'
          icon={BookHeartIcon}
          color='text-amber-600'
        />
      </div>
    </div>
  );
};

export default DashboardGrid;
