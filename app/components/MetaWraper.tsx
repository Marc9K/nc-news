import { HomeOutlined } from "@ant-design/icons";
import { Button, Flex, Spin, Typography } from "antd";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";

export function MetaWraper({
  loading,
  error,
  children,
}: {
  loading: boolean;
  error: AxiosError | null;
  children: React.ReactNode | React.ReactNode[];
}) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Flex vertical align="center">
        <Spin size="large" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex vertical align="center">
        <Typography.Title style={{ textAlign: "center" }} type="danger">
          Sorry
          <br />
          {error.message}
        </Typography.Title>
        <Button
          icon={<HomeOutlined />}
          size="large"
          type="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Go to home page
        </Button>
      </Flex>
    );
  }

  return children;
}
