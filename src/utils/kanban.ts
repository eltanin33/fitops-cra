import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

export const useKanbans = (params?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(["kanbans", params], () =>
    client("kanbans", { data: params }),
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey),
  );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey),
  );
};
