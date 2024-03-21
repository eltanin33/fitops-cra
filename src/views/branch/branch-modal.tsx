import { useAddBranch, useRepoIdInUrl } from "utils/branch";
import { useBranchModal, useBranchQueryKey } from "./utils";
import { useForm } from "antd/es/form/Form";
import { Button, DatePicker, Drawer, Form, Input, message } from "antd";
import styled from "@emotion/styled";
import { useProjectIdInUrl } from "utils/project";

export const BranchModal = () => {
  const { branchModalOpen, close } = useBranchModal();

  const useMutateBranch = useAddBranch;

  const projectId = useProjectIdInUrl();

  const repoId = useRepoIdInUrl();

  const { mutateAsync } = useMutateBranch(useBranchQueryKey());

  const [form] = useForm();

  const title = "添加分支";

  const onFinish = (values: any) => {
    const startTime = values.range[0].format("YYYY-MM-DD");
    const endTime = values.range[1].format("YYYY-MM-DD");
    delete values.range;
    mutateAsync({ ...values, startTime, endTime, projectId, repoId })
      .then(() => {
        message.success("添加成功", 2);
      })
      .catch((error) => {})
      .finally(() => {
        closeModal();
      });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Drawer
      forceRender
      onClose={closeModal}
      open={branchModalOpen}
      width={"100%"}
    >
      <Container>
        <h1>{title}</h1>
        <Form
          form={form}
          layout={"vertical"}
          style={{ width: "30rem" }}
          onFinish={onFinish}
        >
          <Form.Item
            label={"分支名称"}
            name={"branchName"}
            rules={[{ required: true, message: "请输入分支名称" }]}
          >
            <Input placeholder={"请输入分支名称"} />
          </Form.Item>
          <Form.Item
            label={"时间范围"}
            name={"range"}
            rules={[{ required: true, message: "请选择时间范围" }]}
          >
            <DatePicker.RangePicker
              style={{ width: "100%" }}
              format={"YYYY-MM-DD"}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button type={"primary"} htmlType={"submit"}>
              验证并提交
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
