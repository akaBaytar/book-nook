import { ListTreeIcon } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';

import { getAllList } from '@/actions/list.actions';

import ListCard from '@/components/shared/list-card';
import AddListButton from '@/components/shared/add-list-button';

import ListSearch from '@/components/shared/list-search';
import ListFilter from '@/components/shared/list-filter';

import type { List } from '@/types';

type PageProps = {
  searchParams: Promise<{ search: string; privacy: string }>;
};

const ListsPage = async ({ searchParams }: PageProps) => {
  const searchQuery = (await searchParams)?.search || '';
  const privacyFilter = (await searchParams)?.privacy || 'all';

  const { success, lists, message, count } = await getAllList(
    searchQuery,
    privacyFilter
  );

  return (
    <div className='space-y-5 bg-sidebar rounded-md border p-4 min-h-[calc(100vh-2rem)]'>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center justify-between gap-5'>
          <h1 className='flex items-center gap-2 text-2xl tracking-[0.015em]'>
            <ListTreeIcon className='size-5 mt-0.5' />
            My Lists
            <span>({count})</span>
          </h1>
          <AddListButton />
        </div>
        <div className='flex items-center justify-between gap-5 sm:gap-10'>
          <ListSearch initialQuery={searchQuery} />
          <ListFilter initialFilter={privacyFilter} />
        </div>
      </div>
      <div className='grid gap-5'>
        {!success ? (
          <Alert>
            <AlertDescription>
              {message || 'An error occurred.'}
            </AlertDescription>
          </Alert>
        ) : lists.length === 0 ? (
          <Alert>
            <AlertDescription>
              No lists found. Try removing filters or add a new list.
            </AlertDescription>
          </Alert>
        ) : (
          lists.map((list: List) => <ListCard key={list.id} list={list} books={list.books} />)
        )}
      </div>
    </div>
  );
};

export default ListsPage;
