'use client';

import Image from 'next/image';

import Autoplay from 'embla-carousel-autoplay';

import { Card } from '../ui/card';

import {
  Carousel,
  CarouselItem,
  CarouselContent,
} from '@/components/ui/carousel';

import { CAROUSEL } from '@/mock';

type PropTypes = { orientation: 'start' | 'end'; isBoxed?: boolean };

const ImageCarousel = ({ orientation, isBoxed = true }: PropTypes) => {
  const images = orientation === 'start' ? CAROUSEL : [...CAROUSEL].reverse();

  if (isBoxed) {
    return (
      <Card className='flex items-center justify-center p-8 rounded-md'>
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
                  alt='placeholder image'
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
      <CarouselContent>
        {images.map(({ id, image }) => (
          <CarouselItem key={id}>
            <Image
              src={image}
              width={400}
              height={400}
              alt='placeholder image'
              className='rounded-md size-full object-cover'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ImageCarousel;
