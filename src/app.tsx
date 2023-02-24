import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './common/layout/layout';
import { SidebarLayout } from './common/sidebar-layout/sidebar-layout';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { Contract } from './pages/terms/contract';
import { Terms } from './pages/terms/terms';
import { LOAD_CATEGORIES } from './redux/reducers/categories/actions';
import { AppDispatch } from './redux';

import './index.css';

export const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      dispatch({ type: LOAD_CATEGORIES });
      console.log('dispatch load categories');
    }

    return () => {
      ignore = true;
    };
  }, [dispatch]);

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route element={<SidebarLayout />}>
            <Route path='/' element={<Navigate to='books/all' />} />
            <Route path='/books' element={<Navigate to='all' />} />
            <Route path='books/:category' element={<MainPage />} />
            <Route path='terms' element={<Terms />} />
            <Route path='contract' element={<Contract />} />
          </Route>
          <Route path='books/:category/:bookid' element={<BookPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
