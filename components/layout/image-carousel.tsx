'use client';

import Image from 'next/image';

import Autoplay from 'embla-carousel-autoplay';

import { Card } from '../ui/card';

import {
  Carousel,
  CarouselItem,
  CarouselContent,
} from '@/components/ui/carousel';

import { useTheme } from '@/context/theme';

import sp_c0 from '@/images/soft-pastel/c0.jpg';
import sp_c1 from '@/images/soft-pastel/c1.jpg';
import sp_c2 from '@/images/soft-pastel/c2.jpg';
import sp_c3 from '@/images/soft-pastel/c3.jpg';
import sp_c4 from '@/images/soft-pastel/c4.jpg';
import sp_c5 from '@/images/soft-pastel/c5.jpg';
import sp_c6 from '@/images/soft-pastel/c6.jpg';
import sp_c7 from '@/images/soft-pastel/c7.jpg';
import sp_c8 from '@/images/soft-pastel/c8.jpg';
import sp_c9 from '@/images/soft-pastel/c9.jpg';

type PropTypes = { orientation: 'start' | 'end'; isBoxed?: boolean };

const ImageCarousel = ({ orientation, isBoxed = true }: PropTypes) => {
  const { theme } = useTheme();

  const CAROUSEL = [
    {
      id: 0,
      image:
        theme === 'theme-soft-pastel'
          ? sp_c0
          : theme === 'theme-lavender-fields'
          ? '/placeholder.jpg'
          : theme === 'theme-mint-fresh'
          ? '/placeholder.jpg'
          : theme === 'theme-ocean-breeze'
          ? '/placeholder.jpg'
          : theme === 'theme-sunset-glow'
          ? '/placeholder.jpg'
          : '/placeholder.jpg',
    },
    {
      id: 1,
      image:
        theme === 'theme-soft-pastel'
          ? sp_c1
          : theme === 'theme-lavender-fields'
          ? '/placeholder.jpg'
          : theme === 'theme-mint-fresh'
          ? '/placeholder.jpg'
          : theme === 'theme-ocean-breeze'
          ? '/placeholder.jpg'
          : theme === 'theme-sunset-glow'
          ? '/placeholder.jpg'
          : '/placeholder.jpg',
    },
    {
      id: 2,
      image:
        theme === 'theme-soft-pastel'
          ? sp_c2
          : theme === 'theme-lavender-fields'
          ? '/placeholder.jpg'
          : theme === 'theme-mint-fresh'
          ? '/placeholder.jpg'
          : theme === 'theme-ocean-breeze'
          ? '/placeholder.jpg'
          : theme === 'theme-sunset-glow'
          ? '/placeholder.jpg'
          : '/placeholder.jpg',
    },
    {
      id: 3,
      image:
        theme === 'theme-soft-pastel'
          ? sp_c3
          : theme === 'theme-lavender-fields'
          ? '/placeholder.jpg'
          : theme === 'theme-mint-fresh'
          ? '/placeholder.jpg'
          : theme === 'theme-ocean-breeze'
          ? '/placeholder.jpg'
          : theme === 'theme-sunset-glow'
          ? '/placeholder.jpg'
          : '/placeholder.jpg',
    },
    {
      id: 4,
      image:
        theme === 'theme-soft-pastel'
          ? sp_c4
          : theme === 'theme-lavender-fields'
          ? '/placeholder.jpg'
          : theme === 'theme-mint-fresh'
          ? '/placeholder.jpg'
          : theme === 'theme-ocean-breeze'
          ? '/placeholder.jpg'
          : theme === 'theme-sunset-glow'
          ? '/placeholder.jpg'
          : '/placeholder.jpg',
    },
    {
      id: 5,
      image:
        theme === 'theme-soft-pastel'
          ? sp_c5
          : theme === 'theme-lavender-fields'
          ? '/placeholder.jpg'
          : theme === 'theme-mint-fresh'
          ? '/placeholder.jpg'
          : theme === 'theme-ocean-breeze'
          ? '/placeholder.jpg'
          : theme === 'theme-sunset-glow'
          ? '/placeholder.jpg'
          : '/placeholder.jpg',
    },
    {
      id: 6,
      image:
        theme === 'theme-soft-pastel'
          ? sp_c6
          : theme === 'theme-lavender-fields'
          ? '/placeholder.jpg'
          : theme === 'theme-mint-fresh'
          ? '/placeholder.jpg'
          : theme === 'theme-ocean-breeze'
          ? '/placeholder.jpg'
          : theme === 'theme-sunset-glow'
          ? '/placeholder.jpg'
          : '/placeholder.jpg',
    },
    {
      id: 7,
      image:
        theme === 'theme-soft-pastel'
          ? sp_c7
          : theme === 'theme-lavender-fields'
          ? '/placeholder.jpg'
          : theme === 'theme-mint-fresh'
          ? '/placeholder.jpg'
          : theme === 'theme-ocean-breeze'
          ? '/placeholder.jpg'
          : theme === 'theme-sunset-glow'
          ? '/placeholder.jpg'
          : '/placeholder.jpg',
    },
    {
      id: 8,
      image:
        theme === 'theme-soft-pastel'
          ? sp_c8
          : theme === 'theme-lavender-fields'
          ? '/placeholder.jpg'
          : theme === 'theme-mint-fresh'
          ? '/placeholder.jpg'
          : theme === 'theme-ocean-breeze'
          ? '/placeholder.jpg'
          : theme === 'theme-sunset-glow'
          ? '/placeholder.jpg'
          : '/placeholder.jpg',
    },
    {
      id: 9,
      image:
        theme === 'theme-soft-pastel'
          ? sp_c9
          : theme === 'theme-lavender-fields'
          ? '/placeholder.jpg'
          : theme === 'theme-mint-fresh'
          ? '/placeholder.jpg'
          : theme === 'theme-ocean-breeze'
          ? '/placeholder.jpg'
          : theme === 'theme-sunset-glow'
          ? '/placeholder.jpg'
          : '/placeholder.jpg',
    },
  ];

  const images = orientation === 'start' ? CAROUSEL : [...CAROUSEL].reverse();

  if (isBoxed) {
    return (
      <Card className='p-8 rounded-md'>
        <Carousel
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 120000,
            }),
          ]}>
          <CarouselContent>
            {images.map(({ id, image }) => (
              <CarouselItem key={id}>
                <Image
                  src={image}
                  width={400}
                  height={400}
                  priority
                  alt='carousel image'
                  className='rounded-md size-full object-cover'
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Card>
    );
  }

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 120000,
        }),
      ]}>
      <CarouselContent className='h-[220px]'>
        {images.map(({ id, image }) => (
          <CarouselItem key={id}>
            <Image
              src={image}
              width={400}
              height={400}
              priority
              alt='carousel image'
              className='rounded-md size-full object-cover'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ImageCarousel;
