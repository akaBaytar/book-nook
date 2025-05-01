import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs/server';

import Hero from '@/components/layout/hero';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

import FAQSection from '@/components/layout/faq-section';
import PricingSection from '@/components/layout/pricing-section';
import FeaturesSection from '@/components/layout/features-section';

const MarketingPage = async () => {
  const user = await currentUser();

  if (user) redirect('/dashboard');

  return (
    <div className='min-h-full flex flex-col'>
      <Header />
      <Hero />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default MarketingPage;
