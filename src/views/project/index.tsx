import { Link } from "react-router-dom";
import { Navigate, Route, Routes, useLocation } from "react-router";
import styled from "@emotion/styled";
import { Menu } from "antd";
import { RepoView } from "../repo";
import { MetricView } from "views/metric";
import { DatabaseOutlined } from "@ant-design/icons";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectDetail = () => {
  const routeType = useRouteType();

  const items = [
    {
      key: "repo",
      label: (
        <Link to={"repo"}>
          <DatabaseOutlined />
          仓库映射
        </Link>
      ),
    },
    // {
    //   key: "metric",
    //   label: <Link to={"metric"}>代码度量</Link>,
    // },
  ];

  return (
    <Container>
      <Aside>
        <Menu items={items} mode={"inline"} selectedKeys={[routeType]} />
      </Aside>
      <Main>
        <Routes>
          <Route path={"repo"} element={<RepoView />} />
          <Route path={"metric"} element={<MetricView />} />
          <Route index element={<Navigate to={"repo"} replace />} />
        </Routes>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`;

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;
