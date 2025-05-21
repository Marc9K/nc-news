import { Flex, Spin, Typography } from "antd";
import type { AxiosError } from "axios";

export function MetaWraper({
  loading,
  error,
  children,
}: {
  loading: boolean;
  error: AxiosError | null;
  children: React.ReactNode | React.ReactNode[];
}) {
  if (loading) {
    return (
      <Flex vertical align="center">
        <Spin size="large" />
      </Flex>
    );
  }

  if (error) {
    return <Typography.Text type="warning">{error.message}</Typography.Text>;
  }

  return children;
}
