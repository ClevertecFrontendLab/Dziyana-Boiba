import { apply, call, put, takeEvery, takeLatest, take, cancel, fork } from 'redux-saga/effects';
import axios from 'axios';

import { LOAD_BOOKS_LIST, LOAD_BOOKS_LIST_FAILED, LOAD_BOOKS_LIST_SUCCESS } from '../../reducers/books-list/actions';

function* loadBooksList(signal) {
  try {
    const { data } = yield call(axios.get, 'https://strapi.cleverland.by/api/books', { signal });

    console.log('load book-list succes');
    yield put({ type: LOAD_BOOKS_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log('load book-list failed', error);
    yield put({ type: LOAD_BOOKS_LIST_FAILED, payload: error });
  }
}

export function* booksListSaga() {
  // yield takeLatest(LOAD_BOOKS_LIST, loadBooksList);

  let apiCall;
  let abortController = new AbortController();

  while (true) {
    yield take(LOAD_BOOKS_LIST);
    if (apiCall) {
      abortController.abort();
      yield cancel(apiCall);
      abortController = new AbortController();
    }
    apiCall = yield fork(loadBooksList, abortController.signal);
  }
}
