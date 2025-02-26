import { BookType } from '@/types';

export const BOOK_DEFAULT_VALUES = {
  name: '',
  author: '',
  publisher: '',
  rating: 0,
  type: BookType.BOOK,
  pageCount: 0,
  completed: false,
  favorite: false,
  private: false,
  readingNow: false,
  genre: [],
  image: '/placeholder.jpg',
  translator: '',
  illustrator: '',
  language: '',
  quote: '',
  summary: '',
  category: '',
  volume: 0,
  isbn: '',
  printing: 0,
  publicationDate: undefined,
  acquiredDate: undefined,
  startDate: undefined,
  endDate: undefined,
};

export const BOOKS_PER_PAGE = 15;

export const SORT_OPTIONS = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name', label: 'Title A-Z' },
  { value: 'author', label: 'Author A-Z' },
];
