import { BookType } from '@/types';

export const ADD_BOOK_DEFAULT_VALUES = {
  name: '',
  author: '',
  publisher: '',
  rating: 5,
  type: BookType.BOOK,
  pageCount: 1,
  completed: false,
  genre: [],
  image: '/placeholder.jpg',
  translator: '',
  illustrator: '',
  language: '',
  quote: '',
  summary: '',
  category: '',
  volume: 1,
  isbn: '',
  printing: 1,
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
