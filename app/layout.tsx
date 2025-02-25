import { Sour_Gummy } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';

import { Toaster } from '@/components/ui/toaster';

import type { Metadata } from 'next';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Book Nook - Your Personal Library, Anytime, Anywhere',
  description:
    'Track your progress, set reading goals and build your dream library.',
};

const sourGummy = Sour_Gummy({ subsets: ['latin-ext'] });

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      afterSignOutUrl={'/'}
      signUpFallbackRedirectUrl={'/'}
      signInFallbackRedirectUrl={'/'}
      signInForceRedirectUrl={'/dashboard'}
      signUpForceRedirectUrl={'/dashboard'}>
      <html lang='en' className={sourGummy.className}>
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default AppLayout;
