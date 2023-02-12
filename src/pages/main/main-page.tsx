import { useState } from 'react';
import { SelectBar } from '../../components/molecules/select-bar/select-bar';
import { BooksList } from '../../components/organisms/books-list/books-list';

export const MainPage = () => {
  const [isListView, setIsListView] = useState(false);
  const selectViewHandler = (viewType: string) => {
    if (viewType === 'list') {
      setIsListView(true);
    } else {
      setIsListView(false);
    }
  };
  return (
    <section>
      <SelectBar selectView={selectViewHandler} isListView={isListView} />
      <BooksList isListView={isListView} />
    </section>
  );
};
