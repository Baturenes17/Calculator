import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [currentNumber,setCurrentNumber] = useState("0");

    return(
        <AppContext.Provider value={{currentNumber,setCurrentNumber}} >
            {children}
        </AppContext.Provider>
    )
}