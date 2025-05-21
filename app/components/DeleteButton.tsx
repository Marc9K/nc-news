import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface DeleteButtonProps {
  type?: "text" | "default" | "link" | "primary" | "dashed";
  deleting: boolean;
  onClick: () => void;
}

export default function DeleteButton({
  type = "default",
  deleting,
  onClick,
}: DeleteButtonProps) {
  return (
    <Button
      loading={deleting}
      disabled={deleting}
      onClick={onClick}
      type={type}
      icon={<DeleteOutlined />}
    >
      Delete
    </Button>
  );
}
