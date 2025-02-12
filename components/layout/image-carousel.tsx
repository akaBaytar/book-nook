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

const ImageCarousel = () => {
  return (
    <Card className='flex items-center justify-center p-4 rounded-md'>
      <Carousel
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 120000,
          }),
        ]}>
        <CarouselContent>
          {CAROUSEL.map(({ id, image }) => (
            <CarouselItem key={id} className='w-full'>
              <Image
                src={image}
                width={400}
                height={400}
                alt='placeholder image'
                className='rounded-md w-full max-h-80 object-cover'
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Card>
  );
};

export default ImageCarousel;
