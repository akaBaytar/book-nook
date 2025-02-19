'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { useDebounce } from 'use-debounce';
import { SearchIcon, ChevronDown, LibraryBigIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';

import Pagination from '@/components/shared/pagination';
import AddBookButton from '@/components/shared/add-book-button';
import BookCard, { BookSkeleton } from '@/components/shared/book-card';

import { useToast } from '@/hooks/use-toast';
import { BOOKS_PER_PAGE, SORT_OPTIONS } from '@/constants';

import {
  getAllBooks,
  getAllGenres,
  getAllCategories,
} from '@/actions/book.actions';

import type { Book, Filter, Sort } from '@/types';

const AllBooksPage = () => {
  const router = useRouter();

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

  const fetchGenres = useCallback(async () => {
    try {
      const result = await getAllGenres();

      if (result.success) setGenres(['all', ...(result.genres as string[])]);
    } catch (error) {
      toast({ description: `Failed to fetch genres. ${error}` });
    }
  }, [toast]);

  const fetchCategories = useCallback(async () => {
    try {
      const result = await getAllCategories();

      if (result.success) {
        setCategories(['all', ...(result.categories as string[])]);
      }
    } catch (error) {
      toast({
        description: `Failed to fetch categories. ${error}`,
      });
    }
  }, [toast]);

  const fetchBooks = useCallback(
    async (force = false) => {
      setIsLoading(true);

      try {
        const result = await getAllBooks({
          genre,
          filter,
          sortBy,
          category,
          page: currentPage,
          limit: BOOKS_PER_PAGE,
          search: force ? searchQuery : debouncedSearch,
        });

        if (result.success) {
          setBooks(result.books);
          setCount(result.count as number);
        }
      } catch (error) {
        toast({ description: `An error occurred. ${error}` });
      } finally {
        setIsLoading(false);
      }
    },
    [
      toast,
      genre,
      filter,
      sortBy,
      category,
      currentPage,
      searchQuery,
      debouncedSearch,
    ]
  );

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    fetchGenres();
    fetchCategories();
  }, [fetchGenres, fetchCategories]);

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
    router.refresh();
    fetchBooks(true);
  }, [router, fetchBooks]);

  return (
    <section className='space-y-5 bg-sidebar border rounded-md p-4 min-h-[calc(100vh-2rem)]'>
      <div className='flex flex-col gap-5'>
        <header className='flex items-center justify-between'>
          <h1 className='flex items-center gap-2 text-2xl tracking-[0.015em]'>
            <LibraryBigIcon className='size-5' />
            All Books ({count})
          </h1>
          <AddBookButton onBookAdded={handleBookAdded} />
        </header>
        <div className='flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between'>
          <div className='flex flex-col xl:flex-row w-full items-center gap-5'>
            <div className='relative w-full xl:w-1/2'>
              <SearchIcon className='absolute start-2 top-2.5 size-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search books...'
                className='ps-7'
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Select value={genre} onValueChange={handleGenreChange}>
              <SelectTrigger className='w-full xl:w-1/2 text-muted-foreground'>
                {genre === 'all' ? 'Filter by Genres' : genre}
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
              <SelectTrigger className='w-full xl:w-1/2 text-muted-foreground'>
                {category === 'all' ? 'Filter by Categories' : category}
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c} className='cursor-pointer'>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col sm:flex-row gap-5 items-center'>
            <div className='flex gap-2.5 w-full sm:w-1/2 xl:w-2/3'>
              {(['all', 'completed', 'unread'] as const).map((filterOption) => (
                <Button
                  key={filterOption}
                  variant={filter === filterOption ? 'default' : 'outline'}
                  onClick={() => handleFilter(filterOption)}
                  className='w-1/3 text-xs capitalize'>
                  {filterOption}
                </Button>
              ))}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className='w-full sm:w-1/2 xl:w-1/3 h-9 mt-2.5 sm:mt-0'>
                <Button variant='outline' size='sm'>
                  Sort By <ChevronDown className='ms-auto' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {SORT_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => handleSort(option.value as Sort)}
                    className={
                      sortBy === option.value
                        ? 'bg-accent cursor-pointer'
                        : 'cursor-pointer'
                    }>
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
