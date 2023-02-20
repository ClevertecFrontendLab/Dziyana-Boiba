import { Outlet } from 'react-router-dom';

import { Footer } from './footer';
import { Header } from './header';

import './layout.scss';

export const Layout = () => (
  <div className='layout'>
    <Header />
    <main className='content-container'>
      <Outlet />
    </main>
    <Footer />
  </div>
);
