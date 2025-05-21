import { Flex, Spin, Typography } from "antd";

export function MetaWraper({ loading, error, children }) {
  if (loading) {
    return (
      <Flex vertical align="center">
        <Spin size="large" />
      </Flex>
    );
  }

  if (error) {
    console.log(error);
    return <Typography.Text type="warning">{error}</Typography.Text>;
  }

  return children;
}
