import { SidebarProvider } from '@/components/ui/sidebar';

import Navbar from '@/components/layout/navbar';
import AppSidebar from '@/components/layout/app-sidebar';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <main>
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default RootLayout;
