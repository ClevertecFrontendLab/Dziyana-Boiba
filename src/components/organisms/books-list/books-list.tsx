import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { RootState } from '../../../redux';

import { BookCard } from './book-card';

import './books-list.scss';

type Props = {
  isListView: boolean;
};

type CategoryObj = {
  name: string;
  path: string;
  id: number;
};

type BookObj = {
  issueYear: string | null;
  rating: number | null;
  title: string;
  authors: string[] | null;
  image: {
    url: string;
  } | null;
  categories: string[] | null;
  id: number;
  booking: {
    id: number;
    order: boolean;
    dateOrder: string | null;
    customerId: number | null;
    customerFirstName: string | null;
    customerLastName: string | null;
  } | null;
  delivery: {
    id: number;
    handed: boolean;
    dateHandedFrom: string | null;
    dateHandedTo: string | null;
    recipientId: number | null;
    recipientFirstName: string | null;
    recipientLastName: string | null;
  } | null;
  histories: Array<{
    id: number | null;
    userId: number | null;
  }> | null;
};

export const BooksList = ({ isListView }: Props) => {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const search = useSelector((state: RootState) => state.appState.search);

  const booksList = useSelector((state: RootState) => state.books);
  const categories = useSelector((state: RootState) => state.categories);
  const filter = useSelector((state: RootState) => state.appState.ratingDown);

  const openBook = (id: number) => {
    navigate(`${id}`);
  };

  let currentCategory: CategoryObj;

  if (categories.data && category !== 'all') {
    currentCategory = categories.data.find((item: CategoryObj) => item.path === category);
  }

  let currentBooksList = booksList.data;

  if (booksList.data && category !== 'all') {
    currentBooksList = booksList.data.filter(
      (item: BookObj) => item.categories && item.categories.includes(currentCategory.name)
    );
  }

  if (search && booksList.data) {
    currentBooksList = currentBooksList.filter((item: BookObj) =>
      item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  if (booksList.data) {
    currentBooksList.sort((a: BookObj, b: BookObj) =>
      filter
        ? (b.rating ? b.rating : 0) - (a.rating ? a.rating : 0)
        : (a.rating ? a.rating : 0) - (b.rating ? b.rating : 0)
    );
  }

  if (currentBooksList && currentBooksList.length === 0) {
    return search ? (
      <div className='no-books' data-test-id='search-result-not-found'>
        По запросу ничего не найдено
      </div>
    ) : (
      <div className='no-books' data-test-id='empty-category'>
        В этой категории книг ещё нет
      </div>
    );
  }

  return (
    <div className={isListView ? 'books-list-container' : 'books-table-container'}>
      {currentBooksList &&
        currentBooksList.map((book: BookObj) => (
          <BookCard book={book} isListView={isListView} onClick={openBook} key={book.id} />
        ))}
    </div>
  );
};
