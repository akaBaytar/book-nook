import { useMemo } from 'react';

import { ArrowLeftIcon, ArrowRightIcon, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';

type PropTypes = {
  totalPages: number;
  showPages?: boolean;
  currentPage: number;
  siblingCount?: number;
  onPageChange: (page: number) => void;
};

type ButtonProps = {
  direction: 'previous' | 'next';
  onClick: () => void;
  disabled: boolean;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showPages = true,
  siblingCount = 1,
}: PropTypes) => {
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

  const PageButton = ({ page }: { page: number | string }) => {
    const isCurrentPage = currentPage === page;
    const isNumber = typeof page === 'number';

    if (!isNumber) {
      return (
        <Button
          size='sm'
          variant='outline'
          className='size-9'
          disabled
          aria-hidden='true'>
          <MoreHorizontal />
        </Button>
      );
    }

    return (
      <Button
        variant={isCurrentPage ? 'default' : 'outline'}
        size='icon'
        className='size-9'
        onClick={() => onPageChange(page)}
        aria-label={`Go to page ${page}`}
        aria-current={isCurrentPage ? 'page' : undefined}>
        {page}
      </Button>
    );
  };

  const NavigationButton = ({ direction, onClick, disabled }: ButtonProps) => (
    <Button
      variant='outline'
      onClick={onClick}
      disabled={disabled}
      className='gap-2.5'
      aria-label={`Go to ${direction} page`}>
      {direction === 'previous' && <ArrowLeftIcon />}
      {direction === 'previous' ? 'Previous' : 'Next'}
      {direction === 'next' && <ArrowRightIcon />}
    </Button>
  );

  if (totalPages <= 1) return null;

  return (
    <nav
      role='navigation'
      aria-label='Pagination'
      className='flex justify-center items-center gap-2.5 2xl:justify-end'>
      <NavigationButton
        direction='previous'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {showPages && (
        <div
          className='flex items-center gap-2.5'
          role='group'
          aria-label='Pagination pages'>
          {paginationRange.map((pageNumber, index) => (
            <PageButton key={`${pageNumber}-${index}`} page={pageNumber} />
          ))}
        </div>
      )}
      <NavigationButton
        direction='next'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </nav>
  );
};

export default Pagination;
