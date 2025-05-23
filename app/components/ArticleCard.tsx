import { Badge, Card, Flex, Space, Typography, Image } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import type { ArticleType } from "../interfaces/Article";
import { useLoad } from "~/hooks/useLoad";
import { API } from "env";

export function ArticleCard({ article }: { article: ArticleType }) {
  const createdAt = new Date(article.created_at);
  const navigate = useNavigate();
  const { data } = useLoad(API + "articles/" + article.article_id);
  return (
    <Card
      tabIndex={0}
      onClick={() => {
        navigate("/article/" + article.article_id);
      }}
      style={{
        maxWidth: "30rem",
        width: "100%",
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
      {data && (
        <Flex vertical justify="space-between" align="center">
          <Image
            preview={false}
            style={{ maxWidth: "100%" }}
            src={data.article.article_img_url}
            alt="Article image"
          />
          <Typography.Text ellipsis={3}>{data.article.body}</Typography.Text>
        </Flex>
      )}
      <Flex justify="space-between">
        <Typography.Text type="secondary">By {article.author}</Typography.Text>
        <Typography.Text type="secondary" style={{ textAlign: "end" }}>
          {createdAt.toLocaleDateString("en-GB")}
        </Typography.Text>
      </Flex>
    </Card>
  );
}
