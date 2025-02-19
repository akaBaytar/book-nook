'use client';

import { useState, useEffect, useTransition } from 'react';

import {
  PlusIcon,
  HeartIcon,
  SearchIcon,
  Loader2Icon,
  SparklesIcon,
  CheckCircleIcon,
} from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { toggleFavorite, toggleCompleted } from '@/actions/book.actions';

type Book = { id: string; name: string; favorite: boolean; completed: boolean };

const TBRGame = ({ initialBooks }: { initialBooks: Book[] }) => {
  const [isPending, startTransition] = useTransition();

  const [books, setBooks] = useState<Book[]>(initialBooks || []);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSelecting, setIsSelecting] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [blinkingIndex, setBlinkingIndex] = useState<number | null>(null);

  useEffect(() => {
    setBooks(initialBooks);
  }, [initialBooks]);

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

    const blinkInterval = 150;
    const blinkDuration = 5000;

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
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, favorite: !book.favorite } : book
      )
    );

    startTransition(() => toggleFavorite(id));
  };

  const handleToggleCompleted = (id: string) => {
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

    startTransition(() => toggleCompleted(id));
  };

  const totalBooks = books.length;

  const completedCount = books.filter((book) => book.completed).length;

  const completionPercentage =
    Math.round((completedCount / totalBooks) * 100) || 0;

  const favoritesCount = books.filter((book) => book.favorite).length;

  return (
    <div className='flex flex-col gap-5 mt-5 md:mt-0 bg-sidebar rounded-md border p-4 min-h-[calc(100vh-2rem)]'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl tracking-[0.015em]'>TBR Game</h1>
        <div className='flex gap-2.5'>
          <Button size='icon' variant='outline'>
            <PlusIcon className='size-4' />
          </Button>
          <Button
            onClick={selectWhatWillRead}
            disabled={
              isPending || isSelecting || availableForSelection.length === 0
            }
            className='w-[170px] disabled:bg-black/90'>
            {isSelecting ? (
              <>
                <Loader2Icon className='size-4 animate-spin' />
                Choosing...
              </>
            ) : (
              <>
                <SparklesIcon className='size-4' />
                Choose Next Read
              </>
            )}
          </Button>
        </div>
      </div>
      <div className='bg-white p-3 rounded-md border flex flex-col sm:flex-row justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <span className='text-sm text-slate-500'>Reading Progress</span>
          <div className='flex items-center gap-2'>
            <span className='font-medium'>
              {completedCount}/{totalBooks} completed
            </span>
            <Badge variant='outline'>{completionPercentage}%</Badge>
          </div>
        </div>
        <div className='flex gap-2 mt-2 sm:mt-0'>
          <Badge variant='secondary' className='flex items-center gap-1'>
            <HeartIcon className='size-3 fill-pink-500 text-pink-500' />
            {favoritesCount}
          </Badge>
          <Badge variant='secondary' className='flex items-center gap-1'>
            <CheckCircleIcon className='size-3 text-pink-500' />
            {completedCount}
          </Badge>
        </div>
      </div>
      <div className='flex flex-col gap-5 xl:flex-row xl:items-center'>
        <div className='relative flex-1 min-w-48'>
          <SearchIcon className='absolute start-2 top-2.5 size-4 text-slate-500' />
          <Input
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='ps-8 bg-white'
          />
        </div>
      </div>
      {availableForSelection.length === 0 && (
        <Alert>
          <AlertDescription className='mt-1'>
            No unread books available with current filters. Try different
            filters or mark some books as not completed.
          </AlertDescription>
        </Alert>
      )}
      {selectedIndex !== null && filteredBooks[selectedIndex] && (
        <Alert>
          <SparklesIcon className='size-4 !text-white' />
          <AlertDescription className='mt-1'>
            Your next book to read is{' '}
            <span className='font-bold'>
              {filteredBooks[selectedIndex].name}
            </span>
            .
          </AlertDescription>
        </Alert>
      )}
      <div className='grid sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5'>
        {filteredBooks.map((book, index) => (
          <Card
            key={book.id}
            className={`p-5 flex rounded-md transition-all duration-300 hover:shadow-lg ${
              book.completed ? 'opacity-40' : ''
            } ${
              selectedIndex === index
                ? 'border border-pink-300 bg-pink-50 transform'
                : blinkingIndex === index
                ? 'bg-pink-100 text-black'
                : book.favorite && !book.completed
                ? 'border-pink-200'
                : ''
            }`}>
            <div className='flex flex-col gap-2.5 w-full'>
              <div className='flex justify-between items-start'>
                <h3 className='line-clamp-1'>{book.name}</h3>
                <div className='flex gap-1.5'>
                  <button
                    onClick={() => handleToggleFavorite(book.id)}
                    disabled={isPending}
                    className='rounded-full bg-pink-50 p-1 hover:bg-pink-100 transition-colors'>
                    <HeartIcon
                      className={`size-3 text-pink-500 ${
                        book.favorite ? 'fill-pink-500' : ''
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => handleToggleCompleted(book.id)}
                    disabled={isPending}
                    className='rounded-full bg-pink-50 p-1 hover:bg-pink-100 transition-colors'>
                    <CheckCircleIcon className='size-3 text-pink-500' />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TBRGame;
