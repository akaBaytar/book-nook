import Link from 'next/link';

import { UserButton } from '@clerk/nextjs';
import { ClerkLoading } from '@clerk/nextjs';

import { UserCogIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { SidebarTrigger } from '@/components/ui/sidebar';

const Navbar = () => {
  return (
    <nav className='rounded-md fixed top-4 h-20 start-4 end-4 md:hidden px-4 flex justify-between items-center border z-10 shadow-md border-muted bg-sidebar/50 backdrop-blur-sm'>
      <SidebarTrigger />
      <Link href='/dashboard' className='flex items-center'>
        <p className='text-2xl text-center tracking-wide px-2 h-8 border border-muted shadow-sm grid place-content-center rounded-md bg-gradient-to-r from-muted to-secondary'>
          Book Nook
        </p>
      </Link>
      <UserButton
        appearance={{
          elements: {
            avatarBox: 'size-8 rounded-md',
            userButtonPopoverCard: 'w-[15rem]',
            userButtonTrigger: 'rounded-md',
          },
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
