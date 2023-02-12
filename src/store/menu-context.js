import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export const MenuContext = createContext({
  isOpen: false,
  setOpen: () => {},
});

// const ChangeMenuContext = createContext(() => {});

/* export function useSidebar() {
  return useContext(MenuContext);
}

export function useSetSidebar() {
  return useContext(ChangeMenuContext);
}
 */

export const MenuContextProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarHandler = useCallback(() => {
    setIsSidebarOpen((prevState) => !prevState);
  }, []);

  return (
    <MenuContext.Provider
      value={useMemo(() => ({ isOpen: isSidebarOpen, setOpen: sidebarHandler }), [isSidebarOpen, sidebarHandler])}
    >
      {children}
    </MenuContext.Provider>
  );
};
