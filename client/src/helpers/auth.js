import { deleteCookie, getCookie, setCookie } from "./cookies"
import { deleteLocalStorage, getLocalStorage, setLocalStorage } from "./localStorage";

export const setAuthentication = (token, user) => {
    setCookie('token', token);
    setLocalStorage('user', user);
} 


export const isAuthenticated = () => {
    if( getLocalStorage('user') && getCookie('token')) {
        return getLocalStorage('user');
    }else {
        return false;
    }
}


export const logout = (next) => {
    deleteCookie('token');
    deleteLocalStorage('user');
    deleteLocalStorage('kyc');
    deleteLocalStorage('kycAddress');

    next();
}