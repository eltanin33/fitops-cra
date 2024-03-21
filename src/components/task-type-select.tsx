import { IdSelect } from "./id-select";
import { useTaskTypes } from "utils/task-type";

// 任务类型选择器
export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>,
) => {
  const { data: taskTypes } = useTaskTypes();
  return <IdSelect options={taskTypes || []} {...props} />;
};
