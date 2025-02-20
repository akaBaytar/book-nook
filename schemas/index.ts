import { z } from 'zod';

import { BookType } from '@/types';

export const BookSchema = z.object({
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
  genre: z.array(z.string()).min(1, 'At least one genre is required'),
  image: z.string().optional(),
  completed: z.boolean().default(false),
  favorite: z.boolean().default(false),
  readingNow: z.boolean().default(false),
  isbn: z.string().optional(),
  summary: z.string().optional(),
  quote: z.string().optional(),
  acquiredDate: z.string().datetime().optional(),
  publicationDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  startDate: z.string().datetime().optional(),
  type: z.nativeEnum(BookType, {
    required_error: 'Please select a book type',
  }),
});

export const TBRSchema = z.object({
  name: z.string().min(1, { message: 'TBR name is required' }),
  completed: z.boolean().default(false),
  favorite: z.boolean().default(false),
});

export const CheckListItemSchema = z.object({
  checkListId: z.string(),
  name: z.string().min(1, { message: 'Item is required' }),
  completed: z.boolean().default(false),
});

export const CheckListSchema = z.object({
  name: z.string().min(1, { message: 'List name is required' }),
  items: z.array(CheckListItemSchema).optional(),
});
