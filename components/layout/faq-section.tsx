import Link from 'next/link';

import { Button } from '@/components/ui/button';

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { FAQS } from '@/constants';

const FAQSection = () => {
  return (
    <section id='faq' className='py-20 bg-white'>
      <div className='container mx-auto px-4 md:px-10'>
        <div className='text-center mb-10'>
          <span className='inline-block px-3 py-1 bg-violet-100 text-black/80 border-slate-100 shadow-sm rounded-full text-sm font-medium mb-4'>
            FAQ
          </span>
          <h2 className='text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-pink-200'>
            Frequently Asked Questions
          </h2>
          <p className='text-lg text-black/80 max-w-2xl mx-auto'>
            Everything you need to know about Book Nook and how it can transform
            your reading experience.
          </p>
        </div>
        <Accordion
          type='single'
          collapsible
          className='max-w-2xl mx-auto text-black'>
          {FAQS.map(({ id, answer, question }) => (
            <AccordionItem key={id} value={`faq-${id}`} className='border-b-gray-100'>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className='mt-10 text-center'>
          <p className='text-black/80 mb-5'>
            Still have questions? We&apos;re here to help!
          </p>
          <Button className='bg-gradient-to-r from-violet-200 to-pink-200 border-none shadow-violet-100 text-black/80'>
            <Link href='mailto:support@booknook.com'>Contact Support</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
