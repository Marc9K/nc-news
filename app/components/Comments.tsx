import { Button, Flex, Image, message, Pagination, Typography } from "antd";
import { useLoad } from "../hooks/useLoad";
import { API } from "../../env";
import { MetaWraper } from "./MetaWraper";
// import type { Route } from "./+types/Article";
// import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { CommentCard } from "./CommentCard";
import { useContext, useState } from "react";
import axios from "axios";
import type { CommentType } from "../interfaces/Comment";
import { ReloadOutlined } from "@ant-design/icons";
import { AuthContext } from "~/userContext";

const { TextArea } = Input;

export default function Comments({ articleId }: { articleId: number }) {
  const url = API + "articles/" + articleId;

  const [comment, setComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [deleted, setDeleted] = useState<number[]>([]);
  const [limit, setLimit] = useState(10);
  const [p, setPage] = useState(1);
  const [reload, setReload] = useState(false);

  const { user } = useContext(AuthContext);

  const { data, error, loading } = useLoad(
    url + "/comments",
    [limit, p, reload],
    { p, limit }
  );
  const [messageApi, contextHolder] = message.useMessage();

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: "Couldn't post your comment, sorry",
    });
  };

  async function postComment() {
    setPosting(true);
    try {
      await axios.post(API + "articles/" + articleId + "/comments", {
        username: user?.username,
        body: comment,
      });
      setComment("");
      setReload((prev) => !prev);
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
        {user && (
          <>
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
          </>
        )}
        <MetaWraper
          loading={loading}
          error={error}
          text="Reload comments"
          onClick={() => {
            setReload((prev) => !prev);
          }}
          icon={<ReloadOutlined />}
        >
          {data && (
            <>
              {(data.comments as CommentType[])
                .filter((comment) => !deleted.includes(comment.comment_id))
                .map((comment) => (
                  <CommentCard
                    onDelete={(commentId: number) => {
                      setDeleted((prev) => [...prev, commentId]);
                    }}
                    key={comment.comment_id}
                    comment={comment}
                  />
                ))}
              {data.total_count > limit && (
                <Pagination
                  onChange={(page, limit) => {
                    setPage(page);
                    setLimit(limit);
                  }}
                  total={data.total_count}
                  showSizeChanger
                  showQuickJumper
                  current={p}
                  pageSize={limit}
                />
              )}
            </>
          )}
        </MetaWraper>
      </Flex>
    </>
  );
}
