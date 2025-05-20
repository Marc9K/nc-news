import { Badge, Card, Flex, Space, Typography } from "antd";
import { CommentOutlined } from "@ant-design/icons";

export function ArticleCard({ article }) {
  const createdAt = new Date(article.created_at);
  return (
    <Card
      style={{
        maxWidth: "30rem",
        width: "calc(100% - 2rem)",
        margin: "1rem",
      }}
      title={
        <Typography.Title level={3} style={{ whiteSpace: "wrap" }}>
          {article.title}
        </Typography.Title>
      }
      actions={[
        <Typography>{article.votes}</Typography>,
        <Space direction="horizontal">
          <CommentOutlined />
          <Typography>{article.comment_count}</Typography>
        </Space>,
        <Badge.Ribbon text={article.topic} />,
      ]}
    >
      <Flex justify="space-between">
        <Typography.Text type="secondary">By {article.author}</Typography.Text>
        <Typography.Text type="secondary" style={{ textAlign: "end" }}>
          {createdAt.toLocaleDateString("en-GB")}
        </Typography.Text>
      </Flex>
    </Card>
  );
}
