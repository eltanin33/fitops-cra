import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Tag,
  Typography,
  message,
} from "antd";
import { ScreenContainer } from "components/lib";
import { useDocumentTitle } from "utils";
import { Row as Bewteen } from "components/lib";
import { useAuth } from "context/auth-context";
import { useForm } from "antd/es/form/Form";
import { useHttp } from "utils/http";
import { useState } from "react";

export const ProfileView = () => {
  useDocumentTitle("个人中心", false);

  const [user, setUser] = useState(useAuth().user);
  const client = useHttp();

  const [form] = useForm();
  const handleUpdate = async ({
    name,
    department,
    privateToken,
  }: {
    name: string;
    department: string;
    privateToken: string;
  }) => {
    if (name === null || name === "" || name === undefined) {
      name = user!.name;
    }
    if (department === null || department === "" || department === undefined) {
      department = user!.department;
    }
    if (
      privateToken === null ||
      privateToken === "" ||
      privateToken === undefined
    ) {
      privateToken = user!.privateToken;
    }
    client(`user`, {
      method: "PUT",
      data: { name, department, privateToken },
    })
      .then(() => {
        message.success("更新成功");
        setUser((oldUser) => {
          if (oldUser === null) {
            return null;
          }
          return { ...oldUser, name, department, privateToken };
        });
      })
      .catch((err) => {
        message.error("更新失败");
      })
      .finally(() => {
        form.resetFields();
      });
  };

  return (
    <ScreenContainer>
      <Typography.Title level={3}>个人中心</Typography.Title>
      <Card bordered={false}>
        <Form labelCol={{ span: 6 }} layout="horizontal">
          <Row>
            {/* <Col span={8}>
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-circle"
              >
                +
              </Upload>
            </Col> */}
            <Col span={6}>
              <Form.Item label="姓名">
                <Typography.Text>{user?.name}</Typography.Text>
              </Form.Item>
              <Form.Item label="部门">
                <Typography.Text>{user?.department}</Typography.Text>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="GitLab密钥">
                {user?.privateToken ? (
                  <Tag color="green"> 已添加</Tag>
                ) : (
                  <Tag color="red"> 未添加</Tag>
                )}
              </Form.Item>
              <Form.Item label="注册时间">
                <Typography.Text>{user?.createTime}</Typography.Text>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="邮箱">
                <Typography.Text>{user?.username}@fhrd.com</Typography.Text>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Divider />
      <Card bordered={false}>
        <Form
          form={form}
          onFinish={handleUpdate}
          wrapperCol={{ span: 12 }}
          labelCol={{ span: 4 }}
          style={{ width: "60rem" }}
          layout="horizontal"
        >
          <Form.Item label="用户名" name={"name"}>
            <Input />
          </Form.Item>
          <Form.Item label="部门" name={"department"}>
            <Input />
          </Form.Item>
          <Form.Item label="GitLab密钥" name={"privateToken"}>
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 8 }}>
            <Bewteen between>
              <Button type={"primary"} htmlType={"submit"}>
                更新
              </Button>
              <Button htmlType={"reset"}>重置</Button>
            </Bewteen>
          </Form.Item>
        </Form>
      </Card>
    </ScreenContainer>
  );
};
