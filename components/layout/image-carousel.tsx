'use client';

import Image from 'next/image';

import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselItem,
  CarouselContent,
} from '@/components/ui/carousel';

import { CAROUSEL } from '@/mock';

const ImageCarousel = () => {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 120000,
        }),
      ]}
      className='px-2'>
      <CarouselContent>
        {CAROUSEL.map(({ id, image }) => (
          <CarouselItem key={id}>
            <Image
              src={image}
              width={400}
              height={400}
              alt='placeholder image'
              className='rounded-md cursor-ew-resize'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ImageCarousel;
