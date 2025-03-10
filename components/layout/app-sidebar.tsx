'use client';

import { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { dark } from '@clerk/themes';

import { UserButton, useUser } from '@clerk/nextjs';

import {
  SearchIcon,
  TargetIcon,
  PickaxeIcon,
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

import { Skeleton } from '../ui/skeleton';

import ImageCarousel from './image-carousel';
import ThemeSwitcher from './theme-switcher';
import GoalDialog from '../shared/goal-dialog';
import SearchDialog from '../shared/search-dialog';

import { useTheme } from '@/context/theme';

const AppSidebar = () => {
  const { user } = useUser();

  const { theme } = useTheme();

  const isDark =
    theme === 'theme-midnight-nebula' || theme === 'theme-deep-ocean';

  const { setOpenMobile } = useSidebar();

  const [loading, setLoading] = useState(true);

  const [searchOpen, setSearchOpen] = useState(false);
  const [goalDialogOpen, setGoalDialogOpen] = useState(false);

  const openSearchDialog = () => {
    setOpenMobile(false);

    setTimeout(() => {
      setSearchOpen(true);
    }, 100);
  };

  const openGoalDialog = () => {
    setOpenMobile(false);

    setTimeout(() => {
      setGoalDialogOpen(true);
    }, 100);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Sidebar side='left' variant='floating'>
        <SidebarHeader>
          <Link href='/dashboard' className='flex items-center'>
            <Image
              src={isDark ? '/logo-dark.png' : '/logo.png'}
              alt='book nook app logo'
              height={50}
              width={50}
              priority
            />
            <p
              className={`${
                isDark ? 'text-[#d5d7dd]' : 'text-[#1E201E]'
              } min-w-[76px] text-center tracking-wide font-light text-xl px-1 rounded-md`}>
              Book Nook
            </p>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem onClick={() => setOpenMobile(false)}>
                  <SidebarMenuButton asChild>
                    <Link href='/dashboard'>
                      <LayoutDashboardIcon />
                      Dashboard
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem onClick={() => setOpenMobile(false)}>
                  <SidebarMenuButton asChild>
                    <Link href='/tbr-game'>
                      <SparklesIcon />
                      To Be Read
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarSeparator className='my-0.5' />
                <SidebarMenuItem onClick={() => setOpenMobile(false)}>
                  <SidebarMenuButton asChild>
                    <Link href='/books'>
                      <LibraryBigIcon />
                      My Books
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem onClick={() => setOpenMobile(false)}>
                  <SidebarMenuButton asChild>
                    <Link href='/my-lists'>
                      <ListTreeIcon />
                      My Lists
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarSeparator className='my-0.5' />
                <SidebarMenuItem onClick={() => setOpenMobile(false)}>
                  <SidebarMenuButton asChild>
                    <Link href='/goal-progress'>
                      <TargetIcon />
                      Reading Goal Progress
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={openGoalDialog}>
                    <PickaxeIcon />
                    Set Reading Goal
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarSeparator className='my-0.5' />
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={openSearchDialog}>
                    <SearchIcon />
                    Search
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <ThemeSwitcher />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupContent>
              <ImageCarousel orientation='start' isBoxed={false} />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          {loading ? (
            <Skeleton className='h-10 w-[241px]' />
          ) : (
            <div className='hidden md:flex items-center gap-2'>
              <UserButton
                userProfileMode='navigation'
                userProfileUrl='/my-account'
                appearance={{
                  baseTheme: isDark ? dark : undefined,
                  elements: {
                    avatarBox: 'size-10 rounded-md',
                    userButtonPopoverCard: 'w-[15rem]',
                    userButtonTrigger: 'rounded-md',
                  },
                  layout: { unsafe_disableDevelopmentModeWarnings: true },
                }}
              />
              <div className='flex flex-col'>
                <p className='text-sm font-medium'>
                  {user?.firstName} {user?.lastName}
                </p>
                <p className='text-xs'>
                  {user?.emailAddresses[0].emailAddress}
                </p>
              </div>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <GoalDialog open={goalDialogOpen} onOpenChange={setGoalDialogOpen} />
    </>
  );
};

export default AppSidebar;
