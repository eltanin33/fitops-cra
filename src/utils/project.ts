import { Project } from "../types/project";
import { useHttp } from "./http";
import { cleanObject } from "./index";
import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { useLocation } from "react-router";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // useQuery的第一个参数(即查询的key),第一个参数也可以为一个数组，数组中的元素变化时，会重新发送请求
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: cleanObject(param || {}) }),
  );
};

// 封装project相关的react-query操作
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    // useMutation的第一个参数(即要执行的异步函数)
    (params: Partial<Project>) =>
      client(`projects/${params.projectId}`, {
        method: "PUT",
        data: params,
      }),
    // useMutation的第二个参数(即配置对象，包含onMutate、onSuccess、onError等属性,
    // 其中onMutate会在执行异步函数前被调用，以此实现乐观更新)
    useEditConfig(queryKey),
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey),
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ projectId }: { projectId: number }) =>
      client(`projects/${projectId}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey),
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();

  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      // 当id有值的时候才会发送请求
      enabled: Boolean(id),
    },
  );
};

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  // 使用正则表达式从路径中提取项目id
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

// 可以将'use'理解为'get'，此处作用相当于getProjectByIdInUrl
export const useProjectInUrl = () => useProject(useProjectIdInUrl());