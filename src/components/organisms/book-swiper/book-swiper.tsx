import React, { useState } from 'react';
import { Controller, FreeMode, Pagination, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ReactComponent as CatIcon } from '../../../assets/images/Icon_Cat.svg';

import './book-swiper.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

type ImgObj = {
  url: string;
};

type Props = {
  images: ImgObj[] | null;
};

export const BookSwiper = ({ images }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<null | any>(null);
  const windowMobile = window.innerWidth < 980 ? true : false;

  return (
    <div className='book-swiper-wrapper'>
      {!images && (
        <React.Fragment>
          <div className='swiper-top' data-test-id='slide-big'>
            <CatIcon />
          </div>
          <div className='swiper-mobile-cat'>
            <CatIcon />
          </div>
        </React.Fragment>
      )}
      {images && (
        <div>
          <Swiper
            loop={true}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Thumbs, Controller]}
            className='swiper-top'
            data-test-id={windowMobile ? '' : 'slide-big'}
          >
            {images.map((img: ImgObj) => (
              <SwiperSlide>
                <img src={`https://strapi.cleverland.by${img.url}`} alt='The page of the book' />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            pagination={true}
            modules={[Pagination]}
            data-test-id={windowMobile ? 'slide-big' : ''}
            className='swiper-mobile'
          >
            {images.map((img: ImgObj) => (
              <SwiperSlide>
                <img src={`https://strapi.cleverland.by${img.url}`} alt='The page of the book' />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {images && images.length > 1 && (
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
              images.map((img: ImgObj) => (
                <SwiperSlide data-test-id='slide-mini'>
                  <img src={`https://strapi.cleverland.by${img.url}`} alt='The page of the book' />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};
