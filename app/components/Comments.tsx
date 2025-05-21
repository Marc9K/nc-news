import { Button, Flex, Image, message, Typography } from "antd";
import { useLoad } from "~/hooks/useLoad";
import API from "../../env";
import { MetaWraper } from "./MetaWraper";
// import type { Route } from "./+types/Article";
// import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Comment } from "./CommentCard";
import { useState } from "react";
import axios from "axios";
import type { CommentType } from "~/interfaces/Comment";

const { TextArea } = Input;

export default function Comments({ articleId }: { articleId: number }) {
  const url = API + "articles/" + articleId;
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
      await axios.post(API + "articles/" + articleId + "/comments", {
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
          disabled={posting || comment.length === 0}
          onClick={postComment}
          style={{ alignSelf: "end" }}
          type="primary"
        >
          Comment
        </Button>
        <MetaWraper loading={loading} error={error}>
          {data && (
            <>
              {data.comments.map((comment: CommentType) => (
                <Comment key={comment.comment_id} comment={comment} />
              ))}
            </>
          )}
        </MetaWraper>
      </Flex>
    </>
  );
}
