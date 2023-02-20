import { combineReducers } from 'redux';

import { bookDetailsReducer } from './book-details';
import { booksListReducer } from './books-list';
import { categoriesReducer } from './categories';

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  books: booksListReducer,
  bookDetails: bookDetailsReducer,
});
