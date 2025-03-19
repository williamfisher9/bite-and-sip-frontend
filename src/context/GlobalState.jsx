import { createContext, useState } from "react";

export const GlobalStateContext = createContext()

export const GlobalStateProvider = ({children}) => {
    const [globalState, setGlobalState] = useState({activeNavbarItem: "HOME", activeCategory: "All Foods"})

    const setActiveCategory = (category) => {
        setGlobalState({...globalState, activeCategory: category})
    }

    const setActiveNavbarItem = (item) => {
        setGlobalState({...globalState, activeNavbarItem: item})
    }

    return <GlobalStateContext.Provider value={{globalState, setActiveCategory, setActiveNavbarItem}}>
        {children}
    </GlobalStateContext.Provider>
}