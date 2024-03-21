import * as auth from "auth-provider";
import qs from "qs";
import { useAuth } from "../context/auth-context";
import { useCallback } from "react";
import { message } from "antd";

const url = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  accessToken?: string | null;
}

export const http = (
  endpoint: string,
  { data, accessToken, ...customConfig }: Config = {},
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return fetch(`${url}/${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const res = await response.json();
    if (res.code === 10) {
      auth.removeToken();
      window.location.reload();
    } else if (res.code !== 0) {
      message.error(res.message, 2);
      return Promise.reject(res.message);
    }
    if (response.ok) {
      return res.data;
    } else {
      return Promise.reject(res.data);
    }
  });
};

// 自动将token加入到所有请求的请求头中
export const useHttp = () => {
  const { user } = useAuth();
  return useCallback(
    // ts: Parameters<typeof http> === [string, Config] 这里的参数和上面http的入参相同
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, accessToken: user?.accessToken }),
    [user?.accessToken],
  );
};
