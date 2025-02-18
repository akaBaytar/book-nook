import { z } from 'zod';

export const AddBookSchema = z.object({
  name: z.string().min(1, 'Book title is required'),
  author: z.string().min(1, "Author's name is required"),
  publisher: z.string().min(1, 'Publisher is required'),
  rating: z.number().min(1).max(5).default(5),
  type: z.enum(['BOOK', 'EBOOK', 'AUDIO_BOOK']).default('BOOK'),
  pageCount: z.number().int().min(1, 'Page count is required'),
  completed: z.boolean().default(false),
  genre: z.array(z.string()).min(1, 'At least one genre is required'),
  translator: z.string().optional(),
  illustrator: z.string().optional(),
  language: z.string().optional(),
  quote: z.string().optional(),
  summary: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  volume: z.number().int().optional(),
  isbn: z.string().optional(),
  printing: z.number().int().optional(),
  publicationDate: z.string().datetime().optional(),
  acquiredDate: z.string().datetime().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  image:
    process.env.NODE_ENV === 'production'
      ? z.string().url().optional()
      : z.string().optional(),
});
