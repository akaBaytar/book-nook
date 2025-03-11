import Link from 'next/link';

import { Check, AlertCircle } from 'lucide-react';

import { SignInButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

import { Button } from '@/components/ui/button';

const PricingSection = async () => {
  const { userId } = await auth();

  return (
    <section
      id='pricing'
      className='py-20 bg-gradient-to-b from-white to-slate-50'>
      <div className='container mx-auto px-4 md:px-10'>
        <div className='text-center mb-12'>
          <span className='inline-block px-3 py-1 bg-violet-100 text-black/80 border-slate-100 shadow-sm rounded-full text-sm font-medium mb-4'>
            Simple Pricing
          </span>
          <h2 className='text-3xl md:text-4xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-pink-200'>
            Free, Now and Forever
          </h2>
          <p className='text-lg text-black/80 max-w-2xl mx-auto'>
            We believe tracking your reading journey should be accessible to
            everyone. No hidden fees, no premium tiers, just a completely free
            experience.
          </p>
        </div>

        <div className='max-w-3xl mx-auto'>
          <div className='bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden'>
            <div className='bg-gradient-to-r from-violet-200 to-pink-200 shadow-violet-100 text-black/80 py-6 px-8'>
              <div className='flex justify-between items-center'>
                <h3 className='text-2xl font-bold'>Free Plan</h3>
                <div className='flex items-baseline'>
                  <span className='text-3xl font-bold'>$0</span>
                  <span className='ms-1'>/forever</span>
                </div>
              </div>
              <p className='mt-2.5 text-pretty'>
                All features included. No credit card required.
              </p>
            </div>

            <div className='p-8'>
              <ul className='space-y-4 mb-8 text-pretty text-black'>
                <li className='flex items-start'>
                  <Check className='size-5 mt-0.5 mr-3 flex-shrink-0' />
                  <span>
                    Unlimited book tracking with detailed progress stats
                  </span>
                </li>
                <li className='flex items-start'>
                  <Check className='size-5 mt-0.5 mr-3 flex-shrink-0' />
                  <span>
                    Create unlimited custom reading lists and collections
                  </span>
                </li>
                <li className='flex items-start'>
                  <Check className='size-5 mt-0.5 mr-3 flex-shrink-0' />
                  <span>
                    Set and monitor reading goals with visual progress tracking
                  </span>
                </li>
                <li className='flex items-start'>
                  <Check className='size-5 mt-0.5 mr-3 flex-shrink-0' />
                  <span>Generate reading statistics and insights</span>
                </li>
                <li className='flex items-start'>
                  <Check className='size-5 mt-0.5 mr-3 flex-shrink-0' />
                  <span>Share your reading journey with friends</span>
                </li>
                <li className='flex items-start'>
                  <Check className='size-5 mt-0.5 mr-3 flex-shrink-0' />
                  <span>Access from any device with cloud synchronization</span>
                </li>
              </ul>

              {userId ? (
                <Button
                  asChild
                  size='lg'
                  className='w-full bg-gradient-to-r from-violet-200 to-pink-200 border-none shadow-violet-100 text-black/80'>
                  <Link href='/dashboard'>Go to Dashboard</Link>
                </Button>
              ) : (
                <SignInButton mode='redirect' forceRedirectUrl='/dashboard'>
                  <Button
                    size='lg'
                    className='w-full bg-gradient-to-r from-violet-200 to-pink-200 border-none shadow-violet-100 text-black/80'>
                    Get Started Now
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>

          <div className='mt-8 bg-violet-50 border border-violet-100 rounded-xl p-5 flex items-center space-x-4'>
            <div className='bg-violet-100 rounded-full p-2 flex-shrink-0 text-black'>
              <AlertCircle className='size-5' />
            </div>
            <div>
              <p className='text-black/80 text-pretty'>
                <span className='font-medium'>Why free forever?</span> We
                believe in making book tracking accessible to everyone. Book
                Nook is supported by our passionate community and minimal server
                costs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
