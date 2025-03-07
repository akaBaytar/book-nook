'use client';

import Link from 'next/link';

import { dark } from '@clerk/themes';
import { ClerkLoading, UserButton } from '@clerk/nextjs';

import { UserCogIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

import { useTheme } from '@/context/theme';

const Navbar = () => {
  const { theme } = useTheme();

  const isDark =
    theme === 'theme-midnight-nebula' || theme === 'theme-deep-ocean';

  return (
    <nav className='rounded-md fixed top-4 h-20 start-4 end-4 md:hidden px-4 flex justify-between items-center border z-10 shadow-md border-muted bg-sidebar/50 backdrop-blur-sm'>
      <SidebarTrigger />
      <Link href='/dashboard' className='flex items-center'>
        <p className='text-2xl text-center tracking-wide px-2 h-8 border border-muted shadow-sm grid place-content-center rounded-md bg-gradient-to-r from-muted to-secondary'>
          Book Nook
        </p>
      </Link>
      <UserButton
        userProfileMode='navigation'
        userProfileUrl='/my-account'
        appearance={{
          baseTheme: isDark ? dark : undefined,
          elements: {
            avatarBox: 'size-8 rounded-md',
            userButtonPopoverCard: 'w-[15rem]',
            userButtonTrigger: 'rounded-md',
          },
          layout: { unsafe_disableDevelopmentModeWarnings: true },
        }}
      />
      <ClerkLoading>
        <Button size='icon' variant='outline' className='size-8'>
          <UserCogIcon className='size-5' />
        </Button>
      </ClerkLoading>
    </nav>
  );
};

export default Navbar;
