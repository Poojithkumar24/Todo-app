import cookie from "js-cookie";
import axios from "axios";
import { baseURL } from "./constant";

export const setCookie = (key, value) => {
  cookie.set(key, value, { expires: 1 });
};

export const removeCookie = (key) => {
  cookie.remove(key);
};

export const getCookie = (key) => {
  return cookie.get(key);
};

export const setAuthentication = (token) => {
  setCookie("token", token);
};

export const setUserId = (id) => {
  setCookie("userId", id);
};

export const getUserId = () => {
  return getCookie("userId"); 
};

export const logOut = () => {
  removeCookie("token");
  removeCookie("userId"); 
};

export const isLogin = async () => {
  const token = getCookie("token");

  if (token) {
    const res = await axios.post(`${baseURL}/auth/auth`, { token });
    return res.data;
  }
  return false;
};
