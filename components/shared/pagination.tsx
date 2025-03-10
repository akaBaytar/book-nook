'use client';

import { useMemo } from 'react';

import Link from 'next/link';

import {
  MoreHorizontal,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type PaginationProps = {
  baseUrl: string;
  totalPages: number;
  className?: string;
  showPages?: boolean;
  currentPage: number;
  siblingCount?: number;
  showPageInfo?: boolean;
  onPageChange?: (page: number) => void;
};

type ButtonProps = {
  page: number;
  baseUrl: string;
  disabled: boolean;
  direction: 'previous' | 'next';
  onPageChange?: (page: number) => void;
};

const Pagination = ({
  baseUrl,
  totalPages,
  currentPage,
  className = '',
  showPages = true,
  siblingCount = 1,
  onPageChange,
}: PaginationProps) => {
  const DOTS = 'dots';

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [1, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, DOTS, ...middleRange, DOTS, totalPages];
    }

    return range(1, totalPages);
  }, [totalPages, currentPage, siblingCount]);

  const handlePageClick = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const PageButton = ({ page }: { page: number | string }) => {
    const isCurrentPage = currentPage === page;
    const isNumber = typeof page === 'number';

    if (!isNumber) {
      return (
        <Button
          size='sm'
          variant='outline'
          className='size-8 sm:size-9 flex items-center justify-center'
          disabled
          aria-hidden='true'>
          <MoreHorizontal className='size-4' />
        </Button>
      );
    }

    const PageLink = () => (
      <Button
        variant={isCurrentPage ? 'default' : 'outline'}
        size='icon'
        className={`size-8 sm:size-9 ${
          isCurrentPage ? 'pointer-events-none' : 'hover:bg-primary/10'
        }`}
        onClick={
          onPageChange ? () => handlePageClick(page as number) : undefined
        }
        aria-label={`Go to page ${page}`}
        aria-current={isCurrentPage ? 'page' : undefined}>
        {page}
      </Button>
    );

    if (onPageChange) {
      return <PageLink />;
    }

    return (
      <Button
        variant={isCurrentPage ? 'default' : 'outline'}
        size='icon'
        className={`size-8 sm:size-9 ${
          isCurrentPage ? 'pointer-events-none' : 'hover:bg-primary/10'
        }`}
        asChild
        aria-label={`Go to page ${page}`}
        aria-current={isCurrentPage ? 'page' : undefined}>
        <Link href={`${baseUrl}${page}`}>{page}</Link>
      </Button>
    );
  };

  const NavigationButton = ({
    page,
    baseUrl,
    disabled,
    direction,
    onPageChange,
  }: ButtonProps) => {
    const label = direction === 'previous' ? 'Previous' : 'Next';

    if (disabled) {
      return (
        <Button
          size='icon'
          variant='outline'
          className='size-8 sm:size-9'
          disabled
          aria-label={`${label} page (disabled)`}>
          {direction === 'previous' ? (
            <ChevronLeftIcon className='size-4' />
          ) : (
            <ChevronRightIcon className='size-4' />
          )}
        </Button>
      );
    }

    const NavigationButtonContent = () => (
      <>
        {direction === 'previous' ? (
          <ChevronLeftIcon className='size-4' />
        ) : (
          <ChevronRightIcon className='size-4' />
        )}
      </>
    );

    if (onPageChange) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size='icon'
                variant='outline'
                className='size-8 sm:size-9 hover:bg-primary/10'
                onClick={() => handlePageClick(page)}
                aria-label={`Go to ${label} page`}>
                <NavigationButtonContent />
              </Button>
            </TooltipTrigger>
            <TooltipContent side='top'>
              <p>{label} page</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size='icon'
              variant='outline'
              className='size-8 sm:size-9 hover:bg-primary/10'
              asChild
              aria-label={`Go to ${label} page`}>
              <Link href={`${baseUrl}${page}`}>
                <NavigationButtonContent />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side='top'>
            <p>{label} page</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  if (totalPages <= 1) return null;

  return (
    <div
      className={`flex items-center justify-center ${className}`}>
      <nav
        role='navigation'
        aria-label='Pagination'
        className='flex justify-center items-center gap-1 sm:gap-2'>
        <NavigationButton
          direction='previous'
          page={currentPage - 1}
          baseUrl={baseUrl}
          disabled={currentPage === 1}
          onPageChange={onPageChange}
        />
        {showPages && (
          <div
            className='flex items-center gap-1 sm:gap-2'
            role='group'
            aria-label='Pagination pages'>
            {paginationRange.map((pageNumber, index) => (
              <PageButton key={`${pageNumber}-${index}`} page={pageNumber} />
            ))}
          </div>
        )}
        <NavigationButton
          direction='next'
          page={currentPage + 1}
          baseUrl={baseUrl}
          disabled={currentPage === totalPages}
          onPageChange={onPageChange}
        />
      </nav>
    </div>
  );
};

export default Pagination;
