import Link from 'next/link';

import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

import {
  DicesIcon,
  SearchIcon,
  ListTreeIcon,
  LibraryBigIcon,
  LayoutDashboardIcon,
} from 'lucide-react';

import {
  Sidebar,
  SidebarMenu,
  SidebarGroup,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarMenuButton,
  SidebarGroupContent,
} from '@/components/ui/sidebar';

import ImageCarousel from './image-carousel';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboardIcon,
  },
  {
    title: 'All Books',
    url: '/all-books',
    icon: LibraryBigIcon,
  },
  {
    title: 'My Lists',
    url: '/my-lists',
    icon: ListTreeIcon,
  },
  {
    title: 'Search',
    url: '/search',
    icon: SearchIcon,
  },
  {
    title: 'TBR Game',
    url: '/tbr-game',
    icon: DicesIcon,
  },
];

const AppSidebar = async () => {
  const user = await currentUser();

  return (
    <Sidebar side='left' variant='floating'>
      <SidebarHeader>
        <p className='font-semibold text-3xl text-center'>LOGO IPSUM</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <ImageCarousel />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator className='hidden md:block' />
      <SidebarFooter>
        <div className='hidden md:flex items-center gap-2'>
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'size-10 rounded-md',
                userButtonPopoverCard: 'w-[17rem]',
                 userButtonTrigger: 'rounded-md',
              },
            }}
          />
          <div className='flex flex-col'>
            <p className='text-sm font-medium'>
              {user?.firstName} {user?.lastName}
            </p>
            <p className='text-xs text-gray-500'>
              {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
