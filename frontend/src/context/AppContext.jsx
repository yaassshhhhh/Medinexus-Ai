import { createContext } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '$'


    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

    const value = {
        doctors,
        currencySymbol,
        backendUrl
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider