import { combineReducers } from 'redux';

import { appReducer } from './app-state';
import { bookDetailsReducer } from './book-details';
import { booksListReducer } from './books-list';
import { categoriesReducer } from './categories';

export const rootReducer = combineReducers({
  appState: appReducer,
  categories: categoriesReducer,
  books: booksListReducer,
  bookDetails: bookDetailsReducer,
});
