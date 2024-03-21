import { useAddRepo } from "utils/repo";
import { useRepoModal, useReposQueryKey } from "./utils";
import { useForm } from "antd/es/form/Form";
import { Button, Drawer, Form, Input, Spin, message } from "antd";
import { useEffect } from "react";
import styled from "@emotion/styled";
import { ErrorBox } from "components/lib";
import { useProjectIdInUrl } from "utils/project";

export const RepoModal = () => {
  const { repoModalOpen, close, editingRepo, isLoading } = useRepoModal();

  //   const useMutateRepo = editingRepo ? useEditRepo : useAddRepo;
  const useMutateRepo = useAddRepo;

  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateRepo(useReposQueryKey());

  const [form] = useForm();
  const projectId = useProjectIdInUrl();

  const onFinish = (values: any) => {
    mutateAsync({ ...editingRepo, ...values, projectId })
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

  const title = "添加仓库";

  useEffect(() => {
    form.setFieldsValue(editingRepo);
  }, [editingRepo, form]);

  return (
    <Drawer
      forceRender
      onClose={closeModal}
      open={repoModalOpen}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              {/* <Form.Item hidden name={"projectId"}>
                <Input type={"hidden"} />
              </Form.Item> */}
              <Form.Item
                label={"仓库ID"}
                name={"repoId"}
                rules={[{ required: true, message: "请输入仓库ID" }]}
              >
                <Input placeholder={"请输入仓库ID"} />
              </Form.Item>
              <Form.Item
                label={"仓库名称"}
                name={"repoName"}
                rules={[{ required: true, message: "请输入仓库名称" }]}
              >
                <Input placeholder={"请输入仓库名称"} />
              </Form.Item>
              <Form.Item
                label={"仓库地址"}
                name={"repoUrl"}
                rules={[{ required: true, message: "请输入仓库地址" }]}
              >
                <Input placeholder={"请输入仓库地址"} />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  验证并提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
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
