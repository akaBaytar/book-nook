'use client';

import { useEffect } from 'react';

import { motion, stagger, useAnimate } from 'framer-motion';

import { cn } from '@/lib/utils';

type PropTypes = {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
};

const TextGeneration = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: PropTypes) => {
  const [scope, animate] = useAnimate();

  const wordsArray = words.split(' ');

  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
        filter: filter ? 'blur(0px)' : 'none',
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
      }
    );
  }, [animate, duration, filter]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={`opacity-0 ${
                idx >= 3 &&
                'bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-pink-200'
              }`}
              style={{
                filter: filter ? 'blur(10px)' : 'none',
              }}>
              {word}{' '}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn('font-bold', className)}>
      <div className='mt-4'>
        <div>{renderWords()}</div>
      </div>
    </div>
  );
};

export default TextGeneration;
