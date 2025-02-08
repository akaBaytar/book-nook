import Link from 'next/link';

import { SignInButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

import { Button } from '@/components/ui/button';

const MarketingPage = async () => {
  const user = await currentUser();

  return (
    <div className='flex flex-col gap-2'>
      <h1> Marketing Page</h1>
      <Button asChild>
        {user ? (
          <Link href='/dashboard'>Go Dashboard</Link>
        ) : (
          <SignInButton forceRedirectUrl='/dashboard' mode='modal' />
        )}
      </Button>
    </div>
  );
};

export default MarketingPage;
