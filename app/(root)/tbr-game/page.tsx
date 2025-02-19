import TBRGame from '@/components/shared/tbr-game';

import { getAllTBR } from '@/actions/tbr.actions';
import { getAllBooksForTBR } from '@/actions/book.actions';

const TBRGamePage = async () => {
  const { books } = await getAllBooksForTBR();
  const { TBRs } = await getAllTBR();

  return <TBRGame initialBooks={books} initialTBRs={TBRs} />;
};

export default TBRGamePage;
