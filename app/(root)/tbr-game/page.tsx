import TBRGame from '@/components/shared/tbr-game';

import { getAllBooksForTBR } from '@/actions/book.actions';

const TBRGamePage = async () => {
  const { books } = await getAllBooksForTBR();

  return <TBRGame initialBooks={books || []} />;
};

export default TBRGamePage;
