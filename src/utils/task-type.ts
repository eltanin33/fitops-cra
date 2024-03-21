import { useQuery } from "react-query";
import { useHttp } from "./http";
import { TaskType } from "types/task-type";

export const useTaskTypes = () => {
  const client = useHttp();

  // 这里的client函数中没有传入任何参数，表示获取所有的taskTypes
  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};
