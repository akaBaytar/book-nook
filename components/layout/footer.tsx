import Image from 'next/image';

import { Button } from '../ui/button';

const Footer = () => {
  return (
    <footer className='flex items-center w-full'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center'>
          <Image
            src='/logo.png'
            alt='book nook app logo'
            height={50}
            width={50}
            priority
          />
          <p className='min-w-20 text-center tracking-wide mt-3'>Book Nook</p>
        </div>
        <div className='w-full ms-auto flex items-center justify-end text-muted-foreground'>
          <Button variant='ghost' size='sm'>
            Privacy Policy
          </Button>
          <Button variant='ghost' size='sm'>
            Terms & Conditions
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
