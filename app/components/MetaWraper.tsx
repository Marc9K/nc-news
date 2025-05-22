import { HomeOutlined } from "@ant-design/icons";
import { Button, Flex, Spin, Typography } from "antd";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";

export function MetaWraper({
  loading,
  error,
  children,
  icon = <HomeOutlined />,
  onClick,
  text = "Go to home page",
}: {
  loading: boolean;
  error: AxiosError | null;
  children: React.ReactNode | React.ReactNode[];
  icon?: React.ReactNode;
  onClick?: () => void;
  text?: string;
}) {
  const navigate = useNavigate();

  if (!onClick) {
    onClick = () => {
      navigate("/");
    };
  }

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
        <Button icon={icon} size="large" type="primary" onClick={onClick}>
          {text}
        </Button>
      </Flex>
    );
  }

  return children;
}
