import { useEffect, useRef, useState } from "react";

// ts类型推断函数返回值为boolean
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: Record<string, unknown>) => {
  // 传进来的obj有可能是想保留的值1
  // 故不要随意更改对象、数组的值
  // 返回一个新的给他们，新旧值都不影响
  const result = { ...object };
  for (const key in result) {
    if (isVoid(result[key])) {
      delete result[key];
    }
  }
  return result;
};

/**
 * 用于实现防抖
 * @param value
 * @param delay
 * @returns
 */
export const useDebounce = <V>(value: V, delay: number) => {
  // 状态（响应式：页面跟着更改）
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const time = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    // 每次在上一个useEffect处理完以后再运行
    return () => {
      clearTimeout(time);
    };
  }, [value, delay]);
  return debounceValue;
};

// 模拟类组件中的componentDidMount，用于函数式组件
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // 依赖项中加上callback会造成无限循环，与useCallback和useMemo有关
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// 用于返回组件的挂载状态，若为挂载/已卸载，返回false
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  // 每次渲染都会执行useEffect
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};

export const useDocumentTitle = (
  title: string,
  keepOnUmount: boolean = true,
) => {
  // ref对象在组件的整个生命周期内持续存在
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUmount) {
        // 闭包，获取到的是第一次传来的值
        // 如果指定依赖的话，获取到的就是新值，且未指定依赖时会告警
        document.title = oldTitle;
      }
    };
  }, [keepOnUmount, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);
