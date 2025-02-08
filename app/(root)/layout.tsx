import { SidebarProvider } from '@/components/ui/sidebar';

import Navbar from '@/components/layout/navbar';
import AppSidebar from '@/components/layout/app-sidebar';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen>
      <Navbar />
      <AppSidebar />
      <main className='ps-2 pe-4 mt-20 md:mt-6 w-full'>{children}</main>
    </SidebarProvider>
  );
};

export default RootLayout;
