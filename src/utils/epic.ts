import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";
import { Epic } from "types/epic";

export const useEpics = (params?: Partial<Epic>) => {
  const client = useHttp();

  return useQuery<Epic[]>(["epics", params], () =>
    client("epics", { data: params }),
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey),
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`epic/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey),
  );
};
