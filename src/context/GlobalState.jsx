import { createContext, useState } from "react";
import Cookies from 'js-cookie'

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    activeNavbarItem: "HOME",
    activeCategory: "All Foods",
  });

  const setActiveCategory = (category) => {
    setGlobalState({ ...globalState, activeCategory: category });
  };

  const setActiveNavbarItem = (item) => {
    setGlobalState({ ...globalState, activeNavbarItem: item });
  };

  const clearUserCookie = () => {
    Cookies.remove("isAuthenticated");
    Cookies.remove("userId");
    Cookies.remove("token");
    Cookies.remove("menuItems");
    Cookies.remove("authorityId");
    Cookies.remove("username");
    Cookies.remove("dashboardRefreshInterval");
  };

  return (
    <GlobalStateContext.Provider
      value={{ globalState, setActiveCategory, setActiveNavbarItem, clearUserCookie }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
