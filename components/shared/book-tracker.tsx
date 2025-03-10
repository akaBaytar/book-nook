import BookTrackerClient from './book-tracker-client';

import { getBookEntries } from '@/actions/book.actions';

const BookTracker = async () => {
  const { success, entries = [] } = await getBookEntries();

  const initialData = success ? entries : [];

  return <BookTrackerClient initialEntries={initialData} />;
};

export default BookTracker;
