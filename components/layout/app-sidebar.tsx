'use client';

import { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import * as z from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { UserButton, useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { updateReadingGoal } from '@/actions/dashboard.action';

import ImageCarousel from './image-carousel';
import SearchDialog from '../shared/search-dialog';
import ThemeSwitcher from './theme-switcher';

import { useTheme } from '@/context/theme';

const formSchema = z.object({
  goal: z
    .number()
    .min(0, { message: 'Goal must be a positive number' })
    .max(1000, { message: 'Goal must be reasonable (max 1000)' }),
});

const AppSidebar = () => {
  const { user } = useUser();

  const { theme } = useTheme();

  const isDark = theme === 'theme-midnight-nebula';

  const { setOpenMobile } = useSidebar();

  const [loading, setLoading] = useState(true);

  const [searchOpen, setSearchOpen] = useState(false);
  const [goalDialogOpen, setGoalDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goal: 0,
    },
  });

  const onSubmitGoal = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await updateReadingGoal(values.goal);
      if (response.success) {
        toast.success(response.message);

        setGoalDialogOpen(false);
      } else {
        toast.error(response.message || 'Failed to update reading goal');
      }
    } catch {
      toast.error('An error occurred.');
    }
  };

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
              height={70}
              width={70}
              priority
            />
            <p
              className={`${
                isDark ? 'text-[#d5d7dd]' : 'text-[#1E201E]'
              } min-w-[76px] text-center tracking-wide font-light text-2xl px-2 rounded-md`}>
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
                <SidebarSeparator className='my-1.5' />
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
                <SidebarSeparator className='my-1.5' />
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
                <SidebarSeparator className='my-1.5' />
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
                <p className='text-xs'>
                  {user?.emailAddresses[0].emailAddress}
                </p>
              </div>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>

      <SearchDialog searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      <Dialog open={goalDialogOpen} onOpenChange={setGoalDialogOpen}>
        <DialogContent style={{ zIndex: 9999 }}>
          <DialogHeader>
            <DialogTitle>Set Reading Goal</DialogTitle>
            <DialogDescription>
              Set your yearly reading target.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitGoal)}
              className='space-y-4'>
              <FormField
                control={form.control}
                name='goal'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Number of books'
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className='w-full'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type='submit'>Set Goal</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppSidebar;
