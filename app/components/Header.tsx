import { Typography } from "antd";
import { useNavigate } from "react-router";

export function Header() {
  const navigate = useNavigate();
  return (
    <Typography.Title
      style={{ textAlign: "center" }}
      level={1}
      onClick={() => {
        navigate("/");
      }}
    >
      NC News
    </Typography.Title>
  );
}
