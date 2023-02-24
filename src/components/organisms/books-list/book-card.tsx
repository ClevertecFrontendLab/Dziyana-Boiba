import { useSelector } from 'react-redux';

import { ReactComponent as CatIcon } from '../../../assets/images/Icon_Cat.svg';
import { RootState } from '../../../redux';
import { Button } from '../../molecules/button/button';
import { RatingBar } from '../../molecules/rating/rating-bar';

import './book-card.scss';

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

type Props = {
  book: BookObj;
  isListView: boolean;
  onClick: (id: number) => void;
};

export const BookCard = ({ book, isListView, onClick }: Props) => {
  const search = useSelector((state: RootState) => state.appState.search);
  const date = book.delivery?.dateHandedTo?.substring(5, 10).replace('-', '.');

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter') {
      onClick(id);
    }
  };

  const replace = (title: string) => {
    const splitedTitle = title.split(new RegExp(`(${search})`, 'gi'));

    return (
      <p>
        {splitedTitle.map((item) =>
          item.toLowerCase() === search.toLowerCase() ? <span data-test-id='highlight-matches'>{item}</span> : item
        )}
      </p>
    );
  };

  return (
    <section
      className={isListView ? 'card-container-list' : 'card-container-table'}
      onClick={() => onClick(book.id)}
      onKeyDown={(e) => handleKeyDown(e, book.id)}
      role='button'
      tabIndex={0}
      data-test-id='card'
    >
      <div className='card-container_book-image'>
        {book.image ? (
          <img loading='lazy' src={`https://strapi.cleverland.by${book.image.url}`} alt='Title page of the book' />
        ) : (
          <CatIcon />
        )}
      </div>
      <div className='card-container_content'>
        {!isListView && <RatingBar rating={book.rating} />}
        <div className='title-overflow-container'>
          <p>{search ? replace(book.title) : book.title}</p>
        </div>
        <div className='author-overflow-container'>
          <p>
            {book.authors && book.authors.map((author) => `${author}, `)}
            {book.issueYear}
          </p>
        </div>
        <div className='card-footer'>
          {isListView && <RatingBar rating={book.rating} />}

          <Button
            className={!book.delivery && book.booking ? 'booked' : ''}
            disabled={book.delivery || book.booking ? true : false}
          >
            {book.delivery && book.booking && `занята до ${date}`}
            {!book.delivery && book.booking && 'Забронирована'}
            {!book.delivery && !book.booking && 'Забронировать'}
          </Button>
        </div>
      </div>
    </section>
  );
};
