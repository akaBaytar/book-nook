import Image from 'next/image';

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-5xl'>
      <div className='mt-5'>
        <Image
          src='/marketing.png'
          alt='book illustration'
          width={400}
          height={400}
          priority
          className='object-cover max-w-full'
        />
      </div>
    </div>
  );
};

export default Hero;
