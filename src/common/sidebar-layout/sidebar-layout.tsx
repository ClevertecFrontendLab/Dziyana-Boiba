import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { Menu } from '../../components/organisms/menu';
import { RootState } from '../../redux';
import { SET_BURGER_OPEN } from '../../redux/reducers/app-state/actions';

import './sidebar-layout.scss';

export const SidebarLayout = () => {
  const dispatch = useDispatch();
  const isBurgerOpen = useSelector((state: RootState) => state.appState.isBurgerOpen);
  const closeMenuHandler = () => {
    dispatch({ type: SET_BURGER_OPEN });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      dispatch({ type: SET_BURGER_OPEN });
    }
  };

  return (
    <section className='sidebar-layout'>
      {isBurgerOpen && (
        <div
          className='backdrop'
          onClick={closeMenuHandler}
          onKeyDown={handleKeyDown}
          role='button'
          aria-label='close'
          tabIndex={0}
        />
      )}

      <Menu />
      <Outlet />
    </section>
  );
};
