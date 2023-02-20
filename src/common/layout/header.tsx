import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MenuContext } from '../../store/menu-context';
import { ReactComponent as MenuIcon } from '../../assets/images/Icon_Menu.svg';

import LogoPNG from '../../assets/images/logo.png';
import Avatar from '../../assets/images/avatar.png';

import './layout.scss';

export const Header = () => {
  const sidebar = useContext(MenuContext);

  const sidebarHandler = () => {
    sidebar.setOpen();
  };
  return (
    <header>
      <Link to='/books/all'>
        <img className='header_logo' src={LogoPNG} alt='Cleverland Logo' />
      </Link>
      <MenuIcon className='menu-icon' onClick={sidebarHandler} />
      <button
        type='button'
        data-test-id='button-burger'
        onClick={sidebarHandler}
        className={sidebar.isOpen ? 'menu-btn open' : 'menu-btn'}
      >
        <span className='first-line' />
        <span className='second-line' />
        <span className='last-line' />
      </button>

      <div className='header_aside'>
        <h3>Библиотека</h3>
        <div className='header_user'>
          <span>Привет, Иван!</span>
          <img className='header_user-avatar' src={Avatar} alt='User Avatar' />
        </div>
      </div>
    </header>
  );
};
