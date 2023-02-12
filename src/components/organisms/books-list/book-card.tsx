import { RatingBar } from '../../molecules/rating/rating-bar';
import { Button } from '../../molecules/button/button';
import { ReactComponent as CatIcon } from '../../../assets/images/Icon_Cat.svg';
import bookImage from '../../../assets/images/book-image.png';
import './book-card.scss';

type Props = {
  book: any;
  isListView: boolean;
  onClick: any;
};

export const BookCard = ({ book, isListView, onClick }: Props) => {
  const date = book.bookedTill.substring(5, 10).replace('-', '.');

  const handleKeyDown = (e: any, id: string) => {
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
        {book.image.length > 0 ? <img src={bookImage} alt='Title page of the book' /> : <CatIcon />}
      </div>
      <div className='card-container_content'>
        {!isListView && <RatingBar rating={book.rating} />}
        <div className='description-overflow-container'>
          <p>{book.title}</p>
        </div>
        <div className='author'>
          {book.author}, {book.year}
        </div>
        <div className='card-footer'>
          {isListView && <RatingBar rating={book.rating} />}

          <Button disabled={book.isBooked}>{book.isBooked ? `занята до ${date}` : 'Забронировать'}</Button>
        </div>
      </div>
    </section>
  );
};
