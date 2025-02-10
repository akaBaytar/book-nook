import { SidebarProvider } from '@/components/ui/sidebar';

import Navbar from '@/components/layout/navbar';
import AppSidebar from '@/components/layout/app-sidebar';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen>
      <Navbar />
      <AppSidebar />
      <main className='px-4 md:ps-0 my-20 md:my-4 w-full'>{children}</main>
    </SidebarProvider>
  );
};

export default RootLayout;
