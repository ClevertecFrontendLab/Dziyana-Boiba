import { LOAD_BOOKS_LIST, LOAD_BOOKS_LIST_FAILED, LOAD_BOOKS_LIST_SUCCESS } from './actions';

const initialBooksListState = {
  loading: false,
  error: null,
  data: null,
};

export const booksListReducer = (state = initialBooksListState, action) => {
  switch (action.type) {
    case LOAD_BOOKS_LIST:
      return {
        ...state,
        loading: true,
      };

    case LOAD_BOOKS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case LOAD_BOOKS_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
