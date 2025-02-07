import { Button } from '@/components/ui/button';

import { SignInButton } from '@clerk/nextjs';

const MarketingPage = () => {
  return (
    <div className='flex flex-col gap-2'>
      <h1> Marketing Page</h1>
      <Button asChild>
        <SignInButton forceRedirectUrl='/dashboard' mode='modal' />
      </Button>
    </div>
  );
};

export default MarketingPage;
