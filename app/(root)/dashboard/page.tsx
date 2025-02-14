import DashboardGrid from '@/components/shared/dashboard-grid';
import DashboardChart from '@/components/shared/dashboard-chart';

const DashboardPage = () => {
  return (
    <div className='bg-sidebar rounded-md border border-pink-100 p-4 min-h-[calc(100vh-2rem)]'>
      <DashboardChart />
      <DashboardGrid />
    </div>
  );
};

export default DashboardPage;
