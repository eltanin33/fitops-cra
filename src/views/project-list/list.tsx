import { Button, Dropdown, Modal, Table, TableProps, message } from "antd";
import dayjs from "dayjs";
import { Project } from "../../types/project";
import { Link } from "react-router-dom";
import { useDeleteProject } from "../../utils/project";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { ButtonNoPadding } from "components/lib";
import { FileTextOutlined } from "@ant-design/icons";

interface ListProps extends TableProps<Project> {
  refresh?: () => void;
}

export const List = ({ ...props }: ListProps) => {
  return (
    <Table
      rowKey={"projectId"}
      pagination={false}
      columns={[
        {
          title: "#",
          render() {
            return <FileTextOutlined />;
          },
        },
        {
          title: "项目编号",
          dataIndex: "projectId",
        },
        {
          title: "名称",
          dataIndex: "projectName",
          render(value, project) {
            return (
              <Link to={String(project.projectId)}>{project.projectName}</Link>
            );
          },
        },
        {
          title: "负责人",
          render(value, project) {
            return <span>{project.managerName}</span>;
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.createTime
                  ? dayjs(project.createTime).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          title: "操作",
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    />
  );
};

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (projectId: number) => () => startEdit(projectId);
  const { mutateAsync: deleteProject } = useDeleteProject(
    useProjectsQueryKey(),
  );
  const confirmDeleteProject = (projectId: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      style: { top: 300 },
      onOk() {
        deleteProject({ projectId }).then(() => {
          message.success("删除成功");
        });
      },
    });
  };

  const items = [
    {
      key: "edit",
      label: (
        <Button disabled type={"link"} onClick={editProject(project.projectId)}>
          编辑
        </Button>
      ),
    },
    {
      key: "delete",
      label: (
        <Button
          type={"link"}
          onClick={() => confirmDeleteProject(project.projectId)}
        >
          删除
        </Button>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};
