import { BookOpenIcon, StarIcon, TargetIcon } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section id='features' className='py-20 bg-white'>
      <div className='container mx-auto px-5 md:px-10'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-pink-200'>
            Everything You Need to Enhance Your Reading Journey
          </h2>
          <p className='text-lg text-black/80 max-w-2xl mx-auto'>
            Track, discover and enjoy your books like never before with our
            comprehensive set of features.
          </p>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
          <div className='bg-slate-50 rounded-xl p-6 border border-slate-100 hover:shadow-md transition-shadow'>
            <div className='size-12 bg-gradient-to-r from-violet-200 to-pink-200 border-none shadow-violet-100 text-black/80 rounded-lg flex items-center justify-center mb-4'>
              <BookOpenIcon className='size-6' />
            </div>
            <h3 className='text-xl font-semibold mb-2 text-black'>
              Personal Library
            </h3>
            <p className='text-black/80'>
              Organize your collection and access it from any device. Add books,
              track your progress, and never lose track of your reading journey.
            </p>
          </div>
          <div className='bg-slate-50 rounded-xl p-6 border border-slate-100 hover:shadow-md transition-shadow'>
            <div className='size-12 bg-gradient-to-r from-violet-200 to-pink-200 border-none shadow-violet-100 text-black/80 rounded-lg flex items-center justify-center mb-4'>
              <TargetIcon className='size-6' />
            </div>
            <h3 className='text-xl font-semibold mb-2 text-black'>
              Reading Goals
            </h3>
            <p className='text-black/80'>
              Set monthly and yearly reading targets. Stay motivated with
              progress tracking and achievement badges.
            </p>
          </div>
          <div className='bg-slate-50 rounded-xl p-6 border border-slate-100 hover:shadow-md transition-shadow'>
            <div className='size-12 bg-gradient-to-r from-violet-200 to-pink-200 border-none shadow-violet-100 text-black/80 rounded-lg flex items-center justify-center mb-4'>
              <StarIcon className='size-6' />
            </div>
            <h3 className='text-xl font-semibold mb-2 text-black'>
              Custom Lists
            </h3>
            <p className='text-black/80'>
              Create public and private book lists for any purpose. Share your
              recommendations with friends or keep your TBR private.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
