import { Sour_Gummy } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';

import { Toaster } from '@/components/ui/toaster';

import type { Metadata } from 'next';

import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://booknookforceren.vercel.app'),
  title: 'Book Nook - Your Personal Library, Anytime, Anywhere',
  description:
    'Track your progress, set reading goals and build your dream library.',
  keywords: 'book nook',
  authors: [{ name: 'Burak Bilgili', url: 'https://www.burakbilgili.co.uk' }],
  creator: 'Burak Bilgili',
  publisher: 'Burak Bilgili',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/favicon-96x96.png',
        type: 'image/png',
        sizes: '96x96',
      },
      {
        url: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/web-app-manifest-512x512.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  },
  applicationName: 'Book Nook',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  other: {
    'content-security-policy': "default-src 'self'",
  },
  manifest: '/manifest.json',
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
