import Link from 'next/link';
import Image from 'next/image';

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
        <Image
          src='/logo.png'
          alt='book nook app logo'
          height={50}
          width={50}
          priority
        />
        <p className='min-w-[64px] text-2xl text-center mt-2 tracking-wide px-2 rounded-md text-white bg-gradient-to-r from-violet-200 to-pink-200'>
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
