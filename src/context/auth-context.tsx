import React, { ReactNode } from "react";
import * as auth from "auth-provider";
import { User } from "../types/user";
import { http } from "utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
import { FullPageErrorFallBack, FullPageLoading } from "../components/lib";
import { useQueryClient } from "react-query";
import { message } from "antd";

interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const accessToken = auth.getToken();
  if (accessToken) {
    const data = await http("user", { accessToken });
    user = data;
    user.accessToken = accessToken;
    // if(!user.department){
    //   alert("请补全部门信息")
    // }
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  const queryClient = useQueryClient();

  const login = (form: AuthForm) => auth.login(form).then(setUser);

  const register = (form: AuthForm) =>
    auth.register(form).then(() => {
      message.success("注册成功，请登录", 1);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });

  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear();
    });

  useMount(() => {
    run(bootstrapUser());
  });
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }
  if (isError) {
    return <FullPageErrorFallBack error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

/**
 * 检查使用useAuth时是否存在AuthContext，如果不存在则报错
 * 通过useAuth钩子可以获取AuthContext上下文中的user、login、register、logout等方法
 * @returns AuthContext上下文
 */
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
