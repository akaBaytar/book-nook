import { z } from 'zod';

import {
  ListSchema,
  BookSchema,
  BookEntrySchema,
  CheckListSchema,
  CheckListItemSchema,
} from '@/schemas';

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

export type GetAllBooks = {
  search?: string;
  filter?: 'all' | 'completed' | 'unread';
  sortBy?: 'recent' | 'oldest' | 'name' | 'author';
  category?: string;
  genre?: string;
  page?: number;
  limit?: number;
};

export type BookData = z.infer<typeof BookSchema>;

export type BookEntryData = z.infer<typeof BookEntrySchema>;

export type Filter = 'all' | 'completed' | 'unread';

export type Sort = 'recent' | 'oldest' | 'name' | 'author';

export type CheckList = z.infer<typeof CheckListSchema>;

export type CheckListItem = z.infer<typeof CheckListItemSchema>;

export type List = z.infer<typeof ListSchema> & { id: string };


export type ShareContent = {
  id: string;
  name: string;
  author?: string;
  description?: string;
};

export enum BookType {
  BOOK = 'BOOK',
  EBOOK = 'EBOOK',
  AUDIO_BOOK = 'AUDIO_BOOK',
}
