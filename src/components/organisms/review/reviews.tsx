import CatIcon from '../../../assets/images/Icon_Cat.svg';
import { RatingBar } from '../../molecules/rating/rating-bar';

type ReviewObj = {
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
};

type Props = {
  comments: ReviewObj[] | null;
  isReviewOpen: boolean;
};

export const Reviews = ({ comments, isReviewOpen }: Props) => {
  const reviewDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const convertedDate = new Date(date).toLocaleDateString('ru-RU', options);

    return convertedDate.replace('.', '');
  };

  return (
    <div className={isReviewOpen ? 'reviews-wrapper open' : 'reviews-wrapper'}>
      {comments &&
        comments.map((review: ReviewObj) => (
          <div key={review.id} className='review-block'>
            <div className='user-info'>
              <img
                src={review.user.avatarUrl ? `https://strapi.cleverland.by${review.user.avatarUrl}` : CatIcon}
                alt='User Avatar'
              />
              <div className='user-name'>
                <span>
                  {review.user.firstName} {review.user.lastName}
                </span>
                <span>{reviewDate(review.createdAt)}</span>
              </div>
            </div>
            <div className='review-rating'>
              <RatingBar rating={review.rating} />
            </div>
            <div className='review-text'>{review.text}</div>
          </div>
        ))}
    </div>
  );
};
