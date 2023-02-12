import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from '../../components/organisms/menu';
import { MenuContext } from '../../store/menu-context';
import './sidebar-layout.scss';

export const SidebarLayout = () => {
  const sidebar = useContext(MenuContext);
  const closeMenuHandler = () => {
    sidebar.setOpen();
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      sidebar.setOpen();
    }
  };
  return (
    <section className='sidebar-layout'>
      {sidebar.isOpen && (
        <div
          className='backdrop'
          onClick={closeMenuHandler}
          onKeyDown={(e) => handleKeyDown(e)}
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
