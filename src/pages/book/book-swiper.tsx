import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Controller, Thumbs, FreeMode, Pagination } from 'swiper';
import { ReactComponent as CatIcon } from '../../assets/images/Icon_Cat.svg';
import bookImage from '../../assets/images/book-image.png';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import './book-swiper.scss';

export const BookSwiper = ({ images }: any) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<null | any>(null);
  const windowMobile = window.innerWidth < 980 ? true : false;

  return (
    <div className='book-swiper-wrapper'>
      {images.length === 0 && (
        <>
          <div className='swiper-top' data-test-id='slide-big'>
            <CatIcon />
          </div>
          <div className='swiper-mobile-cat'>
            <CatIcon />
          </div>
        </>
      )}
      {images.length > 0 && (
        <div>
          <Swiper
            loop={true}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Thumbs, Controller]}
            className='swiper-top'
            data-test-id={windowMobile ? '' : 'slide-big'}
          >
            {images.map((img: any) => (
              <SwiperSlide>
                <img src={bookImage} alt='Page of the book' />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            pagination={true}
            modules={[Pagination]}
            data-test-id={windowMobile ? 'slide-big' : ''}
            className='swiper-mobile'
          >
            {images.map((img: any) => (
              <SwiperSlide>
                <img src={bookImage} alt='Page of the book' />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {images.length > 1 && (
        <div>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={30}
            slidesPerView={5}
            freeMode={true}
            watchSlidesProgress={true}
            scrollbar={{ hide: true, dragSize: 190 }}
            centerInsufficientSlides={true}
            modules={[Scrollbar, Controller, Thumbs]}
            className='swiper-bottom'
          >
            {images.length > 0 &&
              images.map((img: any) => (
                <SwiperSlide data-test-id='slide-mini'>
                  <img src={bookImage} alt='Page of the book' />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};
