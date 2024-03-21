import { User } from "../types/user";
import { useHttp } from "./http";
import { cleanObject } from "./index";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useEditConfig } from "./use-optimistic-options";

// 用于获取用户列表
// export const useUsers = (param?: Partial<User>) => {
//   const client = useHttp();
//   const { run, ...result } = useAsync<User[]>();

//   useEffect(() => {
//     run(client("users", { data: cleanObject(param || {}) }));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [param]);

//   return result;
// };

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  // useQuery的第一个参数(即查询的key),第一个参数也可以为一个数组，数组中的元素变化时，会重新发送请求
  return useQuery<User[]>(["users", param], () =>
    client("users", { data: cleanObject(param || {}) }),
  );
};

export const useEditUser = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<User>) =>
      client(`user`, {
        method: "PUT",
        data: params,
      }),
    useEditConfig(queryKey),
  );
};
