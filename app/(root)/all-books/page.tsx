'use client';

import { useState, useEffect, useCallback } from 'react';

import {
  SearchIcon,
  ChevronDown,
  ArrowLeftIcon,
  ArrowRightIcon,
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import BookCard from '@/components/shared/book-card';
import AddBookButton from '@/components/shared/add-book-button';

import { BOOKS_PER_PAGE } from '@/constants';
import { getAllBooks } from '@/actions/book.actions';

import type { Book, Filter, Sort } from '@/types';

const AllBooksPage = () => {
  const [count, setCount] = useState(0);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [genre, setGenre] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [sortBy, setSortBy] = useState<Sort>('recent');

  const totalPages = Math.ceil(count / BOOKS_PER_PAGE);

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);

    const result = await getAllBooks({
      genre,
      filter,
      sortBy,
      page: currentPage,
      search: searchQuery,
      limit: BOOKS_PER_PAGE,
    });

    if (result.success) {
      setBooks(result.books);
      setCount(result.count as number);
    }

    setIsLoading(false);
  }, [searchQuery, filter, sortBy, genre, currentPage]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => fetchBooks(), 1000);

    return () => clearTimeout(debounceTimer);
  }, [fetchBooks]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);

    setCurrentPage(1);
  };

  const handleFilter = (newFilter: Filter) => {
    setFilter(newFilter);

    setCurrentPage(1);
  };

  const handleSort = (newSort: Sort) => {
    setSortBy(newSort);

    setCurrentPage(1);
  };

  const handleGenreChange = (newGenre: string) => {
    setGenre(newGenre);

    setCurrentPage(1);
  };

  const BookSkeleton = () => (
    <>
      {[...Array(BOOKS_PER_PAGE)].map((_, index) => (
        <div
          key={index}
          className='flex items-center justify-between gap-5 p-2.5 h-[112px] border rounded-md shadow'>
          <div className='flex items-center gap-2'>
            <Skeleton className='w-[60px] h-[90px] rounded-md' />
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-3 w-[180px]' />
              <Skeleton className='h-3 w-[150px]' />
              <Skeleton className='h-3 w-[120px]' />
              <div className='flex gap-2 mt-1'>
                <Skeleton className='h-4 w-16 rounded-md' />
                <Skeleton className='h-4 w-16 rounded-md' />
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center gap-2.5 w-24'>
            <Skeleton className='h-6 w-6 rounded-md' />
            <Skeleton className='h-4 w-24 rounded-md' />
          </div>
        </div>
      ))}
    </>
  );

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name', label: 'Title A-Z' },
    { value: 'author', label: 'Author A-Z' },
  ];

  const genres = [
    'all',
    'fiction',
    'non-fiction',
    'mystery',
    'sci-fi',
    'fantasy',
    'biography',
    'history',
    'self-help',
  ];

  return (
    <div className='space-y-5 bg-sidebar border rounded-md p-4 min-h-[calc(100vh-2rem)]'>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl'>All Books ({count})</h1>
          <AddBookButton />
        </div>
        <div className='flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between'>
          <div className='flex flex-col xl:flex-row w-full items-center gap-2.5'>
            <div className='relative w-full xl:w-1/2'>
              <SearchIcon className='absolute start-2 top-2.5 size-4 text-muted-foreground' />
              <Input
                placeholder='Search books...'
                className='ps-7'
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Select value={genre} onValueChange={handleGenreChange}>
              <SelectTrigger className='w-full xl:w-1/2'>
                Filter by Genres
              </SelectTrigger>
              <SelectContent>
                {genres.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col sm:flex-row gap-2.5 items-center'>
            <div className='flex gap-2.5 w-full sm:w-1/2 xl:w-2/3'>
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => handleFilter('all')}
                className='w-1/3'>
                All
              </Button>
              <Button
                variant={filter === 'completed' ? 'default' : 'outline'}
                onClick={() => handleFilter('completed')}
                className='w-1/3 text-xs'>
                Completed
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'outline'}
                onClick={() => handleFilter('unread')}
                className='w-1/3 text-xs'>
                Unread
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className='w-full sm:w-1/2 xl:w-1/3 h-9'>
                <Button variant='outline' size='sm'>
                  Sort By <ChevronDown className='ms-auto' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => handleSort(option.value as Sort)}
                    className={sortBy === option.value ? 'bg-accent' : ''}>
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className='grid gap-5 xl:grid-cols-2 2xl:grid-cols-3'>
        {isLoading ? (
          <BookSkeleton />
        ) : books.length === 0 ? (
          <div className='col-span-full text-center py-10'>
            <p className='text-muted-foreground'>No books found.</p>
          </div>
        ) : (
          books.map((book: Book) => <BookCard key={book.id} book={book} />)
        )}
      </div>
      {!isLoading && count > BOOKS_PER_PAGE && (
        <div className='flex justify-center items-center gap-2.5 mt-5'>
          <Button
            variant='outline'
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}>
            <ArrowLeftIcon />
            Previous
          </Button>
          <div className='flex items-center gap-2'>
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? 'default' : 'outline'}
                size='icon'
                onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            variant='outline'
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}>
            Next
            <ArrowRightIcon />
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllBooksPage;
