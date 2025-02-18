import Image from 'next/image';

import { Button } from '../ui/button';

const Footer = () => {
  return (
    <footer className='flex items-center w-full px-5 pb-5'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center'>
          <Image
            src='/logo.png'
            alt='book nook app logo'
            height={32}
            width={32}
            priority
          />
          <p className='truncate text-xs text-muted-foreground min-w-fit font-medium'>Book Nook</p>
        </div>
        <div className='w-full flex items-center justify-end gap-1 text-muted-foreground'>
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
