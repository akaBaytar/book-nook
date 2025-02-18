import Link from 'next/link';

import { UserButton } from '@clerk/nextjs';
import { ClerkLoading } from '@clerk/nextjs';

import { UserCogIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { SidebarTrigger } from '@/components/ui/sidebar';

const Navbar = () => {
  return (
    <nav className='rounded-md fixed top-4 start-4 end-4 md:hidden p-2 flex justify-between items-center bg-sidebar border border-pink-100 z-10 shadow-md'>
      <SidebarTrigger />
      <Link href='/dashboard' className='flex items-center'>
        <p className='text-2xl text-center tracking-wide px-2 h-8 border shadow-sm grid place-content-center rounded-md text-white bg-gradient-to-r from-violet-200 to-pink-200'>
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
