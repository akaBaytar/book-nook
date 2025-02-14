import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { auth } from '@clerk/nextjs/server';
import { SignInButton } from '@clerk/nextjs';

import { Button } from '../ui/button';

const Header = async () => {
  const { userId } = await auth();

  return (
    <header className='max-w-2xl space-y-5'>
      <h1 className='text-2xl sm:text-4xl md:text-5xl font-semibold text-pretty leading-snug'>
        Your Personal Library, Anytime, Anywhere.
        <p className='mt-5'>
          Welcome to{' '}
          <span className='bg-[#d7b6cb] px-4 rounded-md'>Book Nook</span>
        </p>
      </h1>
      <h3 className='text-base sm:text-xl md:text-2xl font-medium leading-loose text-pretty'>
        Track your progress, set reading goals and build your dream library.
      </h3>
      {userId && (
        <Button size='lg' asChild>
          <Link href='/dashboard'>
            Enter Book Nook
            <ArrowRight className='h-4 w-4' />
          </Link>
        </Button>
      )}
      {!userId && (
        <SignInButton mode='modal' forceRedirectUrl='/dashboard'>
          <Button size='lg'>Get Book Nook Free</Button>
        </SignInButton>
      )}
    </header>
  );
};

export default Header;
