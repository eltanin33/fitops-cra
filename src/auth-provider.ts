import { message } from "antd";
import { User } from "./types/user";

const localStorageKey = "__auth_provider_token__";
const url = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const removeToken = () =>
  window.localStorage.removeItem(localStorageKey);

export const handleUserResponse = (data: User) => {
  window.localStorage.setItem(localStorageKey, data.accessToken || "");
  return data;
};
export const login = async (data: { username: string; password: string }) => {
  return fetch(`${url}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      const res = await response.json();
      if (res.code !== 0) {
        message.error(res.message, 2);
        return null;
      }
      return handleUserResponse(res.data);
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const register = async (data: {
  username: string;
  password: string;
}) => {
  return fetch(`${url}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      const res = await response.json();
      if (res.code !== 0) {
        message.error(res.message, 2);
        return null;
      }
      return handleUserResponse(res.data);
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () => {
  fetch(`${url}/user/logout`, {
    method: "POST",
  });
  removeToken();
};
