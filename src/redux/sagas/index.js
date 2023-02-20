import { all, spawn } from 'redux-saga/effects';

import { bookDetailsSaga } from './book-details';
import { booksListSaga } from './books-list';
import { categoriesSaga } from './categories';

export function* rootSaga() {
  const sagas = [categoriesSaga, booksListSaga, bookDetailsSaga];

  yield all(sagas.map((saga) => spawn(saga)));
}
