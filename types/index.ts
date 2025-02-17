import { z } from 'zod';

import { AddBookSchema } from '@/schemas';

// ! DELETE THIS TYPES AFTER SET BACKEND
export type User = {
  id: string;
  clerkId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  books: Book[];
  lists: List[];
  createdAt: Date;
  updatedAt: Date;
};

export type Book = {
  id: string;
  userId: string;
  listId?: string | null;
  name: string;
  author: string;
  publisher: string;
  rating: number;
  type: BookType | string;
  pageCount: number;
  completed: boolean;
  genre: string[];
  image?: string | null;
  translator?: string | null;
  illustrator?: string | null;
  language?: string | null;
  quote?: string | null;
  summary?: string | null;
  category?: string | null;
  volume?: number | null;
  isbn?: string | null;
  printing?: number | null;
  publicationDate?: Date;
  acquiredDate?: Date | null;
  startDate?: Date | null;
  endDate?: Date | null;
  user?: User | null;
  list?: List | null;
  createdAt: Date;
  updatedAt: Date;
};

export type List = {
  id: string;
  userId: string;
  name: string;
  description?: string | null;
  books: Book[] | string[];
  privacy: Privacy | string;
  user?: User | null;
  createdAt: Date;
  updatedAt: Date;
};

enum Privacy {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum BookType {
  BOOK = 'BOOK',
  EBOOK = 'EBOOK',
  AUDIO_BOOK = 'AUDIO_BOOK',
}
// ! DELETE THIS TYPES AFTER SET BACKEND

export type AddBook = z.infer<typeof AddBookSchema>;
