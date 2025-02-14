'use client'

import { useState } from 'react';

import { SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import ListCard from '@/components/shared/list-card';

import { LISTS } from '@/mock';

const ListsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [privacyFilter, setPrivacyFilter] = useState('all');

  const filteredLists = LISTS.filter((list) => {
    const matchesSearch =
      list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      list.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrivacy =
      privacyFilter === 'all'
        ? true
        : privacyFilter === 'public'
        ? list.privacy === 'PUBLIC'
        : list.privacy === 'PRIVATE';

    return matchesSearch && matchesPrivacy;
  });

  return (
    <div className='space-y-5 bg-sidebar rounded-md border p-4 min-h-[calc(100vh-2rem)]'>
      <div className='flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between'>
        <h1 className='text-2xl tracking-[0.015em]'>My Lists ({filteredLists.length})</h1>
        <div className='flex items-center gap-4'>
          <div className='relative'>
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
      <div className='grid gap-5 xl:grid-cols-2 2xl:grid-cols-3'>
        {filteredLists.map((list) => (
          <ListCard key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};

export default ListsPage;
