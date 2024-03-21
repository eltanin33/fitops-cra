import { Repo } from "types/repo";
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { cleanObject } from "utils";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

// 用于根据projectId查询repo信息
export const useRepos = (param?: Partial<Repo>) => {
  const client = useHttp();

  return useQuery<Repo[]>(["repos", param], () =>
    client("repos", { data: cleanObject(param || {}) }),
  );
};

/**
 * 根据当前的projectId和repoId查询repo信息
 * @param projectId 项目ID
 * @param repoId 仓库ID
 * @returns
 */
export const useRepo = (projectId: number, repoId: number) => {
  const client = useHttp();
  return useQuery<Repo>(
    ["repo", { projectId, repoId }],
    () => client(`repo/${projectId}/${repoId}`),
    {
      // 当id有值的时候才会发送请求
      enabled: Boolean(projectId && repoId),
    },
  );
};

export const useEditRepo = () => {};

// TODO 编辑单个repo信息
// export const useEditRepo = (queryKey: QueryKey) => {
//   const client = useHttp();

//   return useMutation(
//     (params: Partial<Repo>) =>
//       client(`repos/${params.repoId}`, {
//         method: "PUT",
//         data: params,
//       }),
//     useEditConfig(queryKey),
//   );
// };

export const useAddRepo = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Repo>) =>
      client(`repos`, {
        method: "POST",
        data: params,
      }),
    // TODO 使用特殊的乐观更新，因为添加repo时，需要同时关联project中的repoId
    useAddConfig(queryKey),
  );
};

export const useDeleteRepo = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ projectId, repoId }: { projectId: number; repoId: number }) =>
      client(`repos/${projectId}/${repoId}`, {
        method: "DELETE",
      }),
    // TODO 使用特殊的乐观更新，因为删除repo时，需要同时关联project中的repoId
    useDeleteConfig(queryKey),
  );
};
