'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';

import { useDebounce } from 'use-debounce';
import { SearchIcon, LibraryBigIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select';

import Pagination from '@/components/shared/pagination';
import AddBookButton from '@/components/shared/add-book-button';
import BookCard, { BookSkeleton } from '@/components/shared/book-card';

import { useToast } from '@/hooks/use-toast';
import { BOOKS_PER_PAGE, SORT_OPTIONS } from '@/constants';

import { getAllBooks, getGenresAndCategories } from '@/actions/book.actions';

import type { Book, Filter, Sort } from '@/types';

const AllBooksPage = () => {
  const { toast } = useToast();

  const [count, setCount] = useState(0);
  const [genre, setGenre] = useState('all');
  const [category, setCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<string[]>(['all']);
  const [categories, setCategories] = useState<string[]>(['all']);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const [filter, setFilter] = useState<Filter>('all');
  const [sortBy, setSortBy] = useState<Sort>('recent');

  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const totalPages = useMemo(() => Math.ceil(count / BOOKS_PER_PAGE), [count]);

  const fetchGenresAndCategories = useCallback(async () => {
    try {
      const result = await getGenresAndCategories();

      if (result.success) {
        setGenres(['all', ...(result.genres as string[])]);
        setCategories(['all', ...(result.categories as string[])]);
      }
    } catch {
      toast({ description: 'Failed to fetch genres and categories.' });
    }
  }, [toast]);

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await getAllBooks({
        genre,
        filter,
        sortBy,
        category,
        page: currentPage,
        limit: BOOKS_PER_PAGE,
        search: debouncedSearch,
      });

      if (result.success) {
        setBooks(result.books);
        setCount(result.count as number);
      }
    } catch {
      toast({ description: 'An error occurred.' });
    } finally {
      setIsLoading(false);
    }
  }, [toast, genre, filter, sortBy, category, currentPage, debouncedSearch]);

  useEffect(() => {}, [fetchBooks]);

  useEffect(() => {
    fetchBooks();
    fetchGenresAndCategories();
  }, [fetchBooks, fetchGenresAndCategories]);

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

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const handleBookAdded = useCallback(() => {
    fetchBooks();
  }, [fetchBooks]);

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'completed', label: 'Completed' },
    { value: 'unread', label: 'Unread' },
  ];

  return (
    <section className='space-y-5 bg-sidebar border rounded-md p-4 min-h-[calc(100vh-2rem)]'>
      <div className='flex flex-col gap-5'>
        <header className='flex items-center justify-between'>
          <h1 className='flex items-center gap-2 text-2xl tracking-[0.015em]'>
            <LibraryBigIcon className='size-5' />
            My Books
          </h1>
          <AddBookButton onBookAdded={handleBookAdded} />
        </header>
        <div className='flex flex-col gap-5'>
          <div className='relative w-full'>
            <SearchIcon className='absolute start-2 top-2.5 size-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search books...'
              className='ps-7'
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className='grid gap-5 sm:grid-cols-2 2xl:grid-cols-4'>
            <Select value={genre} onValueChange={handleGenreChange}>
              <SelectTrigger className='w-full'>
                {genre === 'all' ? 'Genres' : genre}
              </SelectTrigger>
              <SelectContent>
                {genres.map((g) => (
                  <SelectItem key={g} value={g} className='cursor-pointer'>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger className='w-full'>
                {category === 'all' ? 'Categories' : category}
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c} className='cursor-pointer'>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filter} onValueChange={handleFilter}>
              <SelectTrigger className='w-full'>
                {filter === 'all'
                  ? 'Reading Status'
                  : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className='cursor-pointer'>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={handleSort}>
              <SelectTrigger className='w-full'>
                {sortBy === 'recent'
                  ? 'Most Recent'
                  : sortBy === 'author'
                  ? 'Author A-Z'
                  : sortBy === 'name'
                  ? 'Title A-Z'
                  : 'Oldest First'}
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className='cursor-pointer'>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          books.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </div>
      {count > BOOKS_PER_PAGE && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
};

export default AllBooksPage;
