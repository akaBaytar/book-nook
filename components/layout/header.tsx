import Link from 'next/link';
import Image from 'next/image';

import { ArrowRightIcon, MenuIcon } from 'lucide-react';

import { auth } from '@clerk/nextjs/server';
import { SignInButton } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

import {
  Sheet,
  SheetClose,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

const Header = async () => {
  const { userId } = await auth();

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className='w-full border-b border-slate-200 bg-white/80 backdrop-blur-md fixed top-0 z-40 h-20 flex items-center'>
      <div className='container mx-auto flex items-center justify-between p-4 md:px-10'>
        <div className='flex items-center gap-2'>
          <Image
            src='/logo.png'
            alt='Book Nook logo'
            height={40}
            width={40}
            priority
          />
          <span className='text-xl font-medium tracking-wide text-black'>
            Book Nook
          </span>
        </div>
        <div className='hidden md:block absolute left-1/2 transform -translate-x-1/2'>
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.name}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink className='px-4 py-2 text-sm font-medium text-slate-700 hover:text-black transition-colors'>
                      {link.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className='flex items-center gap-3'>
          {userId ? (
            <Button
              asChild
              className='hidden md:flex bg-gradient-to-r from-violet-200 to-pink-200 border-none shadow-violet-100 text-black/80'>
              <Link href='/dashboard'>
                Dashboard
                <ArrowRightIcon className='size-4 ml-1' />
              </Link>
            </Button>
          ) : (
            <>
              <SignInButton mode='redirect' forceRedirectUrl='/dashboard'>
                <Button
                  variant='ghost'
                  className='hidden md:flex hover:bg-slate-100 text-black/80 hover:text-black'>
                  Log in
                </Button>
              </SignInButton>
              <SignInButton mode='redirect' forceRedirectUrl='/dashboard'>
                <Button className='hidden md:flex bg-gradient-to-r from-violet-200 to-pink-200 border-none shadow-violet-100 text-black/80'>
                  Get Started
                  <ArrowRightIcon className='size-4 ml-1' />
                </Button>
              </SignInButton>
            </>
          )}
          {!userId && (
            <SignInButton mode='redirect' forceRedirectUrl='/dashboard'>
              <Button
                variant='ghost'
                size='sm'
                className='md:hidden bg-gradient-to-r from-violet-200 to-pink-200 border-none shadow-violet-100 text-black/80'>
                Get Started
              </Button>
            </SignInButton>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='md:hidden hover:bg-slate-100 text-black/80 hover:text-black'>
                <MenuIcon className='size-5' />
              </Button>
            </SheetTrigger>
            <SheetContent
              side='right'
              className='w-[300px] z-50 bg-white border-gray-100'>
              <SheetHeader className='mb-6'>
                <SheetTitle className='text-start text-black'>
                  Navigation
                </SheetTitle>
              </SheetHeader>
              <div className='flex flex-col gap-6'>
                <nav className='flex flex-col gap-4'>
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <Link
                        href={link.href}
                        className='text-base font-medium text-black/80 hover:text-black transition-colors'>
                        {link.name}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className='pt-4 border-t border-gray-100'>
                  {userId ? (
                    <SheetClose asChild>
                      <Button
                        asChild
                        variant='outline'
                        className='w-full text-black/80 hover:bg-gray-100 hover:text-black border-gray-300'>
                        <Link href='/dashboard'>
                          Dashboard
                          <ArrowRightIcon className='size-4 ml-1' />
                        </Link>
                      </Button>
                    </SheetClose>
                  ) : (
                    <div className='flex flex-col gap-3'>
                      <SheetClose asChild>
                        <SignInButton
                          mode='redirect'
                          forceRedirectUrl='/dashboard'>
                          <Button
                            variant='outline'
                            className='w-full text-black/80 hover:bg-gray-100 hover:text-black border-gray-300'>
                            Log in
                          </Button>
                        </SignInButton>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
