import Image from 'next/image';

import { StarIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { BOOKS } from '@/mock';

type PropType = {
  params: Promise<{ id: number }>;
};

const BookDetailsPage = async ({ params }: PropType) => {
  const { id } = await params;

  const book = BOOKS[id - 1];

  if (!book) {
    return <p className='text-red-500 text-center'>Book not found.</p>;
  }

  const {
    type,
    name,
    isbn,
    pageCount,
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
    completed,
    publisher,
    startDate,
    translator,
    illustrator,
    acquiredDate,
    publicationDate,
  } = book;

  return (
    <Card className='rounded-md bg-sidebar min-h-[calc(100vh-2rem)]'>
      <CardHeader className='flex flex-col items-center'>
        {image && (
          <Image
            src={image}
            alt={name}
            width={200}
            height={300}
            className='rounded-md object-cover'
          />
        )}
        {name && (
          <CardTitle className='mt-5 text-xl font-bold'>{name}</CardTitle>
        )}
        {author && <p className='text-sm text-gray-500'>by {author}</p>}
      </CardHeader>
      <CardContent>
        <div className='flex flex-col items-center text-center text-pretty'>
          {genre && genre.length > 0 && (
            <div className='flex flex-wrap gap-2.5 mb-5'>
              {genre.map((g: string) => (
                <Badge key={g}>{g}</Badge>
              ))}
            </div>
          )}
          {rating && (
            <div className='flex items-center gap-1 mb-5'>
              <StarIcon className='size-5 fill-amber-500 text-amber-500' />
              <span className='text-lg font-semibold'>{rating}/5</span>
            </div>
          )}
          {summary && <p className='text-gray-700 text-sm'>{summary}</p>}
          {quote && (
            <p className='text-gray-700 text-sm mt-2.5 italic'>
              &quot;{quote}&quot;
            </p>
          )}
        </div>
        <Separator className='my-10' />
        <div className='grid grid-cols-2 xl:grid-cols-3 gap-5 text-sm text-gray-700'>
          {type && (
            <p>
              <strong>Type:</strong>{' '}
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </p>
          )}
          {volume && (
            <p className='line-clamp-1'>
              <strong>Volume:</strong> {volume}
            </p>
          )}
          {category && (
            <p className='line-clamp-1'>
              <strong>Category:</strong> {category}
            </p>
          )}
          {pageCount && (
            <p className='line-clamp-1'>
              <strong>Pages:</strong> {pageCount}
            </p>
          )}
          {isbn && (
            <p className='line-clamp-1'>
              <strong>ISBN:</strong> {isbn}
            </p>
          )}
          {language && (
            <p className='line-clamp-1'>
              <strong>Language:</strong> {language}
            </p>
          )}
          {printing && (
            <p className='line-clamp-1'>
              <strong>Printing:</strong> {printing}
            </p>
          )}
          {publisher && (
            <p className='line-clamp-1'>
              <strong>Publisher:</strong> {publisher}
            </p>
          )}
          {publicationDate && (
            <p className='line-clamp-1'>
              <strong>Publication Date:</strong>{' '}
              {publicationDate.toLocaleDateString()}
            </p>
          )}
          {startDate && (
            <p className='line-clamp-1'>
              <strong>Start Date:</strong> {startDate.toLocaleDateString()}
            </p>
          )}
          {endDate && (
            <p className='line-clamp-1'>
              <strong>End Date:</strong> {endDate.toLocaleDateString()}
            </p>
          )}
          {acquiredDate && (
            <p className='line-clamp-1'>
              <strong>Acquired Date:</strong>{' '}
              {acquiredDate.toLocaleDateString()}
            </p>
          )}
          <p className='line-clamp-1'>
            <strong>Completed:</strong> {completed ? 'Yes' : 'No'}
          </p>
          {translator && (
            <p className='line-clamp-1'>
              <strong>Translator:</strong> {translator}
            </p>
          )}
          {illustrator && (
            <p className='line-clamp-1'>
              <strong>Illustrator:</strong> {illustrator}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookDetailsPage;
