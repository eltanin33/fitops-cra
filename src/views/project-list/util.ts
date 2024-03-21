import { useProject } from "utils/project";
import { useSetUrlSearchParam, useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";

// 项目列表搜索参数
export const useProjectsSearchParams = () => {
  // react-router中的searchParams对象变化时，会触发useMemo执行，改变params的值
  const [param, setParam] = useUrlQueryParam(["projectName", "managerId"]);
  return [
    useMemo(
      () => ({ ...param, managerId: Number(param.managerId) || undefined }),
      [param],
    ),
    setParam,
  ] as const;
};

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams();
  return ["projects", params];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]); //新增

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]); //编辑

  const setUrlParams = useSetUrlSearchParam();

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId),
  ); // 获取编辑的project

  const open = () => {
    setProjectCreate({ projectCreate: true });
  };

  const close = () => {
    setUrlParams({ projectCreate: "", editingProjectId: "" });
  };

  const startEdit = (projectId: number) =>
    setEditingProjectId({ editingProjectId: projectId });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
