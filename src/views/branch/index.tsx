import { ForkOutlined } from "@ant-design/icons";
import { Button, Modal, Table, TableColumnsType, message } from "antd";
import dayjs from "dayjs";
import { Branch } from "types/branch";
import { useBranches, useDeleteBranch } from "utils/branch";
import { useProjectIdInUrl } from "utils/project";

export const BranchViewRender = ({ repoId }: { repoId: number }) => {
  const projectId = useProjectIdInUrl();

  const { data: branchList } = useBranches({ projectId, repoId });

  const { mutateAsync: deleteBranch } = useDeleteBranch([
    "branches",
    { projectId, repoId },
  ]);

  const handleDeleteBranch = (branchId: string) => {
    Modal.confirm({
      title: "确定删除这个仓库吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      style: { top: 300 },
      onOk() {
        deleteBranch({ id: branchId })
          .then(() => {
            message.success("删除成功", 2);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  };

  const columns: TableColumnsType<Branch> = [
    {
      title: "#",
      dataIndex: "icon",
      key: "icon",
      render: () => <ForkOutlined />,
      width: 50,
      align: "right",
    },
    {
      title: "分支名称",
      dataIndex: "branchName",
      key: "branchName",
    },
    { title: "状态", dataIndex: "status", key: "status" },
    {
      title: "开始时间",
      dataIndex: "startTime",
      key: "startTime",
      render: (text) => {
        return dayjs(text).format("YYYY-MM-DD");
      },
    },
    {
      title: "结束时间",
      dataIndex: "endTime",
      key: "endTime",
      render: (text) => {
        return dayjs(text).format("YYYY-MM-DD");
      },
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: (_, branch) => (
        <Button type={"link"} onClick={() => handleDeleteBranch(branch.id)}>
          删除
        </Button>
      ),
    },
  ];

  return (
    <Table
      rowKey={"branchName"}
      style={{ paddingLeft: 50 }}
      columns={columns}
      dataSource={branchList || []}
      pagination={false}
    />
  );
};
