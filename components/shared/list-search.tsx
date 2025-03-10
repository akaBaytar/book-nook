'use client';

import { useState, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { useDebouncedCallback } from 'use-debounce';
import { Loader2Icon, SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';

const ListSearch = ({ initialQuery = '' }) => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(initialQuery);

  const debounced = useDebouncedCallback((value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }

      router.replace(`${pathname}?${params.toString()}`);
    });
  }, 500);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);
    debounced(value);
  };

  return (
    <div className='relative w-full'>
      {isPending ? (
        <Loader2Icon className='absolute left-2 top-2.5 size-4 text-muted-foreground animate-spin' />
      ) : (
        <SearchIcon className='absolute left-2 top-2.5 size-4 text-muted-foreground' />
      )}
      <Input
        placeholder='Search...'
        className='ps-7'
        value={query}
        onChange={onChange}
      />
    </div>
  );
};

export default ListSearch;
