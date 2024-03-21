/** @jsxImportSource @emotion/react */
import { Form, Input } from "antd";
import { Project } from "../../types/project";

interface SearchPanelProps {
  params: Partial<Pick<Project, "projectName" | "managerId">>;
  setParams: (param: SearchPanelProps["params"]) => void;
}

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  return (
    <Form css={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={"项目名称"}
          type="text"
          value={params.projectName}
          onChange={(event) =>
            setParams({
              ...params,
              projectName: event.target.value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};
