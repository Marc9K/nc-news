import { Button } from "antd";
import axios from "axios";
import API from "../../env";

export function LikeButton({ like, setLike, value, icon, text, article_id }) {
  return (
    <Button
      onClick={() => {
        let setTo = 0;
        if (like !== value) {
          setTo = value;
        }
        const incrementBy = like + setTo === 0 ? 2 * setTo : -1 * like + setTo;
        setLike(setTo);
        axios.patch(API + "articles/" + article_id, {
          inc_votes: incrementBy,
        });
      }}
      type={like === value ? "primary" : "default"}
      icon={icon}
    >
      {text}
    </Button>
  );
}
