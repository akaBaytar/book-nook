'use client';

import { use } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import {
  ArrowLeft,
  StarIcon,
  BookOpen,
  Calendar,
  Library,
  Share2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { formatDate } from '@/utils';

import { BOOKS } from '@/mock';

type PropType = {
  params: Promise<{ id: number }>;
};

const BookDetailsPage = ({ params }: PropType) => {
  const { id } = use(params);

  const book = BOOKS[id - 1];

  const {
    type,
    name,
    isbn,
    quote,
    image,
    genre,
    author,
    rating,
    volume,
    summary,
    endDate,
    language,
    printing,
    category,
    pageCount,
    completed,
    publisher,
    startDate,
    translator,
    illustrator,
    acquiredDate,
    publicationDate,
  } = book;

  if (!book) {
    return (
      <div className='flex flex-col items-center justify-center h-[calc(100vh-2rem)] gap-5'>
        <p className='text-xl text-muted-foreground'>Book not found.</p>
        <Link href='/all-books'>
          <Button variant='outline'>
            <ArrowLeft className='mr-2 size-4' />
            Back to Books
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Card className='relative rounded-md bg-sidebar min-h-[calc(100vh-2rem)]'>
      <CardHeader className='flex items-center text-center xl:flex-row xl:items-start gap-5 sm:gap-10'>
        {image && (
          <div className='relative min-w-[200px]'>
            <Image
              src={image}
              alt={name}
              width={200}
              height={300}
              className='rounded-md object-cover'
            />
          </div>
        )}
        <div className='flex flex-col items-center text-center xl:text-start xl:items-start space-y-5'>
          <div>
            {name && (
              <CardTitle className='text-2xl font-bold flex items-center gap-2.5'>
                {name}{' '}
                {completed && (
                  <Badge className='hover:bg-black mt-0.5'>Completed</Badge>
                )}
              </CardTitle>
            )}
            {author && (
              <p className='text-lg text-muted-foreground'>by {author}</p>
            )}
          </div>
          {genre && genre.length > 0 && (
            <div className='flex flex-wrap gap-2.5'>
              {genre.map((g: string) => (
                <Badge
                  key={g}
                  variant='secondary'
                  className='border border-input'>
                  {g}
                </Badge>
              ))}
            </div>
          )}
          {rating && (
            <div className='flex items-center gap-1'>
              <StarIcon className='fill-amber-500 text-amber-500 size-5'/>
              <span className='text-lg font-semibold'>{rating}/5</span>
            </div>
          )}
          {(pageCount || startDate || endDate) && (
            <div className='flex flex-wrap gap-5'>
              {pageCount && (
                <div className='flex items-center gap-1'>
                  <BookOpen className='size-4 text-muted-foreground' />
                  <span>{pageCount} pages</span>
                </div>
              )}
              {startDate && (
                <div className='flex items-center gap-1'>
                  <Calendar className='size-4 text-muted-foreground' />
                  <span>Started {formatDate(startDate)}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className='space-y-10'>
        <div className='space-y-5'>
          {summary && (
            <div className='space-y-2.5 text-center xl:text-start'>
              <h3 className='text-lg font-semibold'>Summary</h3>
              <p className='text-muted-foreground leading-relaxed'>{summary}</p>
            </div>
          )}
          {quote && (
            <blockquote className='border-s-4 border p-4 rounded-md italic text-muted-foreground'>
              &quot;{quote}&quot;
            </blockquote>
          )}
        </div>
        <Separator />
        <div>
          <h3 className='text-lg font-semibold mb-4'>Book Details</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 text-sm'>
            {type && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Type</p>
                <p className='font-medium'>
                  {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                </p>
              </div>
            )}
            {volume && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Volume</p>
                <p className='font-medium'>{volume}</p>
              </div>
            )}
            {category && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Category</p>
                <p className='font-medium'>{category}</p>
              </div>
            )}
            {isbn && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>ISBN</p>
                <p className='font-medium'>{isbn}</p>
              </div>
            )}
            {language && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Language</p>
                <p className='font-medium'>{language}</p>
              </div>
            )}
            {printing && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Printing</p>
                <p className='font-medium'>{printing}</p>
              </div>
            )}
            {publisher && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Publisher</p>
                <p className='font-medium'>{publisher}</p>
              </div>
            )}
            {publicationDate && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Publication Date</p>
                <p className='font-medium'>{formatDate(publicationDate)}</p>
              </div>
            )}
            {endDate && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>End Date</p>
                <p className='font-medium'>{formatDate(endDate)}</p>
              </div>
            )}
            {acquiredDate && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Acquired Date</p>
                <p className='font-medium'>{formatDate(acquiredDate)}</p>
              </div>
            )}
            {translator && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Translator</p>
                <p className='font-medium'>{translator}</p>
              </div>
            )}
            {illustrator && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Illustrator</p>
                <p className='font-medium'>{illustrator}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <div className='flex items-center gap-2.5 absolute top-4 end-4'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline' size='icon'>
                <Share2 className='size-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share book</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button>
          <Library className='mr-2 size-4' />
          Add to List
        </Button>
      </div>
    </Card>
  );
};

export default BookDetailsPage;
