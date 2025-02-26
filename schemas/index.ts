import { z } from 'zod';

import { BookType } from '@/types';

export const BookSchema = z
  .object({
    name: z.string().min(1, { message: 'Book title is required' }),
    author: z.string().min(1, { message: 'Author name is required' }),
    translator: z.string().optional(),
    illustrator: z.string().optional(),
    language: z.string().optional(),
    pageCount: z.number().int().min(1, 'Page count is required'),
    volume: z.number().int().optional(),
    printing: z.number().int().min(1).optional(),
    rating: z.number().min(1).max(5).default(5),
    publisher: z.string().min(1, 'Publisher is required'),
    category: z.string().min(1, 'Category is required'),
    genre: z.array(z.string()),
    image: z.string().optional(),
    completed: z.boolean().default(false),
    private: z.boolean().default(false),
    favorite: z.boolean().default(false),
    readingNow: z.boolean().default(false),
    summary: z.string().optional(),
    quote: z.string().optional(),
    acquiredDate: z.string().datetime().optional(),
    publicationDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    startDate: z.string().datetime().optional(),
    isbn: z.string().optional(),
    type: z.nativeEnum(BookType, {
      required_error: 'Please select a book type',
    }),
  })
  .refine(
    (data) =>
      !data.startDate ||
      !data.endDate ||
      new Date(data.startDate) <= new Date(data.endDate),
    {
      message: 'Start date must be before end date',
      path: ['startDate'],
    }
  );

export const TBRSchema = z.object({
  name: z.string().min(1, { message: 'TBR name is required' }),
  completed: z.boolean().default(false),
  favorite: z.boolean().default(false),
});

export const CheckListItemSchema = z.object({
  id: z.string().optional(),
  checkListId: z.string(),
  name: z.string().min(1, { message: 'Item is required' }),
  completed: z.boolean().default(false),
});

export const CheckListSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: 'List name is required' }),
  items: z.array(CheckListItemSchema).optional(),
});

export const ListSchema = z.object({
  name: z.string().min(1, { message: 'List name is required' }),
  description: z.string().optional(),
  books: z.array(z.string()).optional(),
  private: z.boolean(),
});

export const BookEntrySchema = z.object({
  day: z.number().int(),
  month: z.number().int(),
  pagesRead: z.number().int(),
});
