'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { SearchIcon } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

import { SORT_OPTIONS } from '@/constants';

import type { Filter, Sort } from '@/types';

type PropTypes = {
  search: string;
  genre: string;
  category: string;
  filter: Filter;
  sortBy: Sort;
  allGenres: string[];
  allCategories: string[];
  filterOptions: {
    value: string;
    label: string;
  }[];
};

const SearchForm = ({
  search,
  genre,
  category,
  filter,
  sortBy,
  allGenres,
  allCategories,
  filterOptions,
}: PropTypes) => {
  const router = useRouter();

  const updateSearchParams = useCallback(
    (params: Record<string, string | undefined>) => {
      const url = new URL(window.location.href);

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          url.searchParams.set(key, value);
        } else {
          url.searchParams.delete(key);
        }
      });

      if (!('page' in params)) {
        url.searchParams.set('page', '1');
      }

      router.push(url.pathname + url.search);
    },
    [router]
  );

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSearchParams({ search: e.target.value });
    },
    500
  );

  return (
    <>
      <div className='relative w-full'>
        <SearchIcon className='absolute start-2 top-2.5 size-4 text-muted-foreground' />
        <Input
          type='search'
          placeholder='Search books...'
          className='ps-7'
          defaultValue={search}
          onChange={handleSearch}
        />
      </div>
      <div className='grid gap-5 sm:grid-cols-2 2xl:grid-cols-4'>
        <Select
          defaultValue={genre}
          onValueChange={(value) => updateSearchParams({ genre: value })}>
          <SelectTrigger className='w-full'>
            {genre === 'all' ? 'Genres' : genre}
          </SelectTrigger>
          <SelectContent>
            {allGenres.map((g) => (
              <SelectItem key={g} value={g} className='cursor-pointer'>
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          defaultValue={category}
          onValueChange={(value) => updateSearchParams({ category: value })}>
          <SelectTrigger className='w-full'>
            {category === 'all' ? 'Categories' : category}
          </SelectTrigger>
          <SelectContent>
            {allCategories.map((c) => (
              <SelectItem key={c} value={c} className='cursor-pointer'>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          defaultValue={filter}
          onValueChange={(value) => updateSearchParams({ filter: value })}>
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
        <Select
          defaultValue={sortBy}
          onValueChange={(value) => updateSearchParams({ sort: value })}>
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
    </>
  );
};

export default SearchForm;
