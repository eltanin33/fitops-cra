import { useRepoIdInUrl } from "utils/branch";
import { useProjectIdInUrl } from "utils/project";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";

export const useBranchSearchParams = () => ({
  projectId: useProjectIdInUrl(),
  repoId: useRepoIdInUrl(),
});

export const useBranchQueryKey = () => ["branches", useBranchSearchParams()];

export const useBranchModal = () => {
  const [{ branchCreate }] = useUrlQueryParam(["branchCreate"]);

  const setUrlParams = useSetUrlSearchParam();

  const open = (repoId: number) => {
    setUrlParams({ branchCreate: true, repoId });
  };

  const close = () => {
    setUrlParams({ branchCreate: "", repoId: "" });
  };

  return {
    branchModalOpen: branchCreate === "true",
    open,
    close,
  };
};
