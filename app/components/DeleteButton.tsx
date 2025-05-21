import { DeleteOutlined } from "@ant-design/icons";
import { Button, message } from "antd";

interface DeleteButtonProps {
  type?: "text" | "default" | "link" | "primary" | "dashed";
  deleting: boolean;
  onClick: () => Promise<void>;
}

export default function DeleteButton({
  type = "default",
  deleting,
  onClick,
}: DeleteButtonProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Couldn't delete 😢",
    });
  };
  return (
    <>
      {contextHolder}
      <Button
        danger
        loading={deleting}
        disabled={deleting}
        onClick={async () => {
          try {
            await onClick();
          } catch (err) {
            error();
          }
        }}
        type={type}
        icon={<DeleteOutlined />}
      >
        Delete
      </Button>
    </>
  );
}
