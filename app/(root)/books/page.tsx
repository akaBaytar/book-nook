import { LibraryBigIcon } from 'lucide-react';

import BookCard from '@/components/shared/book-card';
import Pagination from '@/components/shared/pagination';
import SearchForm from '@/components/shared/search-form';
import AddBookButton from '@/components/shared/add-book-button';

import { BOOKS_PER_PAGE } from '@/constants';
import { getAllBooks, getGenresAndCategories } from '@/actions/book.actions';

import type { Book, Filter, Sort } from '@/types';

type PageProps = {
  searchParams: Promise<{
    page?: string;
    genre?: string;
    category?: string;
    filter?: string;
    sort?: string;
    search?: string;
  }>;
};

const AllBooksPage = async ({ searchParams }: PageProps) => {
  const page = Number((await searchParams).page) || 1;
  const genre = (await searchParams).genre || 'all';
  const category = (await searchParams).category || 'all';
  const filter = ((await searchParams).filter as Filter) || 'all';
  const sortBy = ((await searchParams).sort as Sort) || 'recent';
  const search = (await searchParams).search || '';

  const [booksData, genresAndCategories] = await Promise.all([
    getAllBooks({
      genre,
      filter,
      sortBy,
      category,
      page,
      limit: BOOKS_PER_PAGE,
      search,
    }),
    getGenresAndCategories(),
  ]);

  if (!booksData.success || !genresAndCategories.success) {
    return (
      <section className='space-y-5 bg-sidebar border rounded-md p-4 min-h-[calc(100vh-2rem)]'>
        <div className='text-center py-10'>
          <p className='text-muted-foreground'>Failed to load books.</p>
        </div>
      </section>
    );
  }

  const { books = [], count = 0 } = booksData;

  const { genres: genresList = [], categories: categoriesList = [] } =
    genresAndCategories;

  const allGenres = ['all', ...genresList];
  const allCategories = ['all', ...categoriesList];

  const totalPages = Math.ceil(count / BOOKS_PER_PAGE);

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
            My Books ({count})
          </h1>
          <AddBookButton />
        </header>
        <SearchForm
          search={search}
          genre={genre}
          category={category}
          filter={filter}
          sortBy={sortBy}
          allGenres={allGenres}
          allCategories={allCategories}
          filterOptions={filterOptions}
        />
      </div>
      <div className='grid gap-5 xl:grid-cols-2 2xl:grid-cols-3'>
        {books.length === 0 ? (
          <div className='col-span-full text-center py-10'>
            <p className='text-muted-foreground'>No books found.</p>
          </div>
        ) : (
          books.map((book: Book) => <BookCard key={book.id} book={book} />)
        )}
      </div>
      {count > BOOKS_PER_PAGE && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          baseUrl={`?genre=${genre}&category=${category}&filter=${filter}&sort=${sortBy}&search=${search}&page=`}
        />
      )}
    </section>
  );
};

export default AllBooksPage;
