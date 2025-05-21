import { Button, Flex, Image, message, Typography } from "antd";
import { useLoad } from "~/hooks/useLoad";
import API from "../../env";
import { MetaWraper } from "./MetaWraper";
// import type { Route } from "./+types/Article";
// import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Comment } from "./Comment";
import { useState } from "react";
import axios from "axios";

const { TextArea } = Input;

export default function Comments({ id }) {
  const url = API + "articles/" + id;
  const [comment, setComment] = useState("");
  const [posting, setPosting] = useState(false);
  const { data, error, loading } = useLoad(url + "/comments", [posting]);
  const [messageApi, contextHolder] = message.useMessage();

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: "Can't post your comment, sorry",
    });
  };

  async function postComment() {
    setPosting(true);
    try {
      await axios.post(API + "articles/" + id + "/comments", {
        username: "grumpy19",
        body: comment,
      });
      setComment("");
    } catch (err) {
      errorMessage();
    } finally {
      setPosting(false);
    }
  }

  return (
    <>
      {contextHolder}
      <Flex vertical align="center" gap="middle">
        <TextArea
          value={comment}
          onChange={({ target: { value } }) => {
            setComment(value);
          }}
          placeholder="Comment here..."
          autoSize
        />
        <Button
          loading={posting}
          disabled={posting}
          onClick={postComment}
          style={{ alignSelf: "end" }}
          type="primary"
        >
          Comment
        </Button>
        <MetaWraper loading={loading} error={error}>
          {data && (
            <>
              {data.comments.map((comment) => (
                <Comment key={comment.comment_id} comment={comment} />
              ))}
            </>
          )}
        </MetaWraper>
      </Flex>
    </>
  );
}
