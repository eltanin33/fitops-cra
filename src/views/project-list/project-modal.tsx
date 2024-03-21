import { useAddProject, useEditProject } from "utils/project";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { Button, Drawer, Form, Input, Spin, message } from "antd";
import styled from "@emotion/styled";
import { ErrorBox } from "components/lib";
import TextArea from "antd/es/input/TextArea";
// import { UserSelect } from "components/user-select";

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();
  const useMutateProject = editingProject ? useEditProject : useAddProject;

  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectsQueryKey());

  const [form] = useForm();

  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      message.success("创建成功", 2);
      form.resetFields();
      close();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  const title = editingProject ? "编辑项目" : "创建项目";

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  // forceRender用于强制渲染，否则会出现表单项不显示的问题，即上面使用了useForm()，但是DOM中没有对应的表单项
  return (
    <Drawer
      forceRender={true}
      onClose={closeModal}
      open={projectModalOpen}
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
              <Form.Item
                label={"项目编号"}
                name={"projectId"}
                rules={[{ required: true, message: "请输入项目编号" }]}
              >
                <Input placeholder={"请输入项目编号"} />
              </Form.Item>
              <Form.Item
                label={"项目名称"}
                name={"projectName"}
                rules={[{ required: true, message: "请输入项目名称" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>
              <Form.Item label={"描述"} name={"description"}>
                <TextArea rows={4} placeholder={"请输入部门名称"} />
              </Form.Item>
              {/* <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOptionName={"负责人"} />
              </Form.Item> */}

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
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
