'use client';

import Image from 'next/image';

import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselItem,
  CarouselContent,
} from '@/components/ui/carousel';

const ImageCarousel = () => {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 120000,
        }),
      ]}>
      <CarouselContent>
        <CarouselItem>
          <Image
            src='/placeholder.svg'
            width={600}
            height={400}
            alt='placeholder image'
            className='rounded-md'
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src='/placeholder.svg'
            width={600}
            height={400}
            alt='placeholder image'
            className='rounded-md'
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default ImageCarousel;
