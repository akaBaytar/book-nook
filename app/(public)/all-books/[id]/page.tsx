import Image from 'next/image';

import {
  StarIcon,
  QuoteIcon,
  CalendarIcon,
  SwatchBookIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { formatDate } from '@/utils';
import { getPublicBook } from '@/actions/book.actions';

type PropType = {
  params: Promise<{ id: string }>;
};

const PublicBookDetailPage = async ({ params }: PropType) => {
  const { id } = await params;

  const { book } = await getPublicBook(id);

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
    readingNow,
    translator,
    illustrator,
    acquiredDate,
    publicationDate,
  } = book;

  if (!book) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-xl'>List not found.</p>
      </div>
    );
  }

  return (
    <Card className='relative rounded-md bg-sidebar min-h-screen'>
      <CardHeader className='flex items-center text-center gap-5'>
        {image && (
          <div className='relative min-w-[200px]'>
            <Image
              src={image || '/placeholder.jpg'}
              alt={name}
              width={200}
              height={300}
              className='rounded-md object-cover'
            />
          </div>
        )}
        <div className='flex flex-col items-center text-center space-y-5'>
          <div>
            {name && (
              <CardTitle className='text-2xl font-medium tracking-[0.015em] flex flex-col sm:flex-row mb-2.5 items-center gap-2.5 truncate'>
                {name}
                {completed && (
                  <Badge className='bg-gradient-to-r from-violet-200 to-pink-200 cursor-default mt-0.5'>
                    Completed
                  </Badge>
                )}
                {readingNow && !completed && (
                  <Badge className='bg-gradient-to-r from-violet-200 to-pink-200 cursor-default mt-0.5'>
                    Currently Reading
                  </Badge>
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
              <StarIcon className='fill-pink-100 text-pink-400 size-5' />
              <span className='text-lg'>{rating}/5</span>
            </div>
          )}
          {(pageCount || startDate || endDate) && (
            <div className='flex flex-wrap gap-5'>
              {pageCount && (
                <div className='flex items-center justify-center w-full gap-1'>
                  <SwatchBookIcon className='fill-pink-100 text-pink-400 size-5' />
                  <span>{pageCount} pages</span>
                </div>
              )}
              {startDate && (
                <div className='flex items-center justify-center w-full gap-1'>
                  <CalendarIcon className='fill-pink-100 text-pink-400 size-5' />
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
            <div className='space-y-2.5 text-center text-pretty'>
              <h3 className='text-lg'>Summary</h3>
              <p className='text-muted-foreground leading-relaxed'>{summary}</p>
            </div>
          )}
          {quote && (
            <blockquote className='flex gap-1 items-center justify-center border-s-4 border border-pink-100 p-2.5 rounded-md italic text-muted-foreground'>
              <QuoteIcon className='size-4 rotate-180  fill-pink-100 text-pink-300' />
              {quote}
              <QuoteIcon className='size-4 fill-pink-100 text-pink-300' />
            </blockquote>
          )}
        </div>
        <Separator />
        <div>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 text-sm text-center'>
            {type && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Type</p>
                <p>
                  {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                </p>
              </div>
            )}
            {volume && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Volume</p>
                <p>{volume}</p>
              </div>
            )}
            {category && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Category</p>
                <p>{category}</p>
              </div>
            )}
            {isbn && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>ISBN</p>
                <p>{isbn}</p>
              </div>
            )}
            {language && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Language</p>
                <p>{language}</p>
              </div>
            )}
            {printing && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Printing</p>
                <p>{printing}</p>
              </div>
            )}
            {publisher && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Publisher</p>
                <p>{publisher}</p>
              </div>
            )}
            {publicationDate && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Publication Date</p>
                <p>{formatDate(publicationDate)}</p>
              </div>
            )}
            {completed && endDate && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>End Date</p>
                <p>{formatDate(endDate)}</p>
              </div>
            )}
            {acquiredDate && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Acquired Date</p>
                <p>{formatDate(acquiredDate)}</p>
              </div>
            )}
            {translator && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Translator</p>
                <p>{translator}</p>
              </div>
            )}
            {illustrator && (
              <div className='space-y-1'>
                <p className='text-muted-foreground'>Illustrator</p>
                <p>{illustrator}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicBookDetailPage;
