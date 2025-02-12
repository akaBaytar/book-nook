import Image from 'next/image';

import { UserButton } from '@clerk/nextjs';
import { ClerkLoading } from '@clerk/nextjs';

import { UserCogIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { SidebarTrigger } from '@/components/ui/sidebar';

const Navbar = () => {
  return (
    <nav className='rounded-md fixed top-4 start-4 end-4 md:hidden p-2 flex justify-between items-center bg-sidebar border z-10 shadow-md'>
      <SidebarTrigger />
      <div className='flex items-center'>
        <Image
          src='/logo.png'
          alt='book nook app logo'
          height={36}
          width={36}
          priority
        />
        <p className='min-w-[64px] text-sm text-center tracking-wide'>
          Book Nook
        </p>
      </div>
      <UserButton
        appearance={{
          elements: {
            avatarBox: 'size-8 rounded-md',
            userButtonPopoverCard: 'w-[17rem]',
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
