import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MenuContextProvider } from './store/menu-context';
import { Layout } from './common/layout/layout';
import { SidebarLayout } from './common/sidebar-layout/sidebar-layout';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { Contract } from './pages/terms/contract';
import { Terms } from './pages/terms/terms';

import './index.css';

export const App = () => (
  <MenuContextProvider>
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
  </MenuContextProvider>
);
