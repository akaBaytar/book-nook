'use client';

import { useState, useEffect, useTransition } from 'react';

import {
  HeartIcon,
  SnailIcon,
  TrashIcon,
  SearchIcon,
  OrigamiIcon,
  XCircleIcon,
  Loader2Icon,
  SparklesIcon,
  CheckCircleIcon,
  MousePointerClickIcon,
} from 'lucide-react';

import { motion } from 'framer-motion';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Selection from './selection';
import AddTBRButton from './add-tbr-button';

import { toggleFavorite, toggleCompleted } from '@/actions/book.actions';

import {
  removeTBRs,
  toggleTBRFavorite,
  toggleTBRCompleted,
} from '@/actions/tbr.actions';

type TBR = { id: string; name: string; favorite: boolean; completed: boolean };
type Book = { id: string; name: string; favorite: boolean; completed: boolean };

type PropTypes = { initialBooks: Book[]; initialTBRs: TBR[] };

const TBRGame = ({ initialBooks, initialTBRs }: PropTypes) => {
  const [isPending, startTransition] = useTransition();

  const [books, setBooks] = useState<Book[] | TBR[]>(
    initialBooks || initialTBRs || []
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [isSelecting, setIsSelecting] = useState(false);

  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(new Set());

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [blinkingIndex, setBlinkingIndex] = useState<number | null>(null);

  const [mode, setMode] = useState<'library' | 'list'>('library');

  useEffect(() => {
    if (mode === 'library') {
      setBooks(initialBooks);
    } else {
      setBooks(initialTBRs);
    }
  }, [initialBooks, initialTBRs, mode]);

  const filteredBooks = books
    .filter((book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      if (a.favorite !== b.favorite) return a.favorite ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

  const availableForSelection = filteredBooks.filter((book) => !book.completed);

  const selectWhatWillRead = () => {
    setIsSelecting(true);
    setSelectedIndex(null);
    setBlinkingIndex(null);

    const blinkInterval = 8000;
    const blinkDuration = 8000;

    const startTime = Date.now();

    const blink = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = blinkDuration - elapsed;

      if (remaining <= 0) {
        clearInterval(blink);

        if (availableForSelection.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * availableForSelection.length
          );

          const selectedBookId = availableForSelection[randomIndex].id;

          const originalIndex = filteredBooks.findIndex(
            (book) => book.id === selectedBookId
          );

          setSelectedIndex(originalIndex);
        }

        setBlinkingIndex(null);
        setIsSelecting(false);
      } else {
        const speedFactor = Math.max(1, (remaining / blinkDuration) * 3);

        if (Math.random() < speedFactor) {
          const nonCompletedIndices = filteredBooks
            .map((book, index) => (!book.completed ? index : -1))
            .filter((index) => index !== -1);

          if (nonCompletedIndices.length > 0) {
            const randomNonCompletedIndex = Math.floor(
              Math.random() * nonCompletedIndices.length
            );

            setBlinkingIndex(nonCompletedIndices[randomNonCompletedIndex]);
          }
        }
      }
    }, blinkInterval);
  };

  const handleToggleFavorite = (id: string) => {
    if (isSelectMode) return;

    setSelectedIndex(null);

    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, favorite: !book.favorite } : book
      )
    );

    startTransition(() => {
      if (mode === 'library') {
        toggleFavorite(id);
      } else {
        toggleTBRFavorite(id);
      }
    });
  };

  const handleToggleCompleted = (id: string) => {
    if (isSelectMode) return;

    const book = books.find((b) => b.id === id);

    const isCurrentlyCompleted = book?.completed ?? false;

    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, completed: !book.completed } : book
      )
    );

    if (
      !isCurrentlyCompleted &&
      selectedIndex !== null &&
      filteredBooks[selectedIndex].id === id
    ) {
      setSelectedIndex(null);
    }

    startTransition(() => {
      if (mode === 'library') {
        toggleCompleted(id);
      } else {
        toggleTBRCompleted(id);
      }
    });
  };

  const handleToggleSelect = (id: string) => {
    if (!isSelectMode) return;

    setSelectedBooks((prev) => {
      const newSelected = new Set(prev);

      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }

      return newSelected;
    });
  };

  const handleDeleteSelected = async () => {
    if (selectedBooks.size === 0) return;

    startTransition(() => {
      removeTBRs(Array.from(selectedBooks));
    });

    setBooks((prev) => prev.filter((book) => !selectedBooks.has(book.id)));

    setSelectedBooks(new Set());
    setIsSelectMode(false);
  };

  const totalBooks = books.length;

  const completedCount = books.filter((book) => book.completed).length;

  const completionPercentage =
    Math.round((completedCount / totalBooks) * 100) || 0;

  const favoritesCount = books.filter((book) => book.favorite).length;

  return (
    <div className='flex flex-col gap-5 bg-sidebar rounded-md border p-4 min-h-[calc(100vh-2rem)]'>
      <div className='flex gap-5 items-center justify-between'>
        <h1 className='flex items-center gap-2 text-2xl tracking-[0.015em]'>
          <SparklesIcon className='size-5 mt-0.5' />
          <span className='block lg:hidden'>TBR</span>
          <span className='hidden lg:block'>To Be Read</span>
        </h1>
        <div className='flex gap-2.5'>
          {mode === 'list' && !isSelectMode && totalBooks !== 0 && (
            <Button variant='outline' onClick={() => setIsSelectMode(true)}>
              <MousePointerClickIcon className='size-4' />
              <span className='hidden sm:block lg:hidden xl:block'>
                Select TBRs
              </span>
            </Button>
          )}
          {mode === 'list' && isSelectMode && (
            <>
              <Button
                variant='outline'
                onClick={handleDeleteSelected}
                disabled={selectedBooks.size === 0 || isPending}>
                <TrashIcon className='size-4' />
                <span className='hidden sm:block lg:hidden xl:block'>
                  Remove TBRs
                </span>
              </Button>
              <Button
                variant='outline'
                onClick={() => {
                  setIsSelectMode(false);
                  setSelectedBooks(new Set());
                }}>
                <XCircleIcon className='size-4' />
                <span className='hidden sm:block lg:hidden xl:block'>
                  Cancel
                </span>
              </Button>
            </>
          )}
          {mode === 'list' && !isSelectMode && <AddTBRButton />}
          {!isSelectMode && (
            <Button
              onClick={selectWhatWillRead}
              disabled={
                isPending || isSelecting || availableForSelection.length === 0
              }
              className='sm:w-[170px] lg:w-auto xl:w-[170px]'>
              {isSelecting ? (
                <>
                  <Loader2Icon className='size-4 animate-spin' />
                  <span className='hidden sm:block lg:hidden xl:block'>
                    Choosing...
                  </span>
                </>
              ) : (
                <>
                  <SparklesIcon className='size-4' />
                  <span className='hidden sm:block lg:hidden xl:block'>
                    Choose Next Read
                  </span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>
      <div className='p-3 rounded-md border flex justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-1'>
            <span className='text-sm'>
              {completedCount}/{totalBooks} completed
            </span>
            <Badge variant='outline'>{completionPercentage}%</Badge>
          </div>
        </div>
        <div className='flex gap-1'>
          <Badge variant='secondary' className='flex items-center gap-1'>
            <HeartIcon className='size-3 fill-primary text-primary' />
            {favoritesCount}
          </Badge>
          <Badge variant='secondary' className='flex items-center gap-1'>
            <CheckCircleIcon className='size-3' />
            {completedCount}
          </Badge>
        </div>
      </div>
      <div className='flex flex-col gap-5 md:flex-row-reverse lg:flex-col xl:flex-row-reverse'>
        <Tabs
          defaultValue='library'
          className='w-full'
          onValueChange={(value) => {
            setMode(value as 'library' | 'list');
            setSelectedIndex(null);
            setIsSelectMode(false);
            setSelectedBooks(new Set());
          }}>
          <TabsList className='grid w-full grid-cols-2 gap-2'>
            <TabsTrigger value='library' className='flex gap-2'>
              <OrigamiIcon className='size-4' />
              Library
            </TabsTrigger>
            <TabsTrigger value='list' className='flex gap-2'>
              <SnailIcon className='size-4' />
              TBR
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className='flex flex-col gap-5 xl:flex-row xl:items-center w-full'>
          <div className='relative flex-1 min-w-48'>
            <SearchIcon className='absolute start-2.5 top-3 size-4' />
            <Input
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='ps-8 h-10'
            />
          </div>
        </div>
      </div>
      {availableForSelection.length === 0 && !isSelectMode && (
        <Alert>
          <AlertDescription>
            {mode === 'library'
              ? 'No unread books available with current filters. Try different filters or mark some books as not completed.'
              : 'No TBR available with current filters. Try different filters or add some TBR.'}
          </AlertDescription>
        </Alert>
      )}
      <Selection
        isSelecting={isSelecting}
        selectedBook={
          selectedIndex !== null ? filteredBooks[selectedIndex] : null
        }
        availableBooks={filteredBooks}
      />
      <div className='grid sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5'>
        {filteredBooks.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ rotate: 0 }}
            animate={
              isSelectMode ? { rotate: [0, -1, 1, -1, 1, 0] } : { rotate: 0 }
            }
            transition={
              isSelectMode
                ? { duration: 0.5, repeat: Infinity, repeatType: 'mirror' }
                : {}
            }>
            <Card
              className={`p-5 flex rounded-md transition-all duration-300 hover:shadow-lg ${
                book.completed ? 'opacity-40' : ''
              } ${
                selectedIndex === index
                  ? 'transform bg-gradient-to-r from-muted to-secondary'
                  : blinkingIndex === index
                  ? 'text-black'
                  : ''
              } ${selectedBooks.has(book.id) ? 'bg-secondary' : ''}`}
              onClick={() => handleToggleSelect(book.id)}
              style={{ cursor: isSelectMode ? 'pointer' : 'default' }}>
              <div className='flex flex-col gap-2.5 w-full'>
                <div className='flex justify-between items-start'>
                  <h3 className='line-clamp-1'>{book.name}</h3>
                  {!isSelectMode && (
                    <div className='flex gap-1.5'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(book.id);
                        }}
                        disabled={isPending}
                        className={`rounded-full p-1 transition-colors ${
                          selectedIndex === index && ''
                        }`}>
                        <HeartIcon
                          className={`size-3 ${
                            book.favorite ? 'text-primary fill-primary' : ''
                          }`}
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleCompleted(book.id);
                        }}
                        disabled={isPending}
                        className={`rounded-full p-1 transition-colors ${
                          selectedIndex === index && ''
                        }`}>
                        <CheckCircleIcon
                          className={`size-3 ${selectedIndex === index && ''}`}
                        />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TBRGame;
