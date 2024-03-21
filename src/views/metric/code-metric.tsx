import styled from "@emotion/styled";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Typography,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { Row } from "components/lib";

const download = (values: any, endpoint: string) => {
  const { range, ...rest } = values;
  // 如果 range 存在，则分别获取 since 和 until
  const since = range?.[0]?.format("YYYY-MM-DD");
  const until = range?.[1]?.format("YYYY-MM-DD");
  // 构建 params 对象，包含 since 和 until 以及其他表单项
  const params = {
    ...rest,
    ...(since && { since }), // 如果 since 存在，则添加到 params
    ...(until && { until }), // 如果 until 存在，则添加到 params
  };

  const queryString = new URLSearchParams(params).toString();
  const url = `${endpoint}?${queryString}`;

  fetch(url, { method: "GET" })
    .then((response) => {
      // 从响应头中获取文件名
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = "default-filename.xlsx"; // 设定一个默认文件名
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(
          /filename\*?=['"]?(?:UTF-8'')?([^'";]+)['"]?/i,
        );
        if (filenameMatch && filenameMatch.length > 1) {
          filename = decodeURIComponent(filenameMatch[1]);
        }
      }
      return response.blob().then((blob) => {
        // 创建 URL 并触发下载
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
    })
    .catch((error) => {
      message.error("下载失败");
    });
};

export const CodeProductivity = () => {
  const [form] = useForm();
  const handleDownload = (values: any) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/metrics/download/productivity`;
    download(values, endpoint);
  };
  return (
    <FormContainer>
      <Typography.Title style={{ textAlign: "center" }} level={4}>
        代码生产率
      </Typography.Title>
      <Form
        onFinish={handleDownload}
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
      >
        <Form.Item
          label={"仓库ID"}
          name={"pid"}
          rules={[{ required: true, message: "请输入仓库ID" }]}
        >
          <Input placeholder={"GitLab仓库ID，输入0代表全部"} />
        </Form.Item>
        <Form.Item
          label={"分支"}
          name={"branch"}
          rules={[{ required: true, message: "请输入分支" }]}
        >
          <Input placeholder={"填写要统计的分支名称正则"} />
        </Form.Item>
        <Form.Item
          initialValue={30000}
          label={"单次提交上限"}
          name={"limit"}
          rules={[{ required: true, message: "请输入上限值" }]}
        >
          <InputNumber
            placeholder={"输入单次提交上限"}
            style={{ width: "100%" }}
            min={30000}
            max={50000}
          />
        </Form.Item>
        <Form.Item
          label={"时间范围"}
          name={"range"}
          rules={[
            {
              type: "array" as const,
              required: true,
              message: "请选择时间范围",
            },
          ]}
        >
          <DatePicker.RangePicker
            format={"YYYY-MM-DD"}
            placeholder={["开始时间", "结束时间"]}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label={"工作日计数"} name={"days"}>
          <Input placeholder={"输入工作日计数"} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
          <Row between>
            <Button type={"primary"} htmlType={"submit"}>
              下载报表
            </Button>
            <Button htmlType={"reset"}>重置</Button>
          </Row>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export const CodeInputRatio = () => {
  const [form] = useForm();
  const handleDownload = (values: any) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/metrics/download/rate`;
    download(values, endpoint);
  };
  return (
    <FormContainer>
      <Typography.Title style={{ textAlign: "center" }} level={4}>
        代码投入率
      </Typography.Title>
      <Form
        onFinish={handleDownload}
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
      >
        <Form.Item
          label={"时间范围"}
          name={"range"}
          rules={[
            {
              type: "array" as const,
              required: true,
              message: "请选择时间范围",
            },
          ]}
        >
          <DatePicker.RangePicker
            format={"YYYY-MM-DD"}
            placeholder={["开始时间", "结束时间"]}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
          <Row between>
            <Button type={"primary"} htmlType={"submit"}>
              下载报表
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export const Issue = () => {
  const [form] = useForm();
  const handleDownload = (values: any) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/metrics/download/issue`;
    download(values, endpoint);
  };
  return (
    <FormContainer>
      <Typography.Title style={{ textAlign: "center" }} level={4}>
        Issue代码量
      </Typography.Title>
      <Form
        onFinish={handleDownload}
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
      >
        <Form.Item
          label={"代码仓库"}
          name={"pid"}
          rules={[{ required: true, message: "请输入仓库编号" }]}
        >
          <Input placeholder={"填写仓库编号"} />
        </Form.Item>
        <Form.Item
          label={"Issue号"}
          name={"iid"}
          rules={[{ required: true, message: "请输入Issue编号分支" }]}
        >
          <Input placeholder={"填写Issue编号"} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
          <Row between>
            <Button type={"primary"} htmlType={"submit"}>
              下载报表
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  max-width: 600px;
`;
