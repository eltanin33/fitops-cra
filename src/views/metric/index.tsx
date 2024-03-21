import { Col, Row, Typography } from "antd";
import { ScreenContainer } from "components/lib";
import { useDocumentTitle } from "utils";
import { CodeInputRatio, CodeProductivity, Issue } from "./code-metric";

export const MetricView = () => {
  useDocumentTitle("代码度量", false);

  return (
    <ScreenContainer>
      <Typography.Title level={3}>代码度量</Typography.Title>
      <Row>
        <Col span={8}>
          <CodeProductivity />
        </Col>
        <Col span={8}>
          <CodeInputRatio />
        </Col>
        <Col span={8}>
          <Issue />
        </Col>
      </Row>
    </ScreenContainer>
  );
};
