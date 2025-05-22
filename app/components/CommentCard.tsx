import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Flex, message, Typography } from "antd";
import { API } from "env";
import type { CommentType } from "../interfaces/Comment";
import { LikeButton } from "./LikeButton";
import { useContext, useState } from "react";
import axios from "axios";
import DeleteButton from "./DeleteButton";
import { AuthContext } from "~/userContext";

export function CommentCard({
  comment,
  onDelete,
}: {
  comment: CommentType;
  onDelete: (commentId: number) => void;
}) {
  const likeEndpoint = "comments/" + comment.comment_id;

  const [like, setLike] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const { user } = useContext(AuthContext);

  const [messageApi, contextHolder] = message.useMessage();
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Couldn't delete the comment 😢",
    });
  };

  async function deleteComment() {
    try {
      setDeleting(true);
      await axios.delete(API + likeEndpoint);
      onDelete(comment.comment_id);
    } finally {
      setDeleting(false);
    }
  }

  const deleteButton = (
    <DeleteButton
      key={0}
      type="text"
      deleting={deleting}
      onClick={deleteComment}
    />
  );

  const likeButtons = [
    <LikeButton
      key={1}
      type="text"
      like={like}
      setLike={setLike}
      value={1}
      endpoint={likeEndpoint}
    />,
    <LikeButton
      key={-1}
      type="text"
      like={like}
      setLike={setLike}
      value={-1}
      endpoint={likeEndpoint}
    />,
  ];

  const actions = [
    <Typography.Text type="secondary">
      {comment.votes + like} like
      {Math.abs(comment.votes + like) !== 1 && "s"}
    </Typography.Text>,
  ];
  if (user) {
    if (comment.author === user.username) {
      actions.push(deleteButton);
    } else {
      actions.push(...likeButtons);
    }
  }

  return (
    <>
      {contextHolder}
      <Card
        style={{
          maxWidth: "30rem",
          width: "100%",
        }}
        title={
          <Flex justify="space-between" align="center">
            <Typography.Title copyable level={4}>
              {comment.author}
            </Typography.Title>
            <Typography.Text type="secondary">
              {new Date(comment.created_at).toLocaleDateString("en-GB")}
            </Typography.Text>
          </Flex>
        }
        actions={actions}
      >
        <Typography.Text>{comment.body}</Typography.Text>
      </Card>
    </>
  );
}
