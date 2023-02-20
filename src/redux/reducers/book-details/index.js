import { LOAD_BOOK_DETAILS, LOAD_BOOK_DETAILS_FAILED, LOAD_BOOK_DETAILS_SUCCESS } from './actions';

const initialBookDetailsState = {
  loading: false,
  error: null,
  data: null,
  id: null,
};

export const bookDetailsReducer = (state = initialBookDetailsState, action) => {
  switch (action.type) {
    case LOAD_BOOK_DETAILS:
      return {
        ...state,
        loading: true,
        id: action.payload,
      };

    case LOAD_BOOK_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case LOAD_BOOK_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
