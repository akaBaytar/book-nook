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
import Image from 'next/image';

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
          id: string;
          name: string;
          image: string;
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
  booksReadThisYear,
}: PropTypes) => {
  type CardPropType = {
    title: string;
    subtitle?: string;
    color?: string;
    icon: ElementType;
    value: number | string;
  };

  const StatCard = ({
    title,
    value,
    subtitle,
    color,
    icon: Icon,
  }: CardPropType) => (
    <Card className='rounded-md'>
      <CardHeader className='flex flex-row items-center justify-between pb-1'>
        <h3 className='text-xl text-muted-foreground'>{title}</h3>
        <Icon className='size-6' style={{ color }} />
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
      <div className='grid grid-cols-1 gap-5 2xl:grid-cols-3'>
        <StatCard
          title='Total Books'
          value={totalBooks}
          icon={RainbowIcon}
          color='#d2665a'
        />
        <StatCard
          title='Books Read'
          value={booksRead}
          icon={BookCheckIcon}
          color='#709dad'
        />
        <StatCard
          title='Books Remaining'
          value={booksRemaining}
          icon={BookIcon}
          color='#d7b'
        />
      </div>
      <div className='grid grid-cols-1 2xl:grid-cols-2 gap-5 mt-5'>
        <Card className='rounded-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <h3 className='text-lg tracking-[0.015em]'>
              Reading Goal Progress
            </h3>
            <TargetIcon className='size-6 text-[#d7b]' />
          </CardHeader>
          <CardContent>
            <Link href='/goal-progress'>
              <div className='mt-1'>
                <div className='flex justify-between items-center mb-2'>
                  <span className='text-2xl'>{booksReadThisYear}</span>
                  <span className='text-muted-foreground text-sm'>
                    of
                    <UpdateGoal readingGoal={readingGoal} />
                  </span>
                </div>
                <Progress value={goalProgress} max={100} className='h-2' />
                <p className='text-sm text-muted-foreground mt-2'>
                  {Math.round(goalProgress)}% of yearly goal completed
                </p>
              </div>
            </Link>
          </CardContent>
        </Card>
        <Card className='rounded-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <h3 className='text-lg tracking-[0.015em]'>Currently Reading</h3>
            <BookMarkedIcon className='size-6 text-[#709dad]' />
          </CardHeader>
          {currentlyReading && currentlyReading.book ? (
            <CardContent>
              <Link href={`/books/${currentlyReading.book.id}`}>
                <div className='flex items-center gap-2.5'>
                  <Image
                    src={currentlyReading.book.image || '/placeholder.jpg'}
                    alt={currentlyReading.book.name}
                    width={40}
                    height={72}
                    className='object-contain rounded-sm'
                  />
                  <div>
                    <p className='text-xl tracking-[0.015em]'>
                      {currentlyReading.book.name}
                    </p>
                    <p className='text-sm'>{currentlyReading.book.author}</p>
                    <p className='text-xs text-muted-foreground'>
                      {currentlyReading.book.publisher}
                    </p>
                  </div>
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
      <div className='mt-5 grid grid-cols-1 2xl:grid-cols-3 gap-5'>
        <StatCard
          title='Monthly Progress'
          value={`${monthlyProgress.count} ${
            monthlyProgress.count < 2 ? 'book' : 'books'
          }`}
          subtitle={`${monthlyProgress.pagesRead} ${
            monthlyProgress.pagesRead < 2 ? 'page' : 'pages'
          } read`}
          icon={CalendarIcon}
          color='#d2665a'
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
          color='#8ebaa3'
        />
        <StatCard
          title='Daily Average'
          value={`${dailyAverage.pages} ${
            dailyAverage.pages < 2 ? 'page' : 'pages'
          }`}
          subtitle={`Average this week: ${dailyAverage.period} ${
            dailyAverage.period < 2 ? 'page' : 'pages'
          }`}
          icon={ChartSplineIcon}
          color='#8193cf'
        />
      </div>
    </div>
  );
};

export default DashboardGrid;
