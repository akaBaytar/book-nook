'use client';

import { useState } from 'react';

import {
  StarIcon,
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

import { TBR_LIST } from '@/mock';

const TBRGamePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('all');

  const [favorites, setFavorites] = useState(new Set());
  const [completedBooks, setCompletedBooks] = useState(new Set());

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [blinkingIndex, setBlinkingIndex] = useState<number | null>(null);

  const genres = [...new Set(TBR_LIST.map((book) => book.genre))];

  const filteredBooks = TBR_LIST.filter((book) => {
    const matchesSearch =
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGenre =
      selectedGenre === 'all' || book.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  }).sort((a, b) => {
    const aIsFavorite = favorites.has(a.id);
    const bIsFavorite = favorites.has(b.id);

    if (aIsFavorite && !bIsFavorite) return -1;
    if (!aIsFavorite && bIsFavorite) return 1;

    const aIsCompleted = completedBooks.has(a.id);
    const bIsCompleted = completedBooks.has(b.id);

    if (!aIsCompleted && bIsCompleted) return -1;
    if (aIsCompleted && !bIsCompleted) return 1;

    return 0;
  });

  const availableForSelection = filteredBooks.filter(
    (book) => !completedBooks.has(book.id)
  );

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
            .map((book, index) => (!completedBooks.has(book.id) ? index : -1))
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

  const toggleFavorite = (bookId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);

      if (newFavorites.has(bookId)) {
        newFavorites.delete(bookId);
      } else {
        newFavorites.add(bookId);
      }

      return newFavorites;
    });
  };

  const toggleCompleted = (bookId: number) => {
    setCompletedBooks((prev) => {
      const newCompleted = new Set(prev);

      if (newCompleted.has(bookId)) {
        newCompleted.delete(bookId);
      } else {
        newCompleted.add(bookId);

        if (
          selectedIndex !== null &&
          filteredBooks[selectedIndex].id === bookId
        ) {
          setSelectedIndex(null);
        }
      }

      return newCompleted;
    });
  };

  const totalBooks = TBR_LIST.length;
  const completedCount = completedBooks.size;
  const completionPercentage = Math.round((completedCount / totalBooks) * 100);

  return (
    <div className='flex flex-col gap-5 mt-5 md:mt-0 bg-sidebar rounded-md border p-4 min-h-[calc(100vh-2rem)]'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl tracking-[0.015em]'>TBR Game</h1>
        <div className='flex gap-2.5'>
          <Button
            onClick={selectWhatWillRead}
            disabled={isSelecting || availableForSelection.length === 0}
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
      <div className='bg-white p-2.5 rounded-md border flex justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-2'>
            <span>
              {completedCount}/{totalBooks} completed
            </span>
            <Badge variant='outline'>{completionPercentage}%</Badge>
          </div>
        </div>
        <div className='flex gap-2'>
          <Badge variant='secondary' className='flex items-center gap-1'>
            <HeartIcon className='size-3 fill-pink-500 text-pink-500' />
            {favorites.size}
          </Badge>
          <Badge variant='secondary' className='flex items-center gap-1'>
            <CheckCircleIcon className='size-3 text-pink-500' />
            {completedCount}
          </Badge>
        </div>
      </div>
      <div className='flex flex-col gap-5 xl:flex-row xl:items-center'>
        <div className='relative flex-1 min-w-48'>
          <SearchIcon className='absolute start-3 top-3 size-4 text-slate-500' />
          <Input
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='ps-8 bg-white h-10'
          />
        </div>
        <div className='flex gap-2.5 items-center overflow-x-auto p-2 bg-white border rounded-md'>
          <Badge
            variant={selectedGenre === 'all' ? 'destructive' : 'secondary'}
            className='cursor-pointer'
            onClick={() => {
              setSelectedGenre('all');
              setSelectedIndex(null);
            }}>
            All
          </Badge>
          {genres.map((genre) => (
            <Badge
              key={genre}
              variant={selectedGenre === genre ? 'destructive' : 'secondary'}
              className='cursor-pointer'
              onClick={() => {
                setSelectedGenre(genre);
                setSelectedIndex(null);
              }}>
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </Badge>
          ))}
        </div>
      </div>
      {availableForSelection.length === 0 && (
        <Alert className='bg-gradient-to-r from-violet-200 to-pink-200'>
          <AlertDescription>
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
              {filteredBooks[selectedIndex].title}
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
              completedBooks.has(book.id) ? 'opacity-40' : ''
            } ${
              selectedIndex === index
                ? 'border border-pink-300 bg-gradient-to-r from-violet-200 to-pink-200 transform'
                : blinkingIndex === index
                ? 'bg-gradient-to-r from-violet-200 to-pink-200 text-black'
                : favorites.has(book.id) && !completedBooks.has(book.id)
                ? 'border-pink-200'
                : ''
            }`}>
            <div className='flex flex-col gap-2.5 w-full'>
              <div className='flex justify-between items-start'>
                <h3 className='line-clamp-1'>{book.title}</h3>
                <div className='flex gap-1.5'>
                  <button
                    onClick={() => toggleFavorite(book.id)}
                    className='rounded-full bg-pink-50 p-1 hover:bg-pink-100 transition-colors'>
                    <HeartIcon
                      className={`size-3 text-pink-500 ${
                        favorites.has(book.id) ? 'fill-pink-500' : ''
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => toggleCompleted(book.id)}
                    className='rounded-full bg-pink-50 p-1 hover:bg-pink-100 transition-colors'>
                    <CheckCircleIcon className='size-3 text-pink-500' />
                  </button>
                </div>
              </div>
              <p className='text-sm text-slate-500 line-clamp-2'>
                {book.description}
              </p>
              <div className='flex justify-between items-center text-sm text-slate-500 mt-auto'>
                <Badge variant='secondary' className='text-xs'>
                  {book.genre.charAt(0).toUpperCase() + book.genre.slice(1)}
                </Badge>
                <div className='flex gap-4'>
                  <span>{book.pages} pages</span>
                  <span className='flex items-center gap-1'>
                    <StarIcon className='size-3 text-pink-300' />
                    {book.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TBRGamePage;
