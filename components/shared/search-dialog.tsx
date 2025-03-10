'use client';

import { useState, useTransition } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { Loader2Icon, SearchIcon } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { getAllList } from '@/actions/list.actions';
import { getAllBooks } from '@/actions/book.actions';

import type { Book, List } from '@/types';
import { cn } from '@/lib/utils';

type PropTypes = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SearchDialog = ({ open, onOpenChange }: PropTypes) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('books');
  const [results, setResults] = useState<Book[] | List[]>([]);

  const [isPending, startTransition] = useTransition();

  const fetchSearchResults = async (query: string, type: string) => {
    if (type === 'books') {
      const res = await getAllBooks({ search: query });

      return res.success ? res.books : [];
    } else {
      const res = await getAllList();

      return res.success
        ? res.lists.filter((list: List) =>
            list.name.toLowerCase().includes(query.toLowerCase())
          )
        : [];
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      setResults([]);
      return;
    }

    startTransition(async () => {
      const searchResults = await fetchSearchResults(query, searchType);

      setResults(searchResults);
    });
  };

  const handleTabChange = (value: string) => {
    setSearchType(value);

    setResults([]);

    if (searchQuery.trim() !== '') {
      startTransition(async () => {
        const searchResults = await fetchSearchResults(searchQuery, value);

        setResults(searchResults);
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='z-50'>
        <DialogHeader>
          <DialogTitle className='text-xl'>Search</DialogTitle>
          <DialogDescription>
            Find your{' '}
            {searchType === 'books'
              ? 'books by title, author or publisher'
              : 'lists by name'}
          </DialogDescription>
        </DialogHeader>
        <Tabs value={searchType} onValueChange={handleTabChange}>
          <TabsList className='mb-5 w-full grid grid-cols-2 gap-2.5'>
            <TabsTrigger value='books' className='rounded-sm'>
              Books
            </TabsTrigger>
            <TabsTrigger value='lists' className='rounded-sm'>
              Lists
            </TabsTrigger>
          </TabsList>
          <div className='relative mb-5'>
            <Input
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={`Search ${
                searchType === 'books'
                  ? 'by title, author or publisher'
                  : 'by list name'
              }`}
              className='w-full text-sm pe-10'
            />
            <div className='absolute end-2.5 top-1/2 -translate-y-1/2'>
              {isPending ? (
                <Loader2Icon className='animate-spin size-4' />
              ) : (
                <SearchIcon className='size-4' />
              )}
            </div>
          </div>
          <div className='min-h-60'>
            {isPending ? (
              <p className='text-sm font-light text-center py-5'>
                <Loader2Icon className='animate-spin inline size-4 me-2' />
                Searching {searchType}...
              </p>
            ) : results.length > 0 ? (
              <ScrollArea
                className={cn(
                  'max-h-60 overflow-y-auto',
                  results.length >= 4 && 'pe-2.5'
                )}>
                <ul className='space-y-2.5'>
                  {results.map((item) => (
                    <li
                      key={item.id}
                      className='p-2 border rounded-md hover:bg-accent transition-colors'>
                      {searchType === 'books' ? (
                        <Link
                          href={`/books/${item.id}`}
                          onClick={() => onOpenChange(false)}
                          className='flex items-center gap-2.5'>
                          <Image
                            src={(item as Book).image || '/placeholder.jpg'}
                            alt={item.name}
                            width={27}
                            height={48}
                            className='rounded-sm object-contain'
                          />
                          <div>
                            <p className='font-medium line-clamp-1'>{item.name}</p>
                            <p className='text-sm text-muted-foreground line-clamp-1'>
                              by {(item as Book).author}
                            </p>
                          </div>
                        </Link>
                      ) : (
                        <Link
                          href={`/my-lists/${item.id}`}
                          onClick={() => onOpenChange(false)}
                          className='flex items-center'>
                          <div className='size-5 me-2 bg-primary/10 rounded-sm grid place-items-center text-primary'>
                            <span className='text-xs'>
                              {item.name.charAt(0)}
                            </span>
                          </div>
                          <span className='line-clamp-1'>{item.name}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            ) : searchQuery.trim() !== '' ? (
              <p className='text-center text-muted-foreground py-5'>
                No results found.
              </p>
            ) : null}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
