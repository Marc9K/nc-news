import { Button, message } from "antd";
import axios from "axios";
import { API } from "../../env";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";

interface LikeButtonProps {
  like: number;
  setLike: (like: number) => void;
  value: 1 | -1;
  type?: "text" | "default" | "link" | "primary" | "dashed";
  endpoint: string;
}

export function LikeButton({
  like,
  setLike,
  value,
  type = "default",
  endpoint,
}: LikeButtonProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Your vote didn't count 😢",
    });
  };
  const icon = value > 0 ? <LikeOutlined /> : <DislikeOutlined />;
  const text = value > 0 ? "Like" : "Dislike";
  return (
    <>
      {contextHolder}
      <Button
        onClick={() => {
          let setTo = 0;
          if (like !== value) {
            setTo = value;
          }
          const incrementBy =
            like + setTo === 0 ? 2 * setTo : -1 * like + setTo;
          setLike(setTo);
          axios
            .patch(API + endpoint, {
              inc_votes: incrementBy,
            })
            .catch((err) => {
              error();
              setLike(0);
            });
        }}
        type={like === value ? "primary" : type}
        icon={icon}
      >
        {text}
      </Button>
    </>
  );
}
