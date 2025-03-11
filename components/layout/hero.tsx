import Link from 'next/link';
import Image from 'next/image';

import {
  TrophyIcon,
  TargetIcon,
  BookOpenIcon,
  CalendarIcon,
  ArrowRightIcon,
} from 'lucide-react';

import { auth } from '@clerk/nextjs/server';
import { SignInButton } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import TextGeneration from '@/components/shared/text-generation';

const Hero = async () => {
  const { userId } = await auth();

  return (
    <section className='relative overflow-hidden pt-32 pb-20 md:pt-36 md:pb-24 min-h-screen flex items-center'>
      <div className='container mx-auto px-4 md:px-10'>
        <div className='flex flex-col lg:flex-row items-center gap-16 lg:gap-20'>
          <div className='flex-1 space-y-8 text-center lg:text-left'>
            <div className='space-y-6 max-w-2xl mx-auto lg:mx-0'>
              <div className='inline-flex items-center px-4 py-2 rounded-full bg-violet-100 text-black/80 text-sm font-medium border-slate-100 shadow-sm'>
                <span className='flex items-center'>
                  <BookOpenIcon className='size-4 me-2' />
                  #1 Book Tracking App
                </span>
              </div>
              <TextGeneration
                words='Your Personal Library, Anytime,&nbsp;Anywhere'
                className='text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-pretty text-black'
              />
              <p className='text-xl text-black/80 leading-relaxed text-pretty xl:max-w-lg'>
                Track your progress, set reading goals, and build your dream
                library with the most beautiful and intuitive book tracking app.
              </p>
              <div className='flex gap-2.5 justify-center flex-col sm:flex-row lg:justify-start items-center text-black/80'>
                <div className='flex items-center justify-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-slate-100 shadow-sm max-w-fit'>
                  <TargetIcon className='size-4 text-violet-500' />
                  <span className='text-sm'>Track Goals</span>
                </div>
                <div className='flex items-center justify-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-slate-100 shadow-sm max-w-fit'>
                  <CalendarIcon className='size-4 text-pink-500' />
                  <span className='text-sm'>Reading Streaks</span>
                </div>
                <div className='flex items-center justify-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-slate-100 shadow-sm max-w-fit'>
                  <TrophyIcon className='size-4 text-indigo-500' />
                  <span className='text-sm'>Reading Stats</span>
                </div>
              </div>
              <div className='flex flex-col sm:flex-row gap-5 justify-center lg:justify-start'>
                {userId ? (
                  <Button
                    size='lg'
                    asChild
                    className='bg-gradient-to-r from-violet-200 to-pink-200 border-none shadow-violet-100 text-black/80'>
                    <Link href='/dashboard'>
                      Enter Book Nook
                      <ArrowRightIcon className='size-4 ml-1.5' />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <SignInButton mode='redirect' forceRedirectUrl='/dashboard'>
                      <Button
                        size='lg'
                        className='bg-gradient-to-r from-violet-200 to-pink-200 border-none shadow-violet-100 text-black/80'>
                        Get Started
                        <ArrowRightIcon className='size-4 ml-1.5' />
                      </Button>
                    </SignInButton>
                    <Link href='#features'>
                      <Button variant='outline' size='lg' className='w-full text-black/80 hover:text-black border-gray-300 hover:bg-gray-100'>
                        See Features
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className='flex-1 relative'>
            <div className='relative z-10 p-5 rounded-2xl overflow-hidden max-w-md mx-auto rotate-1 hover:rotate-0 transition-transform duration-500'>
              <div className='absolute inset-0 bg-gradient-to-tr from-violet-200 to-pink-200 rounded-2xl transform -rotate-1'></div>
              <div className='relative z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-slate-100 overflow-hidden'>
                <Image
                  src='/marketing.png'
                  alt='Book Nook dashboard preview'
                  width={600}
                  height={600}
                  priority
                  className='w-full h-auto rounded-lg transform transition-transform hover:scale-[1.02] duration-500'
                />
              </div>
              <div className='absolute top-0 right-0 w-24 h-24 bg-pink-300/20 rounded-full blur-xl' />
              <div className='absolute bottom-0 left-0 w-32 h-32 bg-violet-300/20 rounded-full blur-xl' />
            </div>
            <div className='absolute -bottom-6 -right-12 w-64 h-64 bg-gradient-to-br from-violet-300/40 to-pink-300/40 rounded-full blur-3xl' />
            <div className='absolute -top-12 -left-12 w-48 h-48 bg-gradient-to-br from-blue-300/30 to-indigo-500/30 rounded-full blur-3xl' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
