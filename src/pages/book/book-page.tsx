import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookSwiper } from './book-swiper';
import { RatingBar } from '../../components/molecules/rating/rating-bar';
import { Button } from '../../components/molecules/button/button';
import { ReactComponent as SlashIcon } from '../../assets/images/Icon_Slash.svg';
import { ReactComponent as StarIcon } from '../../assets/images/Icon_star.svg';
import { ReactComponent as StarEmptyIcon } from '../../assets/images/Icon_star-empty.svg';
import { ReactComponent as IconChevronDown } from '../../assets/images/Icon_Chevron_Down.svg';
import BooksData from '../../assets/books-data.json';
import { reviewsData } from '../../assets/review-data.js';
import { tableData } from '../../assets/table-data.js';
import avatar from '../../assets/images/avatar.png';
import './book-page.scss';

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

export const BookPage = () => {
  const [isReviewOpen, setIsReviewOpen] = useState(true);
  const openReviewsHandler = () => {
    setIsReviewOpen((prevState) => !prevState);
  };
  const booksObj: Record<string, BookObj[]> = BooksData;

  const { category, bookid } = useParams<{ category?: string; bookid?: string }>();

  const book = booksObj[category as keyof object].filter((book: any) => book.id === bookid)[0];

  console.log(category, bookid, book);
  const date = book.bookedTill.substring(5, 10).replace('-', '.');

  return (
    <section className='book-page'>
      <div className='book-page_link_wrapper'>
        <div className='book-page_link'>
          Бизнес книги <SlashIcon className='book-page_link_slash' /> Грокаем алгоритмы. Иллюстрированное пособие для
          программистов и любопытствующих
        </div>
      </div>
      <div className='book-page-center-wrapper'>
        <div className='book-description-container'>
          <div className='book-image'>
            <BookSwiper images={book.image} />
          </div>
          <div className='book-description'>
            <div className='book-title'>
              Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих
            </div>
            <div className='book-author'>Адитья Бхаргава, 2019</div>
            <Button disabled={book.isBooked}>{book.isBooked ? `занята до ${date}` : 'Забронировать'}</Button>
            <div className='about'>
              <p>О книге</p>
              <div>
                Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то
                решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута,
                изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое
                время? Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А
                грокать алгоритмы — это веселое и увлекательное занятие.
                <br />
                <br />
                Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать
                алгоритмы — это веселое и увлекательное занятие.
              </div>
            </div>
          </div>
        </div>
        <div className='about-mobile-version'>
          <p className='book-page_block-title'>О книге</p>
          <div>
            Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то
            решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута,
            изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое
            время? Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать
            алгоритмы — это веселое и увлекательное занятие.
            <br />
            <br />
            Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать
            алгоритмы — это веселое и увлекательное занятие.
          </div>
        </div>
        <div className='book-rating-container'>
          <p className='book-page_block-title'>Рейтинг</p>
          <div className='rating'>
            <RatingBar rating={book.rating} />
            <span>4.3</span>
          </div>
        </div>
        <div className='book-info'>
          <p className='book-page_block-title'>Подробная информация</p>
          <div className='table-container'>
            <table>
              {tableData[0].map((item: any) => (
                <tr key={item.id}>
                  <th>{item.propertyName}</th>
                  <td>{item.valueName}</td>
                </tr>
              ))}
            </table>
            <table>
              {tableData[1].map((item: any) => (
                <tr key={item.id}>
                  <th>{item.propertyName}</th>
                  <td>{item.valueName}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
        <div className='reviews-container'>
          <p className={isReviewOpen ? 'book-page_block-title' : 'book-page_block-title closed'}>
            Отзывы<span>2</span>
            <IconChevronDown
              className={isReviewOpen ? 'review-toggle-icon open' : 'review-toggle-icon'}
              onClick={openReviewsHandler}
              data-test-id='button-hide-reviews'
            />
          </p>
          <div className={isReviewOpen ? 'reviews-wrapper open' : 'reviews-wrapper'}>
            {reviewsData.map((review: any) => (
              <div key={review.id} className='review-block'>
                <div className='user-info'>
                  <img src={avatar} alt='User Avatar' />
                  <div className='user-name'>
                    <span>{review.name}</span>
                    <span>{review.date}</span>
                  </div>
                </div>
                <div className='review-rating'>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarEmptyIcon />
                </div>
                <div className='review-text'>{review.text}</div>
              </div>
            ))}
          </div>

          <Button data-test-id='button-rating'>оценить книгу</Button>
        </div>
      </div>
    </section>
  );
};
