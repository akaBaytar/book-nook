import { ClerkProvider } from '@clerk/nextjs';

import type { Metadata } from 'next';

import '../styles/globals.css';

import {Sour_Gummy} from 'next/font/google'

export const metadata: Metadata = {
  title: 'Book Tracker',
  description: 'Book tracking app',
};

const sourGummy = Sour_Gummy({subsets:['latin-ext']})

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang='en' className={sourGummy.className}>
        <body className='flex items-center justify-center h-screen'>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};

export default AppLayout;
