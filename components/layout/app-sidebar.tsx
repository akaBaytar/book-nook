'use client';

import Link from 'next/link';
import Image from 'next/image';

import { UserButton, useUser } from '@clerk/nextjs';

import {
  ListTreeIcon,
  SparklesIcon,
  LibraryBigIcon,
  LayoutDashboardIcon,
} from 'lucide-react';

import {
  Sidebar,
  useSidebar,
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
    title: 'My Books',
    url: '/books',
    icon: LibraryBigIcon,
  },
  {
    title: 'My Lists',
    url: '/my-lists',
    icon: ListTreeIcon,
  },
  {
    title: 'To Be Read',
    url: '/tbr-game',
    icon: SparklesIcon,
  },
];

const AppSidebar = () => {
  const { user } = useUser();

  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar side='left' variant='floating'>
      <SidebarHeader>
        <Link href='/dashboard' className='flex items-center'>
          <Image
            src='/logo.png'
            alt='book nook app logo'
            height={70}
            width={70}
            priority
          />
          <p className='min-w-[76px] text-center tracking-wide text-2xl mt-3 px-2 rounded-md text-white bg-gradient-to-r from-violet-200 to-pink-200'>
            Book Nook
          </p>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  onClick={() => setOpenMobile(false)}>
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
            <ImageCarousel orientation='start' isBoxed={false} />
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
                userButtonPopoverCard: 'w-[15rem]',
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
