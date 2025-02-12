'use client';

import { useState } from 'react';

import {
  HeartIcon,
  SearchIcon,
  Loader2Icon,
  SparklesIcon,
  CheckCircleIcon,
  StarIcon,
} from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { TBR_LIST } from '@/mock';

const TBRGamePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('all');
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
  });

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

        const randomIndex = Math.floor(Math.random() * filteredBooks.length);

        setSelectedIndex(randomIndex);
        setBlinkingIndex(null);
        setIsSelecting(false);
      } else {
        const speedFactor = Math.max(1, (remaining / blinkDuration) * 3);

        if (Math.random() < speedFactor) {
          setBlinkingIndex(Math.floor(Math.random() * filteredBooks.length));
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
      }

      return newCompleted;
    });
  };

  return (
    <div className='flex flex-col gap-5 mt-5 md:mt-0 bg-sidebar rounded-md border p-4 min-h-[calc(100vh-2rem)]'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-medium'>TBR Game</h1>
        <div className='flex gap-2.5'>
          <Button
            onClick={selectWhatWillRead}
            disabled={isSelecting || filteredBooks.length === 0}
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
        <div className='flex gap-2.5 items-center  overflow-x-auto p-2 bg-white border rounded-md'>
          <Badge
            variant={selectedGenre === 'all' ? 'default' : 'outline'}
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
              variant={selectedGenre === genre ? 'default' : 'outline'}
              className={`cursor-pointer ${
                selectedGenre === genre ? 'bg-black hover:bg-black/90' : ''
              }`}
              onClick={() => {
                setSelectedGenre(genre)
                setSelectedIndex(null)
              }}>
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </Badge>
          ))}
        </div>
      </div>
      {selectedIndex !== null && (
        <Alert className='border-black bg-slate-50'>
          <SparklesIcon className='size-4' />
          <AlertDescription className='mt-1'>
            Your next book to read is{' '}
            <span className='font-bold'>
              {filteredBooks[selectedIndex].title}
            </span>
            .
          </AlertDescription>
        </Alert>
      )}
      <div className='grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5'>
        {filteredBooks.map((book, index) => (
          <Card
            key={book.id}
            className={`p-5 flex rounded-md transition-all duration-300 hover:shadow-lg ${
              completedBooks.has(book.id) ? 'opacity-40' : ''
            } ${
              selectedIndex === index
                ? 'border border-black bg-slate-100 transform'
                : blinkingIndex === index
                ? 'bg-slate-200 text-black'
                : ''
            }`}>
            <div className='flex flex-col gap-2.5'>
              <div className='flex justify-between items-start'>
                <h3 className='font-medium line-clamp-1'>{book.title}</h3>
                <div className='flex gap-1.5'>
                  <button
                    onClick={() => toggleFavorite(book.id)}
                    className='rounded-full bg-slate-100 p-1'>
                    <HeartIcon
                      className={`size-3 ${
                        favorites.has(book.id) ? 'fill-black' : ''
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => toggleCompleted(book.id)}
                    className='rounded-full bg-slate-100 p-1'>
                    <CheckCircleIcon className='size-3' />
                  </button>
                </div>
              </div>
              <p className='text-sm text-slate-500 line-clamp-3'>
                {book.description}
              </p>
              <div className='flex justify-between items-center text-sm text-slate-500 mt-auto'>
                <Badge variant='outline' className='text-xs'>
                  {book.genre.charAt(0).toUpperCase() + book.genre.slice(1)}
                </Badge>
                <div className='flex gap-4'>
                  <span>{book.pages} pages</span>
                  <span className='flex items-center gap-1'>
                    <StarIcon className='size-3' />
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
