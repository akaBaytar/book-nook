'use client';

import { dark } from '@clerk/themes';
import { UserProfile } from '@clerk/nextjs';

import { useTheme } from '@/context/theme';

const AccountPage = () => {
  const { theme } = useTheme();

  const isDark =
    theme === 'theme-midnight-nebula' || theme === 'theme-deep-ocean';

  return (
    <div className='w-full'>
      <UserProfile
        routing='hash'
        appearance={{
          baseTheme: isDark ? dark : undefined,
          layout: { unsafe_disableDevelopmentModeWarnings: true },
          elements: {
            cardBox: 'w-full rounded-md min-h-[calc(100vh-2rem)]',
            rootBox: 'w-full rounded-md min-h-[calc(100vh-2rem)]',
          },
        }}
      />
    </div>
  );
};

export default AccountPage;
