import DashboardGrid from '@/components/shared/dashboard-grid';
import DashboardChart from '@/components/shared/dashboard-chart';

import { getBookStats } from '@/actions/dashboard.action';

const DashboardPage = async () => {
  const {
    booksRead,
    totalBooks,
    readingGoal,
    goalProgress,
    dailyAverage,
    readingStreak,
    booksRemaining,
    monthlyProgress,
    currentlyReading,
    booksReadThisYear,
    booksReadThisMonth,
  } = await getBookStats();

  return (
    <div className='bg-sidebar rounded-md border border-pink-100 p-4 min-h-[calc(100vh-2rem)]'>
      <DashboardChart
        booksRead={booksRead || 0}
        totalBooks={totalBooks || 0}
        booksReadThisYear={booksReadThisYear || 0}
        booksReadThisMonth={booksReadThisMonth || 0}
      />
      <DashboardGrid
        booksRead={booksRead || 0}
        booksReadThisYear={booksReadThisYear || 0}
        totalBooks={totalBooks || 0}
        readingGoal={readingGoal || 0}
        goalProgress={goalProgress || 0}
        booksRemaining={booksRemaining || 0}
        currentlyReading={currentlyReading}
        dailyAverage={
          dailyAverage || {
            pages: 0,
            period: 0,
          }
        }
        readingStreak={
          readingStreak || {
            currentStreak: 0,
            personalBest: 0,
          }
        }
        monthlyProgress={
          monthlyProgress || {
            count: 0,
            pagesRead: 0,
          }
        }
      />
    </div>
  );
};

export default DashboardPage;
