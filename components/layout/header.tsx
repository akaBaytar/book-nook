import Link from 'next/link';
import Image from 'next/image';

import { ArrowRightIcon } from 'lucide-react';

import { auth } from '@clerk/nextjs/server';
import { SignInButton } from '@clerk/nextjs';

import { Button } from '../ui/button';

const Header = async () => {
  const { userId } = await auth();

  return (
    <header className='w-full border-b border-slate-200 bg-white/50 backdrop-blur-sm fixed top-0 z-50 !text-black'>
      <div className='container mx-auto flex items-center justify-between p-4 md:px-10'>
        <div className='flex items-center'>
          <Image
            src='/logo.png'
            alt='Book Nook logo'
            height={36}
            width={36}
            priority
            className='h-9 w-9'
          />
          <span className='text-xl tracking-wide'>Book Nook</span>
        </div>
        <div className='flex items-center gap-4'>
          {userId ? (
            <Button
              asChild
              className='bg-gradient-to-r from-violet-200 to-pink-200 border-none shadow-violet-100'>
              <Link href='/dashboard'>
                Go to Dashboard
                <ArrowRightIcon className='size-4' />
              </Link>
            </Button>
          ) : (
            <>
              <SignInButton mode='modal'>
                <Button variant='ghost' className='hidden sm:flex'>
                  Log in
                </Button>
              </SignInButton>
              <SignInButton mode='modal' forceRedirectUrl='/dashboard'>
                <Button className='bg-gradient-to-r from-violet-200 to-pink-200 border-none shadow-violet-100'>
                  Get Started
                  <ArrowRightIcon className='size-4' />
                </Button>
              </SignInButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
