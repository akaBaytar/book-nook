import Hero from '@/components/layout/hero';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const MarketingPage = () => {
  return (
    <div className='min-h-full flex flex-col'>
      <div className='flex-1 flex flex-col items-center justify-center md:justify-start text-center gap-y-8 px-6 pb-10'>
        <Header />
        <Hero />
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
