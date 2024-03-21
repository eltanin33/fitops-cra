import {
  DownCircleOutlined,
  FileTextOutlined,
  PlusOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import styled from "@emotion/styled";
import {
  Button,
  Divider,
  Dropdown,
  Modal,
  Table,
  TableColumnsType,
  Typography,
  message,
} from "antd";
import { Row, ScreenContainer } from "components/lib";
import { Repo } from "types/repo";
import { useDocumentTitle } from "utils";
import { useProjectIdInUrl, useProjectInUrl } from "utils/project";
import { useDeleteRepo, useRepos } from "utils/repo";
import { useRepoModal, useReposQueryKey, useReposSearchParams } from "./utils";
import dayjs from "dayjs";
import { BranchViewRender } from "views/branch";
import { useBranchModal } from "views/branch/utils";

export const RepoView = () => {
  const { data: currentProject } = useProjectInUrl();
  const projectId = useProjectIdInUrl();
  const { data: repoList } = useRepos(useReposSearchParams());
  const { mutateAsync: deleteRepo } = useDeleteRepo(useReposQueryKey());
  useDocumentTitle("代码仓库映射列表", false);

  const { open } = useRepoModal();
  const { open: openBranchModal } = useBranchModal();

  const handleDeleteRepo = (repoId: number) => {
    Modal.confirm({
      title: "确定删除这个仓库吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      style: { top: 300 },
      onOk() {
        deleteRepo({ repoId, projectId })
          .then(() => {
            message.success("删除成功", 2);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  };

  const More = ({ repo }: { repo: Repo }) => {
    const items = [
      {
        key: "edit",
        label: (
          <Button onClick={() => openBranchModal(repo.repoId)} type={"link"}>
            添加分支
          </Button>
        ),
      },
      {
        key: "delete",
        label: (
          <Button type={"link"} onClick={() => handleDeleteRepo(repo.repoId)}>
            删除仓库
          </Button>
        ),
      },
    ];
    return (
      <Dropdown menu={{ items }}>
        <Button type={"link"}>...</Button>
      </Dropdown>
    );
  };

  const columns: TableColumnsType<Repo> = [
    {
      title: "#",
      dataIndex: "icon",
      key: "icon",
      render: () => <FileTextOutlined />,
      width: 50,
      align: "right",
    },
    {
      title: "编号",
      dataIndex: "repoId",
      key: "repoId",
      width: 100,
      align: "left",
    },
    {
      title: "仓库名称",
      dataIndex: "repoName",
      key: "repoName",
      align: "center",
    },
    {
      title: "仓库地址",
      dataIndex: "repoUrl",
      key: "repoUrl",
      align: "center",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      align: "center",
      render: (text) => {
        return dayjs(text).format("YYYY-MM-DD");
      },
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (_, repo) => <More repo={repo} />,
      align: "center",
    },
  ];

  return (
    <ScreenContainer>
      <Row between>
        <Typography.Title level={3}>
          {currentProject?.projectName} 代码仓库映射列表
        </Typography.Title>
        <Button type={"primary"} onClick={open}>
          <PlusOutlined />
          添加仓库
        </Button>
      </Row>
      <Divider />
      <RepoContainer>
        <Table
          rowKey={"repoId"}
          columns={columns}
          expandable={{
            expandIcon: ({ expanded, onExpand, record }) => {
              if (expanded) {
                return (
                  <DownCircleOutlined onClick={(e) => onExpand(record, e)} />
                );
              } else {
                return (
                  <RightCircleOutlined onClick={(e) => onExpand(record, e)} />
                );
              }
            },
            expandedRowRender: (record) => (
              <BranchViewRender repoId={record.repoId} />
            ),
            rowExpandable: () => true,
            onExpand: (isExpand, event) => {},
          }}
          dataSource={repoList}
          pagination={false}
        />
      </RepoContainer>
    </ScreenContainer>
  );
};

const RepoContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
