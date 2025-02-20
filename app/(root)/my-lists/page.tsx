'use client';

import { useState, useEffect, useCallback } from 'react';

import { ListTreeIcon, SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { useToast } from '@/hooks/use-toast';
import { getBooks } from '@/actions/book.actions';
import { getAllList } from '@/actions/list.actions';

import ListCard from '@/components/shared/list-card';
import AddListButton from '@/components/shared/add-list-button';

import type { List } from '@/types';

type Book = {
  id: string;
  name: string;
  author: string;
  image: string;
  genre: string[];
};

const ListsSkeleton = () => {
  return (
    <>
      <div className='flex flex-col justify-between gap-5'>
        <div className='flex items-center justify-between gap-5'>
          <Skeleton className='h-9 w-40' />
          <Skeleton className='h-9 w-32' />
        </div>
        <div className='flex items-center justify-between gap-5 sm:gap-10'>
          <Skeleton className='h-9 w-full' />
          <div className='flex gap-1 sm:gap-2.5'>
            <Skeleton className='h-9 w-9' />
            <Skeleton className='h-9 w-16' />
            <Skeleton className='h-9 w-16' />
          </div>
        </div>
      </div>
      <div className='grid gap-5'>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className='h-[233px] w-full rounded-md' />
        ))}
      </div>
    </>
  );
};

const ListsPage = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [booksData, setBooksData] = useState<Record<string, Book[]>>({});

  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [privacyFilter, setPrivacyFilter] = useState('all');

  const { toast } = useToast();

  const fetchBooks = useCallback(
    async (lists: List[]) => {
      try {
        const allBookIds = Array.from(
          new Set(lists.flatMap((list) => list.books?.filter(Boolean) || []))
        );

        if (allBookIds.length === 0) return;

        const { success, books } = await getBooks(allBookIds);

        if (success) {
          const booksMapping = lists.reduce<Record<string, Book[]>>(
            (acc, list) => {
              if (list.id) {
                acc[list.id] = books.filter((book: Book) =>
                  list.books?.includes(book.id)
                );
              }
              return acc;
            },
            {}
          );
          setBooksData(booksMapping);
        }
      } catch {
        toast({ description: 'An error occurred.' });
      }
    },
    [toast]
  );

  const fetchLists = useCallback(async () => {
    setLoading(true);

    try {
      const { success, lists, message } = await getAllList();
      if (success) {
        setLists(lists);

        await fetchBooks(lists);
      } else {
        toast({ description: message });
      }
    } catch {
      toast({ description: 'An error occurred.' });
    } finally {
      setLoading(false);
    }
  }, [toast, fetchBooks]);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  const filteredLists = lists.filter((list: List) => {
    const matchesSearch =
      list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      list.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrivacy =
      privacyFilter === 'all'
        ? true
        : privacyFilter === 'public'
        ? list.private === false
        : list.private === true;

    return matchesSearch && matchesPrivacy;
  });

  return (
    <div className='space-y-5 bg-sidebar rounded-md border p-4 min-h-[calc(100vh-2rem)]'>
      {loading ? (
        <ListsSkeleton />
      ) : (
        <>
          <div className='flex flex-col gap-5'>
            <div className='flex items-center justify-between gap-5'>
              <h1 className='flex items-center gap-2 text-2xl tracking-[0.015em]'>
                <ListTreeIcon className='size-5 mt-0.5' />
                My Lists ({filteredLists.length})
              </h1>
              <AddListButton onAdd={fetchLists} />
            </div>
            <div className='flex items-center justify-between gap-5 sm:gap-10'>
              <div className='relative w-full'>
                <SearchIcon className='absolute left-2 top-2.5 size-4 text-muted-foreground' />
                <Input
                  placeholder='Search...'
                  className='ps-7'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className='flex gap-1 sm:gap-2.5'>
                <Button
                  variant={privacyFilter === 'all' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setPrivacyFilter('all')}>
                  All
                </Button>
                <Button
                  variant={privacyFilter === 'public' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setPrivacyFilter('public')}>
                  Public
                </Button>
                <Button
                  variant={privacyFilter === 'private' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setPrivacyFilter('private')}>
                  Private
                </Button>
              </div>
            </div>
          </div>
          {filteredLists.length === 0 && (
            <Alert>
              <AlertDescription>
                No lists found. Try removing filters or add a new list.
              </AlertDescription>
            </Alert>
          )}
          <div className='grid gap-5'>
            {filteredLists.map((list) => (
              <ListCard key={list.id} list={list} books={booksData[list.id]} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListsPage;
