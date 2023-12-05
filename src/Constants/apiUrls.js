export const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";

export const REGISTER = API_BASE+"/auth/register";
export const LOGIN = API_BASE+"/auth/login";
export const LOGOUT = API_BASE+"/auth/logout";
export const CHECK_AUTH = API_BASE+"/auth/check-auth";
export const PRODUCTS = API_BASE+"/products";