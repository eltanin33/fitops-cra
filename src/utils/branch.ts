import { Branch } from "types/branch";
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { cleanObject } from "utils";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";
import { useLocation } from "react-router";

export const useBranches = (param?: Partial<Branch>) => {
  const client = useHttp();

  return useQuery<Branch[]>(["branches", param], () =>
    client("branches", { data: cleanObject(param || {}) }),
  );
};

export const useAddBranch = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Branch>) =>
      client(`branches`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey),
  );
};

export const useDeleteBranch = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: string }) =>
      client(`branches/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey),
  );
};

// 从url中获取repoId，只有当添加分支对话框被打开时，repoId才会被添加到url中
export const useRepoIdInUrl = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const repoId = queryParams.get("repoId");
  return Number(repoId);
};
