import { useState } from "react";
import { Register } from "./register";
import { Login } from "./login";
import { Card, Divider, Button, Typography } from "antd";
import styled from "@emotion/styled";
import left from "assets/left.svg";
import right from "assets/right.svg";
import { useDocumentTitle } from "../utils";
import { ErrorBox } from "components/lib";

export const Unauthenticated = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useDocumentTitle("请登录/注册以继续");
  return (
    <Container>
      <Typography.Title style={{ color: "rgb(94, 108, 132)" }}>
        {"Fitops"}
      </Typography.Title>
      <Background />
      <ShadowCard>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        <ErrorBox error={error} />
        {isRegister ? (
          <Register onError={setError} />
        ) : (
          <Login onError={setError} />
        )}
        <Divider />
        <Button type={"link"} onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "已有账号？直接登录" : "没有账号？注册"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position:
    left bottom,
    right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

export const LongButton = styled(Button)`
  width: 100%;
`;
