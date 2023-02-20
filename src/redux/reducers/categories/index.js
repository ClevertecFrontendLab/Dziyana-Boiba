import { LOAD_CATEGORIES, LOAD_CATEGORIES_FAILED, LOAD_CATEGORIES_SUCCESS } from './actions';

const initialCategoriesState = {
  loading: false,
  error: null,
  data: null,
};

export const categoriesReducer = (state = initialCategoriesState, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOAD_CATEGORIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }
    case LOAD_CATEGORIES_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
