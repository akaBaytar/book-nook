import '../styles/globals.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Tracker',
  description: 'Book tracking app',
};

const RootLayout=({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) =>{
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
