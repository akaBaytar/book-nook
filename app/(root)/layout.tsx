import { SidebarProvider } from '@/components/ui/sidebar';

import Navbar from '@/components/layout/navbar';
import EndColumn from '@/components/layout/end-column';
import AppSidebar from '@/components/layout/app-sidebar';

import { ThemeProvider } from '@/context/theme';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <SidebarProvider defaultOpen>
        <Navbar />
        <AppSidebar />
        <div className='w-full flex flex-col lg:flex-row'>
          <main className='px-4 md:ps-0 mt-[7rem] mb-5 md:my-4 w-full lg:w-[calc(100%-20rem)]'>
            {children}
          </main>
          <EndColumn />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
