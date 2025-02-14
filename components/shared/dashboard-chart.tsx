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

const chartData = [
  {
    data: 'Books Reads This Month',
    Book: 13,
    fill: 'var(--color-booksReadsThisMonth)',
  },
  {
    data: 'Books Reads This Year',
    Book: 96,
    fill: 'var(--color-booksReadsThisYear)',
  },
  { data: 'Total Books Read', Book: 245, fill: 'var(--color-totalBooksRead)' },
  { data: 'Total Books', Book: 273, fill: 'var(--color-totalBooks)' },
];

const chartConfig = {
  booksReadsThisYear: {
    label: 'Books Reads This Year',
    color: '#8ebaa3',
  },
  booksReadsThisMonth: {
    label: 'Books Reads This Month',
    color: '#709dad',
  },
  totalBooksRead: {
    label: 'Total Books Read',
    color: '#a3aed3',
  },
  totalBooks: {
    label: 'Total Books',
    color: '#d7b6',
  },
} satisfies ChartConfig;

const DashboardChart = () => {
  return (
    <Card className='flex flex-col rounded-md'>
      <CardHeader className='items-center pb-0'>
        <CardTitle className='text-2xl font-normal tracking-[0.015em]'>My Book Chart</CardTitle>
        <CardDescription>Monthly and yearly book data</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
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
