import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as CloseIcon } from '../../../assets/images/Icon_Close.svg';
import { ReactComponent as ListIcon } from '../../../assets/images/Icon_List.svg';
import { ReactComponent as RatingIcon } from '../../../assets/images/Icon_rating.svg';
import { ReactComponent as SearchIcon } from '../../../assets/images/Icon_Search.svg';
import { ReactComponent as TableIcon } from '../../../assets/images/Icon_table.svg';
import { RootState } from '../../../redux';
import { SET_FILTER, SET_SEARCH } from '../../../redux/reducers/app-state/actions';

import './select-bar.scss';

type Props = {
  selectView: (value: string) => void;
  isListView: boolean;
};

export const SelectBar = ({ selectView, isListView }: Props) => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const dispatch = useDispatch();

  const filter = useSelector((state: RootState) => state.appState.ratingDown);
  const openInputHandler = () => {
    setIsInputOpen(true);
  };
  const closeInputHandler = () => {
    setIsInputOpen(false);
  };

  const setFilterHandler = () => {
    dispatch({ type: SET_FILTER });
  };

  const setSearchHandler = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    dispatch({ type: SET_SEARCH, payload: target.value.trim() });
  };

  return (
    <div className='select-bar'>
      <div className='select-bar_left'>
        <div className={isInputOpen ? 'input-container open' : 'input-container'}>
          <SearchIcon className='search-icon' onClick={openInputHandler} data-test-id='button-search-open' />
          <input
            type='text'
            data-test-id='input-search'
            onChange={(e) => setSearchHandler(e)}
            placeholder='Поиск книги или автора…'
          />
          <CloseIcon className='close-icon' onClick={closeInputHandler} data-test-id='button-search-close' />
        </div>
        <button type='button' onClick={setFilterHandler} className='rating-btn' data-test-id='sort-rating-button'>
          <RatingIcon className={filter ? '' : 'rating-up'} />
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
