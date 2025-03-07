import Link from 'next/link';
import Image from 'next/image';

import { Button } from '../ui/button';

import { Linkedin, Instagram, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-slate-50 border-t border-slate-200 !text-black'>
      <div className='container mx-auto px-4 py-8 md:px-10'>
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
          <div className='flex items-center'>
            <Image
              src='/logo.png'
              alt='Book Nook logo'
              height={36}
              width={36}
              priority
            />
            <span className='text-xl tracking-wide'>Book Nook</span>
          </div>
          <div className='flex gap-4'>
            <Button variant='ghost' size='icon' aria-label='Instagram'>
              <Link
                href='https://www.instagram.com/obscuramanuscripts/'
                target='_blank'>
                <Instagram className='size-5' />
              </Link>
            </Button>
            <Button variant='ghost' size='icon' aria-label='Instagram'>
              <Link
                href='https://www.linkedin.com/in/akabaytar/'
                target='_blank'>
                <Linkedin className='size-5' />
              </Link>
            </Button>
            <Button variant='ghost' size='icon' aria-label='Instagram'>
              <Link href='https://github.com/akaBaytar' target='_blank'>
                <Github className='size-5' />
              </Link>
            </Button>
          </div>
        </div>
        <div className='mt-6 pt-6 border-t border-slate-200 flex flex-col-reverse sm:flex-row justify-between items-center gap-5'>
          <p className='text-sm text-slate-600'>
            © {currentYear} Ceren&apos;s Book Nook. All rights reserved.
          </p>
          <div className='flex gap-1'>
            <Button variant='ghost'>Terms of Service</Button>
            <Button variant='ghost'>Privacy Policy</Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
