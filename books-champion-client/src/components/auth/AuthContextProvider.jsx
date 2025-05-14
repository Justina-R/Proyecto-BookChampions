import { useState } from "react";
import { AuthenticationContext } from "./authContext";

const tokenValue = localStorage.getItem('book-champions-token');

export const AutenthicateContextProvider=({children}) => {
    const [token, setToken] = useState(tokenValue);

    const handleUserLogin = (token) => {
        localStorage.setItem('book-champions-token', token);
        setToken(token);
    };

    const handleUserLogout=() => {
        localStorage.removeItem('book-champions-token', token);
        setToken(null);
    }

    return (
        <AuthenticationContext value={{token, handleUserLogin,handleUserLogout}}>
            {children}
        </AuthenticationContext>
    )
}