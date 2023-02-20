import { call, cancel, fork, put, take, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { LOAD_CATEGORIES, LOAD_CATEGORIES_FAILED, LOAD_CATEGORIES_SUCCESS } from '../../reducers/categories/actions';

export function* loadCategories(signal) {
  try {
    const { data } = yield call(axios.get, 'https://strapi.cleverland.by/api/categories', { signal });

    console.log('load categories succes');

    yield put({ type: LOAD_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: LOAD_CATEGORIES_FAILED, payload: error });
    console.log('load categories failed', error);
  }
}

export function* categoriesSaga() {
  let apiCall;
  let abortController = new AbortController();

  while (true) {
    yield take(LOAD_CATEGORIES);
    if (apiCall) {
      abortController.abort();
      yield cancel(apiCall);
      abortController = new AbortController();
    }
    apiCall = yield fork(loadCategories, abortController.signal);
  }
}
