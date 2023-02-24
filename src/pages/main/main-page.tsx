import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ErrorToast } from '../../common/error-toast/error-toast';
import { Loader } from '../../common/loader/loader';
import { SelectBar } from '../../components/molecules/select-bar/select-bar';
import { BooksList } from '../../components/organisms/books-list/books-list';
import { AppDispatch, RootState } from '../../redux';
import { LOAD_BOOKS_LIST } from '../../redux/reducers/books-list/actions';

export const MainPage = () => {
  const [isListView, setIsListView] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();
  const booksList = useSelector((state: RootState) => state.books);
  const categories = useSelector((state: RootState) => state.categories);

  const selectViewHandler = (viewType: string) => {
    if (viewType === 'list') {
      setIsListView(true);
    } else {
      setIsListView(false);
    }
  };

  useEffect(() => {
    dispatch({ type: LOAD_BOOKS_LIST });
  }, [dispatch]);

  if (booksList.loading || categories.loading) {
    return <Loader />;
  }

  if (booksList.error || categories.error) {
    return <ErrorToast />;
  }

  return (
    <section>
      <SelectBar selectView={selectViewHandler} isListView={isListView} />
      <BooksList isListView={isListView} />
    </section>
  );
};
