import { Button, message } from "antd";
import axios from "axios";
import API from "../../env";

interface LikeButtonProps {
  like: number;
  setLike: (like: number) => void;
  value: number;
  icon: React.ReactNode;
  text: string;
  article_id: number;
}

export function LikeButton({
  like,
  setLike,
  value,
  icon,
  text,
  article_id,
}: LikeButtonProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Your vote didn't count 😢",
    });
  };
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
            .patch(API + "articles/" + article_id, {
              inc_votes: incrementBy,
            })
            .catch((err) => {
              error();
              setLike(0);
            });
        }}
        type={like === value ? "primary" : "default"}
        icon={icon}
      >
        {text}
      </Button>
    </>
  );
}
