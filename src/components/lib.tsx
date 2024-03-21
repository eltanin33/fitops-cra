import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom + "rem"};

  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
          ? "2rem"
          : undefined};
  }
`;

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FullPageLoading = () => (
  <FullPage>
    <Spin size={"large"} />
  </FullPage>
);

export const FullPageErrorFallBack = ({ error }: { error: Error | null }) => (
  <FullPage>
    <ErrorBox error={error} />
  </FullPage>
);

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;

export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: RGB(242, 243, 245);
`;

// overflow-x: scroll;表示内部的元素溢出时显示滚动条
// flex 1;表示占满剩余的空间
export const ColumnContainer = styled.div`
  display: flex;
  // overflow: hidden;
  overflow-x: scroll;
  flex: 1;
`;

export const KanbanColumnContainer = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

// 类型守卫，如果value包含message属性，则断定为Error类型
const isError = (value: any): value is Error => value?.mesage;

export const ErrorBox = ({ error }: { error: unknown }) => {
  return isError(error) ? (
    <Typography.Text type="danger">{error.message}</Typography.Text>
  ) : null;
};
