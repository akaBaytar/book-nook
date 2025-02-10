import DashboardGrid from '@/components/shared/dashboard-grid';
import DashboardChart from '@/components/shared/dashboard-chart';

const DashboardPage = () => {
  return (
    <>
      <h1 className='text-2xl font-medium'>Dashboard</h1>
      <DashboardChart />
      <DashboardGrid />
    </>
  );
};

export default DashboardPage;
