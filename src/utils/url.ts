import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "./index";

/**
 *
 * @param keys K extends string表示K必须是string类型或者string类型的子类型
 * @returns 返回值包含：1）一个useMemo钩子函数的执行结果 2）一个回调函数用于更新URLSearchParams对象
 * 1、useMemo钩子用于在searchParams变化时，
 * 使用reduce方法找出searchParams中的key对应的value并放到一个对象中
 * 最终的执行结果是一个对象类型{[key in K]: string}
 * 2、回调函数将参数放到react-router的searchParams中，同时会过滤掉value为空的参数
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // searchParams是一个URLSearchParams类型的对象，其中包含了用于操作[查询参数]的方法，如get、set、delete等
  const [searchParams] = useSearchParams();
  // setSearchParams是一个被注入的回调函数，用于更新URLSearchParams对象
  const setUrlSearchParams = useSetUrlSearchParam();
  return [
    useMemo(
      () =>
        keys.reduce(
          (prev, key) => {
            return { ...prev, [key]: searchParams.get(key) || "" };
            // eslint-disable-next-line react-hooks/exhaustive-deps
          },
          {} as { [key in K]: string },
        ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams],
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setUrlSearchParams(params);
    },
  ] as const;
};

/**
 * @returns 返回一个函数，用于更新URLSearchParams对象
 */
export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // params表示一个对象，其key为string，value为unknown
  return (params: { [key in string]: unknown }) => {
    // cleanObject用于删除对象中的空值
    const o = cleanObject({
      // Object.fromEntries()方法用于将一个键值对数组转换为一个对象
      // 例如：Object.fromEntries([['foo', 'bar'], ['baz', 42]]); // { foo: "bar", baz: 42 }
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
};
