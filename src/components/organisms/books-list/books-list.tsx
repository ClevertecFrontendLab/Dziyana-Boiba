import { useNavigate, useParams } from 'react-router-dom';
import { BookCard } from './book-card';
import BooksData from '../../../assets/books-data.json';
import './books-list.scss';

type Props = {
  isListView: boolean;
};

type BookObj = {
  id: string;
  image: string[];
  category: string;
  author: string;
  title: string;
  rating: number;
  year: number;
  isBooked: boolean;
  bookedTill: string;
};

export const BooksList = ({ isListView }: Props) => {
  const booksObj: Record<string, BookObj[]> = BooksData;
  const { category } = useParams<{ category?: string }>();
  const books = booksObj[category as keyof object];
  const navigate = useNavigate();
  const openBook = (id: string) => {
    navigate(`${id}`);
  };

  return (
    <div className={isListView ? 'books-list-container' : 'books-table-container'}>
      {books.map((book: any) => (
        <BookCard book={book} isListView={isListView} onClick={openBook} key={book.id} />
      ))}
    </div>
  );
};
