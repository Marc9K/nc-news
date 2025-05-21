import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Typography } from "antd";

export function Comment({ comment }) {
  return (
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
      // actions={[
      //   <Typography.Text type="secondary">
      //     {comment.votes} likes
      //   </Typography.Text>,
      //   <Button type="text" icon={<LikeOutlined />}>
      //     Like
      //   </Button>,
      //   <Button type="text" icon={<DislikeOutlined />}>
      //     Dislike
      //   </Button>,
      // ]}
    >
      <Typography.Text>{comment.body}</Typography.Text>
    </Card>
  );
}
