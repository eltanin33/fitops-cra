import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useTasks = (params?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(["tasks", params], () =>
    client("tasks", { data: params }),
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey),
  );
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey),
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey),
  );
};

// 用于获取task详情
export const useTask = (id?: number) => {
  const client = useHttp();

  return useQuery<Task>(["tasks", { id }], () => client(`tasks/${id}`), {
    // 当id有值的时候才会发送请求
    enabled: Boolean(id),
  });
};
