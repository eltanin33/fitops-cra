import { useProjectIdInUrl } from "utils/project";
import { useRepo } from "utils/repo";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";

export const useReposSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useReposQueryKey = () => ["repos", useReposSearchParams()];

export const useRepoModal = () => {
  //创建仓库
  const [{ repoCreate }, setRepoCreate] = useUrlQueryParam(["repoCreate"]);
  // 编辑仓库
  // TODO 可能需要添加projectId
  const [{ editingRepoId }, setEditingRepoId] = useUrlQueryParam([
    "editingRepoId",
  ]);

  const setUrlParams = useSetUrlSearchParam();

  /**
   * 获取正在被编辑的仓库信息
   */
  const { data: editingRepo, isLoading } = useRepo(
    Number(editingRepoId),
    useProjectIdInUrl(),
  );

  const open = () => {
    setRepoCreate({ repoCreate: true });
  };

  const close = () => {
    setUrlParams({ repoCreate: "", editingRepoId: "" });
  };

  const startEdit = (repoId: number) => {
    setEditingRepoId({ editingRepoId: repoId });
  };

  return {
    repoModalOpen: repoCreate === "true" || Boolean(editingRepoId),
    open,
    close,
    startEdit,
    editingRepo,
    isLoading,
  };
};
