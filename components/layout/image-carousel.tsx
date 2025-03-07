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

import lf_c0 from '@/images/lavender-fields/c0.jpg';
import lf_c1 from '@/images/lavender-fields/c1.jpg';
import lf_c2 from '@/images/lavender-fields/c2.jpg';
import lf_c3 from '@/images/lavender-fields/c3.jpg';
import lf_c4 from '@/images/lavender-fields/c4.jpg';
import lf_c5 from '@/images/lavender-fields/c5.jpg';
import lf_c6 from '@/images/lavender-fields/c6.jpg';
import lf_c7 from '@/images/lavender-fields/c7.jpg';
import lf_c8 from '@/images/lavender-fields/c8.jpg';
import lf_c9 from '@/images/lavender-fields/c9.jpg';

import mf_c0 from '@/images/mint-fresh/c0.jpg';
import mf_c1 from '@/images/mint-fresh/c1.jpg';
import mf_c2 from '@/images/mint-fresh/c2.jpg';
import mf_c3 from '@/images/mint-fresh/c3.jpg';
import mf_c4 from '@/images/mint-fresh/c4.jpg';
import mf_c5 from '@/images/mint-fresh/c5.jpg';
import mf_c6 from '@/images/mint-fresh/c6.jpg';
import mf_c7 from '@/images/mint-fresh/c7.jpg';
import mf_c8 from '@/images/mint-fresh/c8.jpg';
import mf_c9 from '@/images/mint-fresh/c9.jpg';

import ob_c0 from '@/images/ocean-breeze/c0.jpg';
import ob_c1 from '@/images/ocean-breeze/c1.jpg';
import ob_c2 from '@/images/ocean-breeze/c2.jpg';
import ob_c3 from '@/images/ocean-breeze/c3.jpg';
import ob_c4 from '@/images/ocean-breeze/c4.jpg';
import ob_c5 from '@/images/ocean-breeze/c5.jpg';
import ob_c6 from '@/images/ocean-breeze/c6.jpg';
import ob_c7 from '@/images/ocean-breeze/c7.jpg';
import ob_c8 from '@/images/ocean-breeze/c8.jpg';
import ob_c9 from '@/images/ocean-breeze/c9.jpg';

import sg_c0 from '@/images/sunset-glow/c0.jpg';
import sg_c1 from '@/images/sunset-glow/c1.jpg';
import sg_c2 from '@/images/sunset-glow/c2.jpg';
import sg_c3 from '@/images/sunset-glow/c3.jpg';
import sg_c4 from '@/images/sunset-glow/c4.jpg';
import sg_c5 from '@/images/sunset-glow/c5.jpg';
import sg_c6 from '@/images/sunset-glow/c6.jpg';
import sg_c7 from '@/images/sunset-glow/c7.jpg';
import sg_c8 from '@/images/sunset-glow/c8.jpg';
import sg_c9 from '@/images/sunset-glow/c9.jpg';

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
          ? lf_c0
          : theme === 'theme-mint-fresh'
          ? mf_c0
          : theme === 'theme-ocean-breeze'
          ? ob_c0
          : theme === 'theme-sunset-glow'
          ? sg_c0
          : '/placeholder.jpg',
    },
    {
      id: 1,
      image:
        theme === 'theme-soft-pastel'
          ? sp_c1
          : theme === 'theme-lavender-fields'
          ? lf_c1
          : theme === 'theme-mint-fresh'
          ? mf_c1
          : theme === 'theme-ocean-breeze'
          ? ob_c1
          : theme === 'theme-sunset-glow'
          ? sg_c1
          : '/placeholder.jpg',
    },
    {
      id: 2,
      image:
        theme === 'theme-soft-pastel'
          ? sp_c2
          : theme === 'theme-lavender-fields'
          ? lf_c2
          : theme === 'theme-mint-fresh'
          ? mf_c2
          : theme === 'theme-ocean-breeze'
          ? ob_c2
          : theme === 'theme-sunset-glow'
          ? sg_c2
          : '/placeholder.jpg',
    },
    {
      id: 3,
      image:
        theme === 'theme-soft-pastel'
          ? sp_c3
          : theme === 'theme-lavender-fields'
          ? lf_c3
          : theme === 'theme-mint-fresh'
          ? mf_c3
          : theme === 'theme-ocean-breeze'
          ? ob_c3
          : theme === 'theme-sunset-glow'
          ? sg_c3
          : '/placeholder.jpg',
    },
    {
      id: 4,
      image:
        theme === 'theme-soft-pastel'
          ? sp_c4
          : theme === 'theme-lavender-fields'
          ? lf_c4
          : theme === 'theme-mint-fresh'
          ? mf_c4
          : theme === 'theme-ocean-breeze'
          ? ob_c4
          : theme === 'theme-sunset-glow'
          ? sg_c4
          : '/placeholder.jpg',
    },
    {
      id: 5,
      image:
        theme === 'theme-soft-pastel'
          ? sp_c5
          : theme === 'theme-lavender-fields'
          ? lf_c5
          : theme === 'theme-mint-fresh'
          ? mf_c5
          : theme === 'theme-ocean-breeze'
          ? ob_c5
          : theme === 'theme-sunset-glow'
          ? sg_c5
          : '/placeholder.jpg',
    },
    {
      id: 6,
      image:
        theme === 'theme-soft-pastel'
          ? sp_c6
          : theme === 'theme-lavender-fields'
          ? lf_c6
          : theme === 'theme-mint-fresh'
          ? mf_c6
          : theme === 'theme-ocean-breeze'
          ? ob_c6
          : theme === 'theme-sunset-glow'
          ? sg_c6
          : '/placeholder.jpg',
    },
    {
      id: 7,
      image:
        theme === 'theme-soft-pastel'
          ? sp_c7
          : theme === 'theme-lavender-fields'
          ? lf_c7
          : theme === 'theme-mint-fresh'
          ? mf_c7
          : theme === 'theme-ocean-breeze'
          ? ob_c7
          : theme === 'theme-sunset-glow'
          ? sg_c7
          : '/placeholder.jpg',
    },
    {
      id: 8,
      image:
        theme === 'theme-soft-pastel'
          ? sp_c8
          : theme === 'theme-lavender-fields'
          ? lf_c8
          : theme === 'theme-mint-fresh'
          ? mf_c8
          : theme === 'theme-ocean-breeze'
          ? ob_c8
          : theme === 'theme-sunset-glow'
          ? sg_c8
          : '/placeholder.jpg',
    },
    {
      id: 9,
      image:
        theme === 'theme-soft-pastel'
          ? sp_c9
          : theme === 'theme-lavender-fields'
          ? lf_c9
          : theme === 'theme-mint-fresh'
          ? mf_c9
          : theme === 'theme-ocean-breeze'
          ? ob_c9
          : theme === 'theme-sunset-glow'
          ? sg_c9
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
