import { useSelector } from 'react-redux';
import { call, cancel, fork, put, take, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_BOOK_DETAILS,
  LOAD_BOOK_DETAILS_FAILED,
  LOAD_BOOK_DETAILS_SUCCESS,
} from '../../reducers/book-details/actions';

function* loadBookDetails({ bookId }) {
  try {
    const { data } = yield call(axios.get, `https://strapi.cleverland.by/api/books/${bookId}`);

    console.log('load book detailes success');
    yield put({ type: LOAD_BOOK_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log('load book details failed', error);
    yield put({ type: LOAD_BOOK_DETAILS_FAILED, payload: error });
  }
}

export function* bookDetailsSaga() {
  yield takeEvery(LOAD_BOOK_DETAILS, loadBookDetails);
}
