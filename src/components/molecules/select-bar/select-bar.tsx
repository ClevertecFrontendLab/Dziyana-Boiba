import React, { useState } from 'react';
import { ReactComponent as SearchIcon } from '../../../assets/images/Icon_Search.svg';
import { ReactComponent as CloseIcon } from '../../../assets/images/Icon_Close.svg';
import { ReactComponent as RatingIcon } from '../../../assets/images/Icon_rating.svg';
import { ReactComponent as TableIcon } from '../../../assets/images/Icon_table.svg';
import { ReactComponent as ListIcon } from '../../../assets/images/Icon_List.svg';
import './select-bar.scss';

type Props = {
  selectView: any;
  isListView: boolean;
};

export const SelectBar = ({ selectView, isListView }: Props) => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const openInputHandler = () => {
    setIsInputOpen(true);
  };
  const closeInputHandler = () => {
    setIsInputOpen(false);
  };
  return (
    <div className='select-bar'>
      <div className='select-bar_left'>
        <div className={isInputOpen ? 'input-container open' : 'input-container'}>
          <SearchIcon className='search-icon' onClick={openInputHandler} data-test-id='button-search-open' />
          <input type='text' data-test-id='input-search' placeholder='Поиск книги или автора…' />
          <CloseIcon className='close-icon' onClick={closeInputHandler} data-test-id='button-search-close' />
        </div>
        <button type='button' className='rating-btn'>
          <RatingIcon />
          <span>По рейтингу</span>
        </button>
      </div>

      <div className='select-bar_right'>
        <button
          type='button'
          className={isListView ? '' : 'active'}
          onClick={() => selectView('table')}
          data-test-id='button-menu-view-window'
        >
          <TableIcon />
        </button>
        <button
          type='button'
          className={isListView ? 'active' : ''}
          onClick={() => selectView('list')}
          data-test-id='button-menu-view-list'
        >
          <ListIcon />
        </button>
      </div>
    </div>
  );
};
