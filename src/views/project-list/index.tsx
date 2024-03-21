import { useDebounce, useDocumentTitle } from "../../utils";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useProjects } from "../../utils/project";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ErrorBox, Row, ScreenContainer } from "components/lib";
import { Button, Divider, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export const ProjectList = () => {
  useDocumentTitle("项目列表", false);

  const [params, setParams] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: projectList,
  } = useProjects(useDebounce(params, 200));

  const { open } = useProjectModal();

  return (
    <ScreenContainer>
      <Row between={true}>
        <Typography.Title level={3}>项目列表</Typography.Title>
        <Button onClick={open} type={"primary"}>
          <PlusOutlined />
          创建项目
        </Button>
      </Row>
      <Divider />
      <SearchPanel params={params} setParams={setParams} />
      <ErrorBox error={error} />
      <List loading={isLoading} dataSource={projectList || []} />
    </ScreenContainer>
  );
};

// ProjectList.whyDidYouRender = true;
