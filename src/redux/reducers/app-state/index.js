import { SET_BURGER_OPEN, SET_FILTER, SET_SEARCH } from './actions';

const initialAppState = {
  isBurgerOpen: false,
  ratingDown: true,
  search: null,
};

export const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case SET_BURGER_OPEN:
      return { ...state, isBurgerOpen: !state.isBurgerOpen };
    case SET_FILTER:
      return { ...state, ratingDown: !state.ratingDown };
    case SET_SEARCH:
      return { ...state, search: action.payload };
    default:
      return state;
  }
};
