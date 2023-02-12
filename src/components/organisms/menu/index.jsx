import { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuContext } from '../../../store/menu-context.js';
import { ReactComponent as IconChevronDown } from '../../../assets/images/Icon_Chevron_Down.svg';
import { categoriesData } from './categories-data.js';
import './menu.scss';

export const Menu = () => {
  const sidebar = useContext(MenuContext);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const url = useLocation().pathname;

  useEffect(() => {
    if (sidebar.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [sidebar.isOpen]);

  const openMenuHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const closeMenuHandler = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  const closeSidebarHandler = () => {
    if (sidebar.isOpen) {
      sidebar.setOpen();
    }
  };
  const windowMobile = window.innerWidth < 960 ? true : false;

  return (
    <div data-test-id='burger-navigation' className={sidebar.isOpen ? 'menu-container open' : 'menu-container'}>
      <nav>
        <ul className='main-menu'>
          <li>
            <NavLink
              to='/books'
              data-test-id={windowMobile ? 'burger-showcase' : 'navigation-showcase'}
              onClick={openMenuHandler}
              className={({ isActive }) => (isActive ? 'main-menu_link active' : 'main-menu_link')}
            >
              Витрина книг
              <IconChevronDown className={isMenuOpen ? 'main-menu_link_svg open' : 'main-menu_link_svg'} />
            </NavLink>

            <ul className={isMenuOpen ? 'categories open' : 'categories'}>
              <li>
                <NavLink
                  to='books/all'
                  data-test-id={windowMobile ? 'burger-books' : 'navigation-books'}
                  onClick={closeSidebarHandler}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Все книги
                </NavLink>
              </li>
              {categoriesData.map((category) => (
                <li key={category.id}>
                  <NavLink
                    to={`/books/${category.category}`}
                    onClick={closeSidebarHandler}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    {category.name} <span>{category.amount}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <NavLink
              to='/terms'
              onClick={() => {
                closeMenuHandler();
                closeSidebarHandler();
              }}
              data-test-id={windowMobile ? 'burger-terms' : 'navigation-terms'}
              className={({ isActive }) => (isActive ? 'main-menu_link active' : 'main-menu_link')}
            >
              Правила пользования
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/contract'
              onClick={() => {
                closeMenuHandler();
                closeSidebarHandler();
              }}
              data-test-id={windowMobile ? 'burger-contract' : 'navigation-contract'}
              className={({ isActive }) => (isActive ? 'main-menu_link active' : 'main-menu_link')}
            >
              Договор оферты
            </NavLink>
          </li>
        </ul>
        <ul className='second-menu'>
          <li>
            <NavLink
              to='/'
              onClick={() => {
                closeMenuHandler();
                closeSidebarHandler();
              }}
              className={({ isActive }) => (isActive ? 'main-menu_link active' : 'main-menu_link')}
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/'
              onClick={() => {
                closeMenuHandler();
                closeSidebarHandler();
              }}
              className={({ isActive }) => (isActive ? 'main-menu_link active' : 'main-menu_link')}
            >
              Выход
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
