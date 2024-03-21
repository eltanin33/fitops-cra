import { QueryKey, useQueryClient } from "react-query";

/**
 *
 * @param queryKey 查询的key
 * @param callback 要执行的回调函数
 * @returns 返回一个对象，包含onSuccess、onMutate、onError三个属性，将会赋值给react-query的mutate方法
 * onMutate操作会在异步操作开始前被调用，以此实现乐观更新
 */
export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[],
) => {
  const queryClient = useQueryClient();

  return {
    // 直接指定某个querykey的缓存数据失效
    // 这样react-query就会在后台自动重新拉取最新的数据并更新的状态树中
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      // 乐观更新：先响应用户操作，然后根据服务器的结果，是否返回原先状态
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      return { previousItems };
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context?.previousItems);
    },
  };
};

/**
 * 针对删除操作的返回结果，传入一个用于删除某个key的回调函数
 * @param queryKey
 * @returns
 */
export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    return old?.filter((item) => item.id !== target.id) || [];
  });

/**
 * 针对编辑操作的返回结果，传入一个用于编辑某个key的回调函数
 * @param queryKey
 * @returns
 */
export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item,
      ) || [],
  );

/**
 * 传入一个用于添加某个key的回调函数，供代码中注入useAddConfig处使用
 * @param queryKey
 * @returns
 */
export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) =>
    old?.includes(target) ? [...old, target] : [target],
  );
