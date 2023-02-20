import { ReactComponent as CatIcon } from '../../../assets/images/Icon_Cat.svg';
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
  const date = book.delivery?.dateHandedTo?.substring(5, 10).replace('-', '.');

  const handleKeyDown = (e: any, id: number) => {
    if (e.keyCode === 13) {
      onClick(id);
    }
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
        <div className='description-overflow-container'>
          <p>{book.title}</p>
        </div>
        <div className='author'>
          {book.authors && book.authors.map((author) => `${author}, `)}
          {book.issueYear}
        </div>
        <div className='card-footer'>
          {isListView && <RatingBar rating={book.rating} />}

          <Button
            className={!book.delivery && book.booking ? 'booked' : ''}
            disabled={book.delivery === null ? false : true}
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
