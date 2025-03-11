import Link from 'next/link';
import Image from 'next/image';

import {
  MailIcon,
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-slate-50 border-t border-slate-200'>
      <div className='container mx-auto px-6 py-16 md:px-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
          <div className='space-y-6 md:col-span-2'>
            <div className='flex items-center justify-center lg:justify-start'>
              <Image
                src='/logo.png'
                alt='Book Nook logo'
                height={40}
                width={40}
                priority
                className='h-10 w-10'
              />
              <span className='text-xl font-medium tracking-wide ml-3 text-black'>
                Book Nook
              </span>
            </div>
            <p className='text-black/80 max-w-md mx-auto lg:mx-0 text-sm text-center lg:text-start text-pretty'>
              Your personal book tracking companion. Organize your reading life
              and discover your next favorite book.
            </p>
          </div>
          <div className='text-center lg:text-start'>
            <h3 className='font-semibold mb-4 text-black'>Quick Links</h3>
            <ul className='space-y-3 text-black/80'>
              <li>
                <Link
                  href='#features'
                  className='text-sm hover:text-black transition-colors duration-200'>
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href='#pricing'
                  className='text-sm hover:text-black transition-colors duration-200'>
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href='#faq'
                  className='text-sm hover:text-black transition-colors duration-200'>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className='text-center lg:text-start'>
            <h3 className='font-semibold mb-4 text-black'>Legal</h3>
            <ul className='space-y-3 text-black/80'>
              <li>
                <Button
                  variant='link'
                  className='p-0 h-auto transition-colors duration-200 hover:no-underline text-black/80 hover:text-black'>
                  Terms of Service
                </Button>
              </li>
              <li>
                <Button
                  variant='link'
                  className='p-0 h-auto transition-colors duration-200 hover:no-underline text-black/80 hover:text-black'>
                  Privacy Policy
                </Button>
              </li>
              <li>
                <Button
                  variant='link'
                  className='p-0 h-auto transition-colors duration-200 hover:no-underline text-black/80 hover:text-black'>
                  Cookie Policy
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div className='pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-6'>
          <p className='text-sm text-gray-500 order-2 sm:order-1'>
            © {currentYear} Ceren&apos;s Book Nook. All rights reserved.
          </p>
          <div className='flex gap-4 order-1 sm:order-2 text-black'>
            <Button
              variant='ghost'
              size='icon'
              aria-label='Instagram'
              className='hover:bg-slate-100'
              asChild>
              <Link
                href='https://www.instagram.com/obscuramanuscripts/'
                target='_blank'>
                <InstagramIcon className='size-5' />
              </Link>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              aria-label='Linkedin'
              className='hover:bg-slate-100'
              asChild>
              <Link
                href='https://www.linkedin.com/in/akabaytar/'
                target='_blank'>
                <LinkedinIcon className='size-5' />
              </Link>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              aria-label='Github'
              className='hover:bg-slate-100'
              asChild>
              <Link href='https://github.com/akaBaytar' target='_blank'>
                <GithubIcon className='size-5' />
              </Link>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              aria-label='Email'
              className='hover:bg-slate-100'
              asChild>
              <Link href='mailto:contact@burakbilgili.co.uk'>
                <MailIcon className='size-5' />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
