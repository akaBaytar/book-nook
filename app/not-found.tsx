'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { HomeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

const NotFound = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
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
  }, [isHovering]);

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
        <h1 className='text-9xl font-bold text-primary mb-4'>404</h1>
        <div className='text-2xl font-semibold mb-8'>
          <span className='text-muted-foreground'>Oops! Page </span>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400'>
            not
          </span>
          <span className='text-muted-foreground'> found</span>
        </div>
        <p className='text-lg text-muted-foreground mb-8 max-w-md text-pretty'>
          The page you&apos;re looking for has drifted off into the digital
          void. Let&apos;s get you back to familiar territory.
        </p>
        <Button size='lg' onClick={() => (window.location.href = '/dashboard')}>
          <HomeIcon />
          Go Dashboard
        </Button>
      </div>
      <div className='absolute bottom-0 end-0 size-64 bg-gradient-to-br from-violet-300/40 to-pink-300/40 rounded-full blur-3xl' />
      <div className='absolute top-0 start-0 size-64 bg-gradient-to-br from-blue-300/30 to-teal-300/30 rounded-full blur-3xl' />
    </div>
  );
};

export default NotFound;
