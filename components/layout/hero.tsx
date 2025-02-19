import Link from 'next/link';
import Image from 'next/image';

import { ArrowRightIcon } from 'lucide-react';

import { auth } from '@clerk/nextjs/server';
import { SignInButton } from '@clerk/nextjs';

import { Button } from '../ui/button';

const Hero = async () => {
  const { userId } = await auth();

  return (
    <section className='relative overflow-hidden py-24 md:py-[8.5rem]'>
      <div className='container mx-auto px:4 md:px-10'>
        <div className='flex flex-col lg:flex-row items-center gap-12 lg:gap-20'>
          <div className='flex-1 space-y-8 text-center lg:text-left'>
            <div className='space-y-6 max-w-2xl mx-4 lg:mx-0'>
              <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-pretty'>
                Your Personal Library,{' '}
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-pink-500'>
                  Anytime, Anywhere
                </span>
              </h1>
              <p className='text-xl text-slate-600 leading-relaxed text-pretty xl:max-w-lg'>
                Track your progress, set reading goals and build your dream
                library with the #1 book tracking app.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                {userId ? (
                  <Button size='lg' asChild>
                    <Link href='/dashboard'>
                      Enter Book Nook
                      <ArrowRightIcon className='size-4' />
                    </Link>
                  </Button>
                ) : (
                  <SignInButton mode='modal' forceRedirectUrl='/dashboard'>
                    <Button
                      size='lg'
                      className='shadow-md shadow-violet-100'>
                      Get Started
                      <ArrowRightIcon className='size-4' />
                    </Button>
                  </SignInButton>
                )}
              </div>
            </div>
          </div>
          <div className='flex-1 relative'>
            <div className='relative z-10 p-5 rounded-lg overflow-hidden max-w-md mx-auto'>
              <Image
                src='/marketing.png'
                alt='Book Nook dashboard preview'
                width={600}
                height={600}
                priority
                className='w-full h-auto'
              />
            </div>
            <div className='absolute -bottom-6 -right-12 w-64 h-64 bg-gradient-to-br from-violet-300/40 to-pink-300/40 rounded-full blur-3xl' />
            <div className='absolute -top-12 -left-12 w-48 h-48 bg-gradient-to-br from-blue-300/30 to-teal-300/30 rounded-full blur-3xl' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
