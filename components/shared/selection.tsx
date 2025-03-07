import { useState, useEffect, useMemo } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, CircleCheckBigIcon, Loader2Icon } from 'lucide-react';

import { AlertDescription } from '@/components/ui/alert';

type Book = {
  id: string;
  name: string;
  favorite: boolean;
  completed: boolean;
};

type PropTypes = {
  isSelecting: boolean;
  selectedBook: Book | null;
  availableBooks: Book[];
};

const Selection = ({
  isSelecting,
  selectedBook,
  availableBooks = [],
}: PropTypes) => {
  const [blinkingBook, setBlinkingBook] = useState<Book | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  const [selectionText, setSelectionText] = useState(
    'Choosing your next adventure...'
  );

  const selectionPhrases = useMemo(
    () => [
      'Scanning your collection...',
      'Finding the perfect match...',
      'Shuffling possibilities...',
      'Your next journey awaits...',
      'Book destiny incoming...',
    ],
    []
  );

  useEffect(() => {
    if (!isSelecting) {
      return;
    }

    let blinkCounter = 0;
    let textCounter = 0;

    const textInterval = setInterval(() => {
      setSelectionText(selectionPhrases[textCounter % selectionPhrases.length]);
      textCounter++;
    }, 1200);

    const blinkInterval = setInterval(() => {
      if (availableBooks.length === 0) {
        clearInterval(blinkInterval);
        return;
      }

      blinkCounter++;

      if (blinkCounter > 10 && blinkCounter < 25) {
        setAnimationSpeed(2);
      } else if (blinkCounter >= 25) {
        setAnimationSpeed(3);
      }

      const randomIndex = Math.floor(Math.random() * availableBooks.length);

      setBlinkingBook(availableBooks[randomIndex]);

      if (blinkCounter >= 35) {
        clearInterval(blinkInterval);
        clearInterval(textInterval);
      }
    }, 300 / animationSpeed);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(textInterval);
    };
  }, [isSelecting, availableBooks, animationSpeed, selectionPhrases]);

  if (!isSelecting && !selectedBook) return null;

  return (
    <AnimatePresence mode='wait'>
      {isSelecting ? (
        <motion.div
          key='selecting'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className='rounded-lg bg-muted p-0.5 shadow-lg'>
          <div className='rounded-md p-4 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className='rounded-full p-2'>
                <Loader2Icon className='size-5' />
              </motion.div>
              <div>
                <AlertDescription className='font-medium'>
                  {selectionText}
                </AlertDescription>
                {blinkingBook && (
                  <div className='text-sm mt-1 italic'>{blinkingBook.name}</div>
                )}
              </div>
            </div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}>
              <SparklesIcon className='size-5' />
            </motion.div>
          </div>
        </motion.div>
      ) : (
        selectedBook && (
          <motion.div
            key='selected'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 15,
              },
            }}
            className='rounded-lg p-0.5 shadow-lg bg-gradient-to-r from-muted to-secondary'>
            <div className='rounded-md p-4'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{
                      rotate: [0, 5, -5, 5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: 2,
                      repeatType: 'reverse',
                    }}
                    className='rounded-full bg-opacity-30 p-2'>
                    <CircleCheckBigIcon className='size-5' />
                  </motion.div>
                  <div>
                    <AlertDescription className='flex flex-col'>
                      <span className='text-sm'>Your next book to read is</span>
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className='font-bold text-2xl'>
                        {selectedBook.name}
                      </motion.span>
                    </AlertDescription>
                  </div>
                </div>
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'loop',
                  }}>
                  <SparklesIcon className='size-8' />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )
      )}
    </AnimatePresence>
  );
};

export default Selection;
