import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { ReactComponent as IconChevronDown } from '../../assets/images/Icon_Chevron_Down.svg';
import { ReactComponent as SlashIcon } from '../../assets/images/Icon_Slash.svg';
import { ErrorToast } from '../../common/error-toast/error-toast';
import { Loader } from '../../common/loader/loader';
import { Button } from '../../components/molecules/button/button';
import { RatingBar } from '../../components/molecules/rating/rating-bar';
import { BookSwiper } from '../../components/organisms/book-swiper/book-swiper';
import { Reviews } from '../../components/organisms/review/reviews';
import { AppDispatch, RootState } from '../../redux';
import { LOAD_BOOK_DETAILS } from '../../redux/reducers/book-details/actions';

import './book-page.scss';

type CategoryObj = {
  name: string;
  path: string;
  id: number;
};

type BookObj = {
  id: number;
  issueYear: string | null;
  rating: number | null;
  title: string;
  description: string | null;
  publish: string | null;
  pages: string | null;
  cover: string | null;
  weight: string | null;
  format: string | null;
  ISBN: string | null;
  producer: string | null;
  authors: string[] | null;
  images: Array<{
    url: string;
  }> | null;
  categories: string[] | null;
  comments: Array<{
    id: number;
    rating: number;
    text: string | null;
    createdAt: string;
    user: {
      commentUserId: number;
      firstName: string;
      lastName: string;
      avatarUrl: string | null;
    };
  }> | null;
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

export const BookPage = () => {
  const [isReviewOpen, setIsReviewOpen] = useState(true);
  const { category, bookid } = useParams<{ category?: string; bookid?: string }>();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOAD_BOOK_DETAILS, bookId: bookid });
  }, [dispatch, bookid]);

  const categories = useSelector((state: RootState) => state.categories);
  const bookDetails = useSelector((state: RootState) => state.bookDetails);
  const bookData: BookObj = bookDetails?.data;

  const date = bookData?.delivery?.dateHandedTo?.substring(5, 10).replace('-', '.');

  let currentCategory = null;

  if (categories.data && category !== 'all') {
    currentCategory = categories.data.find((item: CategoryObj) => item.path === category).name;
  }

  const openReviewsHandler = () => {
    setIsReviewOpen((prevState) => !prevState);
  };

  if (bookDetails.loading) {
    return <Loader />;
  }

  return (
    <section className='book-page'>
      <div className='book-page_link_wrapper'>
        <div className='book-page_link'>
          <NavLink to={`/books/${category}`} data-test-id='breadcrumbs-link'>
            {currentCategory ? currentCategory : 'Все книги'}
          </NavLink>{' '}
          <SlashIcon className='book-page_link_slash' /> <span data-test-id='book-name'>{bookData?.title}</span>
        </div>
      </div>
      {bookDetails.error ? (
        <ErrorToast />
      ) : (
        <div className='book-page-center-wrapper'>
          <div className='book-description-container'>
            <div className='book-image'>
              <BookSwiper images={bookData?.images} />
            </div>
            <div className='book-description'>
              <div className='book-title' data-test-id='book-title'>
                {bookData?.title}
              </div>
              <div className='book-author'>
                {bookData?.authors && bookData?.authors.map((author: string) => `${author}, `)}
                {bookData?.issueYear}
              </div>
              <Button
                className={!bookData?.delivery && bookData?.booking ? 'booked' : ''}
                disabled={bookData?.delivery === null ? false : true}
              >
                {bookData?.delivery && bookData?.booking && `занята до ${date}`}
                {!bookData?.delivery && bookData?.booking && 'Забронирована'}
                {!bookData?.delivery && !bookData?.booking && 'Забронировать'}
              </Button>
              <div className='about'>
                <p>О книге</p>
                <div>{bookData?.description}</div>
              </div>
            </div>
          </div>
          <div className='about-mobile-version'>
            <p className='book-page_block-title'>О книге</p>
            <div>{bookData?.description}</div>
          </div>
          <div className='book-rating-container'>
            <p className='book-page_block-title'>Рейтинг</p>
            <div className='rating'>
              <RatingBar rating={bookData?.rating} />
              <span>{bookData?.rating}</span>
            </div>
          </div>
          <div className='book-info'>
            <p className='book-page_block-title'>Подробная информация</p>
            <div className='table-container'>
              <table>
                <tr>
                  <th>Издательство</th>
                  <td>{bookData?.publish}</td>
                </tr>
                <tr>
                  <th>Год издания</th>
                  <td>{bookData?.issueYear}</td>
                </tr>
                <tr>
                  <th>Страниц</th>
                  <td>{bookData?.pages}</td>
                </tr>
                <tr>
                  <th>Переплёт</th>
                  <td>{bookData?.cover}</td>
                </tr>
                <tr>
                  <th>Формат</th>
                  <td>{bookData?.format}</td>
                </tr>
              </table>
              <table>
                <tr>
                  <th>Жанр</th>
                  <td>{bookData?.categories?.map((item: string) => `${item} `)}</td>
                </tr>
                <tr>
                  <th>Вес</th>
                  <td>{bookData?.weight}</td>
                </tr>
                <tr>
                  <th>ISBN</th>
                  <td>{bookData?.ISBN}</td>
                </tr>
                <tr>
                  <th>Изготовитель</th>
                  <td>{bookData?.producer}</td>
                </tr>
              </table>
            </div>
          </div>
          <div className='reviews-container'>
            <p className={isReviewOpen ? 'book-page_block-title' : 'book-page_block-title closed'}>
              Отзывы<span>{bookData?.comments ? bookData?.comments.length : 0}</span>
              {bookData?.comments && (
                <IconChevronDown
                  className={isReviewOpen ? 'review-toggle-icon open' : 'review-toggle-icon'}
                  onClick={openReviewsHandler}
                  data-test-id='button-hide-reviews'
                />
              )}
            </p>
            <Reviews comments={bookData?.comments} isReviewOpen={isReviewOpen} />

            <Button data-test-id='button-rating'>оценить книгу</Button>
          </div>
        </div>
      )}
    </section>
  );
};
