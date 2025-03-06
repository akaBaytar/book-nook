import { useState, useEffect } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import { getAllBooks } from '@/actions/book.actions';
import { getAllList } from '@/actions/list.actions';

import type { Dispatch, SetStateAction } from 'react';

import type { Book, List } from '@/types';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type PropTypes = {
  searchOpen: boolean;
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SearchDialog({ searchOpen, setSearchOpen }: PropTypes) {
  const [isLoading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('books');
  const [results, setResults] = useState<Book[] | List[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);

      let data = [];

      if (searchType === 'books') {
        const res = await getAllBooks({ search: searchQuery });

        if (res.success) data = res.books;
      } else {
        const res = await getAllList();

        if (res.success) {
          data = res.lists.filter((list: List) =>
            list.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
      }
      setResults(data);

      setLoading(false);
    };

    const timeoutId = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchType]);

  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent className='z-50 p-6'>
        <DialogHeader>
          <DialogTitle>Search Books & Lists</DialogTitle>
          <DialogDescription>
            {searchType === 'books'
              ? 'Search your books by title, author or publisher.'
              : 'Search your lists by title.'}
          </DialogDescription>
        </DialogHeader>
        <Tabs value={searchType} onValueChange={setSearchType}>
          <TabsList className='mb-4 w-full flex items-center gap-2.5'>
            <TabsTrigger
              value='books'
              onClick={() => setSearchQuery('')}
              className='flex-1'>
              Books
            </TabsTrigger>
            <TabsTrigger
              value='lists'
              onClick={() => setSearchQuery('')}
              className='flex-1'>
              Lists
            </TabsTrigger>
          </TabsList>
          <Input
            type='search'
            placeholder={`Search ${searchType}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full mb-4'
          />
          {isLoading ? (
            <div className='grid place-content-center p-2.5 rounded-md'>
              <Loader2Icon className='animate-spin size-4' />
            </div>
          ) : (
            <TabsContent value={searchType}>
              {results.length > 0 && (
                <ScrollArea className='max-h-64 overflow-y-auto'>
                  <ul className='space-y-2'>
                    {results.map((item) => (
                      <li key={item.id} className='p-2 border rounded-md'>
                        {searchType === 'books' ? (
                          <Link
                            href={`/books/${item.id}`}
                            onClick={() => setSearchOpen(false)}
                            className='flex items-center gap-2.5'>
                            <Image
                              src={(item as Book).image || '/placeholder.jpg'}
                              alt={item.name}
                              width={27}
                              height={48}
                              className='rounded-sm object-contain'
                            />
                            {item.name} by {(item as Book).author}
                          </Link>
                        ) : (
                          <Link
                            href={`/my-lists/${item.id}`}
                            onClick={() => setSearchOpen(false)}
                            className='flex'>
                            {item.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              )}
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
