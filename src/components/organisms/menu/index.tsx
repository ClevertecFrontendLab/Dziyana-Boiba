import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { ReactComponent as IconChevronDown } from '../../../assets/images/Icon_Chevron_Down.svg';
import { RootState } from '../../../redux';
import { SET_BURGER_OPEN } from '../../../redux/reducers/app-state/actions';

import './menu.scss';

type CategoryObj = {
  name: string;
  path: string;
  id: number;
};

type BookObj = {
  issueYear: string | null;
  rating: number | null;
  title: string;
  authors: string[] | null;
  image: {
    url: string;
  } | null;
  categories: string[] | null;
  id: number;
  booking: {
    id: number;
    order: boolean;
    dateOrder: string | null;
    customerId: number | null;
    customerFirstName: string | null;
    customerLastName: string | null;
  } | null;
  delivery: {
    id: number;
    handed: boolean;
    dateHandedFrom: string | null;
    dateHandedTo: string | null;
    recipientId: number | null;
    recipientFirstName: string | null;
    recipientLastName: string | null;
  } | null;
  histories: Array<{
    id: number | null;
    userId: number | null;
  }> | null;
};

export const Menu = () => {
  const dispatch = useDispatch();
  const isBurgerOpen = useSelector((state: RootState) => state.appState.isBurgerOpen);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const categoriesData = useSelector((state: RootState) => state.categories);
  const booksListData = useSelector((state: RootState) => state.books);

  useEffect(() => {
    if (isBurgerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isBurgerOpen]);

  const openMenuHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const closeMenuHandler = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  const closeSidebarHandler = () => {
    if (isBurgerOpen) {
      dispatch({ type: SET_BURGER_OPEN });
    }
  };
  const windowMobile = window.innerWidth < 960 ? true : false;

  const amountOfBooks = (category: string) => {
    let booksList;

    if (booksListData.data) {
      booksList = booksListData.data.filter((item: BookObj) => item.categories && item.categories.includes(category));
    }

    return booksList?.length;
  };

  return (
    <div data-test-id='burger-navigation' className={isBurgerOpen ? 'menu-container open' : 'menu-container'}>
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
              {!categoriesData.error && !booksListData.error && (
                <IconChevronDown className={isMenuOpen ? 'main-menu_link_svg open' : 'main-menu_link_svg'} />
              )}
            </NavLink>
            {!categoriesData.error && !booksListData.error && (
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
                {categoriesData.data &&
                  categoriesData.data.map((category: CategoryObj) => (
                    <li key={`category${category.id}`}>
                      <NavLink
                        to={`/books/${category.path}`}
                        onClick={closeSidebarHandler}
                        className={({ isActive }) => (isActive ? 'active' : '')}
                        data-test-id={windowMobile ? `burger-${category.path}` : `navigation-${category.path}`}
                      >
                        {category.name}
                      </NavLink>
                      <span
                        data-test-id={
                          windowMobile
                            ? `burger-book-count-for-${category.path}`
                            : `navigation-book-count-for-${category.path}`
                        }
                      >
                        {amountOfBooks(category.name)}
                      </span>
                    </li>
                  ))}
              </ul>
            )}
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
