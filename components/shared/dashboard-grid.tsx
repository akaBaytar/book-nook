import Link from 'next/link';

import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

import {
  BookIcon,
  TargetIcon,
  RainbowIcon,
  CalendarIcon,
  BookCheckIcon,
  ChartSplineIcon,
  TrendingUpIcon,
  BookMarkedIcon,
} from 'lucide-react';

import UpdateGoal from './update-goal';

import type { ElementType } from 'react';

type PropTypes = {
  booksRead: number;
  booksReadThisYear: number;
  totalBooks: number;
  readingGoal: number;
  goalProgress: number;
  booksRemaining: number;
  dailyAverage: {
    pages: number;
    period: number;
  };
  readingStreak: {
    currentStreak: number;
    personalBest: number;
  };
  monthlyProgress: {
    count: number;
    pagesRead: number;
  };
  currentlyReading:
    | {
        book: {
          id:string;
          name: string;
          author: string;
          publisher: string;
        } | null;
      }
    | undefined;
};

const DashboardGrid = ({
  booksRead,
  booksRemaining,
  currentlyReading,
  dailyAverage,
  goalProgress,
  monthlyProgress,
  readingGoal,
  readingStreak,
  totalBooks,
  booksReadThisYear
}: PropTypes) => {
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
        <h3 className='text-xl text-muted-foreground'>{title}</h3>
        <Icon className={`size-5 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className='mt-1'>
          <p className='text-2xl'>{value}</p>
          {subtitle && (
            <p className='text-sm text-muted-foreground mt-1'>{subtitle}</p>
          )}
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
          icon={RainbowIcon}
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
          value={booksRemaining}
          icon={BookIcon}
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
                <span className='text-2xl'>{booksReadThisYear}</span>
                <span className='text-muted-foreground text-sm'>
                  of
                  <UpdateGoal readingGoal={readingGoal} />
                </span>
              </div>
              <Progress
                value={goalProgress}
                max={100}
                className='h-2 bg-violet-100'
              />
              <p className='text-sm text-muted-foreground mt-2'>
                {Math.round(goalProgress)}% of yearly goal completed
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
          {currentlyReading && currentlyReading.book ? (
            <CardContent>
              <Link href={`/books/${currentlyReading.book.id}`}>
                <div className='mt-1 space-y-1'>
                  <p className='text-xl tracking-[0.015em]'>
                    {currentlyReading.book.name}
                  </p>
                  <p className='text-sm'>{currentlyReading.book.author}</p>
                  <p className='text-xs text-muted-foreground'>
                    {currentlyReading.book.publisher}
                  </p>
                </div>
              </Link>
            </CardContent>
          ) : (
            <CardContent>
              <div className='mt-1'>
                <p className='text-sm text-pretty text-muted-foreground tracking-[0.015em]'>
                  You can mark the book you are currently reading from the ones
                  you have added.
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
      <div className='mt-5 grid grid-cols-1 xl:grid-cols-3 gap-5'>
        <StatCard
          title='Monthly Progress'
          value={`${monthlyProgress.count} ${
            monthlyProgress.count < 2 ? 'book' : 'books'
          }`}
          subtitle={`${monthlyProgress.pagesRead} ${
            monthlyProgress.pagesRead < 2 ? 'page' : 'pages'
          } read`}
          icon={CalendarIcon}
          color='text-rose-800'
        />
        <StatCard
          title='Reading Streak'
          value={`${readingStreak.currentStreak} ${
            readingStreak.currentStreak < 2 ? 'day' : 'days'
          }`}
          subtitle={`Personal best: ${readingStreak.personalBest} ${
            readingStreak.personalBest < 2 ? 'day' : 'days'
          }`}
          icon={TrendingUpIcon}
          color='text-emerald-600'
        />
        <StatCard
          title='Daily Average'
          value={`${dailyAverage.pages} ${
            dailyAverage.pages < 2 ? 'page' : 'pages'
          }`}
          subtitle={`Total this week: ${dailyAverage.period} ${
            dailyAverage.period < 2 ? 'page' : 'pages'
          }`}
          icon={ChartSplineIcon}
          color='text-amber-600'
        />
      </div>
    </div>
  );
};

export default DashboardGrid;
