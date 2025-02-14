import Link from 'next/link';
import Image from 'next/image';

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
        <div className='flex items-center'>
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
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.title === 'Search' ? (
                      <button>
                        <item.icon />
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    )}
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
