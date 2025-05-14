import { jwtDecode } from 'jwt-decode';

export const validateString = (str, minLength, maxLength) => {
    if (minLength && str.length < minLength)
        return false;
    else if (maxLength && str.length > maxLength)
        return false;
    return true;
}
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export const validatePassword = (password, minLength, maxLength, needsUppercase, needsNumber) => {
    if (minLength && password.length < minLength)
        return false;
    else if (maxLength && password.length > maxLength)
        return false;
    else if (needsUppercase && !/[A-Z]/.test(password))
        return false;
    else if (needsNumber && !/\d/.test(password))
        return false;

    return true;
}

// Función que valida si el token expiró
export const isTokenValid = (token) => {
    if (!token) {
        return false
    };
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now();
        //valida si el token expiró decodificando la expiración
        return decodedToken.exp > currentTime;
    } catch (error) {
        console.log(error);
        return false;
    }
}