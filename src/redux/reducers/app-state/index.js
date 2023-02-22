import { SET_FILTER } from './actions';

const initialAppState = {
  ratingDown: true,
};

export const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, ratingDown: !state.ratingDown };
    default:
      return state;
  }
};
