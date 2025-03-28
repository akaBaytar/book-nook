'use client';

import { LabelList, RadialBar, RadialBarChart } from 'recharts';

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/components/ui/card';

import {
  ChartConfig,
  ChartTooltip,
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';

type PropTypes = {
  totalBooks: number;
  booksRead: number;
  booksReadThisYear: number;
  booksReadThisMonth: number;
};

const DashboardChart = ({
  totalBooks,
  booksRead,
  booksReadThisYear,
  booksReadThisMonth,
}: PropTypes) => {
  const chartData = [
    {
      data: 'Read This Month',
      Book: booksReadThisMonth,
      fill: 'var(--color-booksReadsThisMonth)',
    },
    {
      data: 'Read This Year',
      Book: booksReadThisYear,
      fill: 'var(--color-booksReadsThisYear)',
    },
    {
      data: 'Total Read',
      Book: booksRead,
      fill: 'var(--color-totalBooksRead)',
    },
    { data: 'Total Books', Book: totalBooks, fill: 'var(--color-totalBooks)' },
  ];

  const chartConfig = {
    booksReadsThisMonth: {
      label: 'Read This Month',
      color: 'hsl(var(--chart-3))',
    },
    booksReadsThisYear: {
      label: 'Read This Year',
      color: 'hsl(var(--chart-5))',
    },
    totalBooksRead: {
      label: 'Total Read',
      color: 'hsl(var(--chart-4))',
    },
    totalBooks: {
      label: 'Total Books',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  return (
    <Card className='flex flex-col rounded-md'>
      <CardHeader className='items-center pb-0'>
        <CardTitle className='text-2xl font-normal tracking-[0.015em]'>
          My Book Chart
        </CardTitle>
        <CardDescription>Monthly and yearly book data</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 mt-5'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[300px] my-1'>
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={269}
            innerRadius={30}
            outerRadius={120}
            className='scale-[125%]'>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey='data' />}
            />
            <RadialBar dataKey='Book' background>
              <LabelList
                position='insideStart'
                dataKey='data'
                className='fill-black capitalize mix-blend-luminosity'
                fontSize={12}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DashboardChart;
