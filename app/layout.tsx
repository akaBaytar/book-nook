import { ClerkProvider } from '@clerk/nextjs';

import type { Metadata } from 'next';

import '../styles/globals.css';

import { Sour_Gummy } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Book Nook - Your Personal Library, Anytime, Anywhere',
  description:
    'Track your progress, set reading goals and build your dream library.',
};

const sourGummy = Sour_Gummy({ subsets: ['latin-ext'] });

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang='en' className={sourGummy.className}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
};

export default AppLayout;
