'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { ArrowRightIcon, RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.error(error);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) {
        const rect = document
          .querySelector('#container')!
          .getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 25;
        const y = (e.clientY - rect.top - rect.height / 2) / 25;
        setPosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [error, isHovering]);

  return (
    <div
      id='container'
      className='h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted'>
      <div
        className='relative text-center mx-5'
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.2s ease-out',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}>
        <div className='grid place-content-center'>
          <Image
            src='/logo.png'
            alt='Book Nook Logo'
            width={200}
            height={200}
          />
        </div>
        <h1 className='text-9xl font-bold text-primary mb-4'>500</h1>
        <div className='text-2xl font-semibold mb-8'>
          <span className='text-muted-foreground'>
            Oops! Something went wrong
          </span>
        </div>
        <p className='text-lg text-muted-foreground mb-8 max-w-md text-pretty'>
          We encountered an unexpected error. You can try refreshing the page or
          head back to the dashboard.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button size='lg' onClick={() => reset()}>
            Try Again
            <RefreshCcw className='size-4' />
          </Button>
          <Button
            size='lg'
            variant='outline'
            onClick={() => (window.location.href = '/dashboard')}>
            Go to Dashboard
            <ArrowRightIcon className='size-4' />
          </Button>
        </div>
      </div>
      <div className='absolute bottom-0 end-0 size-64 bg-gradient-to-br from-violet-300/40 to-pink-300/40 rounded-full blur-3xl' />
      <div className='absolute top-0 start-0 size-64 bg-gradient-to-br from-blue-300/30 to-teal-300/30 rounded-full blur-3xl' />
    </div>
  );
}
