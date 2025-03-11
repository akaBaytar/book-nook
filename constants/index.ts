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

export const FAQS = [
  {
    id: 0,
    question: "Is Book Nook really free? What's the catch?",
    answer:
      "Yes, Book Nook is completely free to use, and always will be. There's no catch! We believe tracking your reading journey should be accessible to everyone. The app is supported by our passionate book-loving community and maintained with minimal costs.",
  },
  {
    id: 1,
    question: 'How do I add books to my library?',
    answer:
      "Adding books is simple! After signing in, go to your dashboard and click the 'My Books' button. You can search for books by title, author, or ISBN. Once you find your book, click 'Add to Library' and it will appear in your collection. You can then mark it as 'Read', 'Currently Reading', or 'Want to Read'.",
  },
  {
    id: 2,
    question: 'Can I set reading goals?',
    answer:
      "Absolutely! Navigate to the 'Goals' section in your dashboard to set up daily, monthly, or yearly reading targets. You can set goals based on number of books, pages, or reading minutes. The dashboard will show your progress with visual charts and celebrate your achievements.",
  },
  {
    id: 3,
    question: 'How do I share my reading lists with friends?',
    answer:
      "When creating or editing a list, toggle the 'Public' option to make it shareable. Once public, you'll get a unique link that you can share with friends via email, social media, or messaging apps. They'll be able to view your list even if they don't have a Book Nook account.",
  },
  {
    id: 4,
    question: 'Is my reading data secure and private?',
    answer:
      'Your privacy is important to us. By default, your reading data is private and only visible to you. You can choose to make specific lists public, but your overall reading activity remains private unless you choose to share it. We use industry-standard encryption to protect your data.',
  },
  {
    id: 5,
    question: 'Can I access Book Nook on multiple devices?',
    answer:
      'Yes! Your Book Nook account syncs across all devices. Simply sign in with the same account on your phone, tablet, or computer to access your complete library, reading stats, and lists. Changes you make on one device will automatically appear on all others.',
  },
  {
    id: 6,
    question: 'How do I track my current reading progress?',
    answer:
      "When you start reading a book, mark it as 'Currently Reading' and enter the total number of pages. As you read, update your progress by entering your current page number. Book Nook will calculate your reading pace, estimate completion date, and track your reading sessions.",
  },
];
