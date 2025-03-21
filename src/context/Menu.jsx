import { createContext, useState } from "react";
import Cookies from "js-cookie";

export const MenuContext = createContext()

export const MenuContextProvider = ({children}) => {
    const [menuItemsState, setMenuItemsState] = useState(Cookies.get("menuItems") != null ? JSON.parse(Cookies.get("menuItems")) : []);

    const clearMenuItemsState = () => {
        setMenuItemsState([]);
    }

    const updateMenuItemsState = (val) => {
        setMenuItemsState(val)
    }

    return <MenuContext.Provider value={{menuItemsState, clearMenuItemsState, updateMenuItemsState}}>
        {children}
    </MenuContext.Provider>
}