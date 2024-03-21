import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "./components/lib";
import { Avatar, Button, Divider, Dropdown, MenuProps } from "antd";
import { ProjectList } from "./views/project-list";
import { Route, Routes } from "react-router";
import { BrowserRouter, Link, Navigate } from "react-router-dom";
import { ProjectDetail } from "./views/project";
import { resetRoute } from "./utils";
import { ProjectModal } from "views/project-list/project-modal";
import { RepoModal } from "views/repo/repo-modal";
import { BranchModal } from "views/branch/branch-modal";
import { DownOutlined } from "@ant-design/icons";
import { MetricView } from "views/metric";
import { ProfileView } from "views/profile";
import { ScreenView } from "views/screen";

export const Authenticated = () => {
  return (
    <Container>
      <BrowserRouter>
        <PageHeader />
        <Main>
          <Routes>
            <Route path={"/projects"} element={<ProjectList />} />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectDetail />}
            />
            <Route path={"/metrics"} element={<MetricView />} />
            <Route path={"/profile"} element={<ProfileView />} />
            <Route path={"/screen"} element={<ScreenView />} />
            <Route path="*" element={<Navigate to="/projects" />} />
          </Routes>
        </Main>
        <ProjectModal />
        <RepoModal />
        <BranchModal />
      </BrowserRouter>
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <TextLogo />
        </ButtonNoPadding>
        <Divider
          type="vertical"
          style={{ height: "3rem", borderLeft: "2px solid #f0f0f0" }}
        />
        <Button type="link" onClick={resetRoute}>
          项目
        </Button>
        <Link to="/metrics">
          <Button type="link">报表</Button>
        </Link>
        <Link to="/profile">
          <Button type="link">个人中心</Button>
        </Link>
        <Link to="/screen">
          <Button type="link">大屏</Button>
        </Link>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link to={"/profile"}>
          <Button type={"link"}>个人中心</Button>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Button type={"link"} onClick={logout}>
          登 出
        </Button>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <div>
        <Avatar
          // style={{ backgroundColor: "#1890ff" }}
          style={{ backgroundColor: "#003a8c" }}
          size={32}
        >
          {user?.username[0].toUpperCase()}
        </Avatar>
        <Button
          type={"link"}
          style={{ color: "black" }}
          onClick={(e) => e.preventDefault()}
        >
          {user?.username}
          <DownOutlined />
        </Button>
      </div>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;

const Header = styled(Row)`
  padding-left: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const TextLogo = () => {
  return (
    <div
      style={{
        fontSize: "32px",
        fontWeight: 700,
        color: "blue",
        letterSpacing: "3px",
        marginTop: "-1rem",
      }}
    >
      Fitops
    </div>
  );
};
