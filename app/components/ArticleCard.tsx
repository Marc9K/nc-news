import { Badge, Card, Flex, Space, Typography, Image, Button } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import type { ArticleType } from "../interfaces/Article";
import { useLoad } from "~/hooks/useLoad";
import { API } from "env";
import { VisuallyHidden } from "@chakra-ui/react";
import { onKeySubmit } from "~/utils";

export function ArticleCard({ article }: { article: ArticleType }) {
  const createdAt = new Date(article.created_at);
  const navigate = useNavigate();
  const { data } = useLoad(API + "articles/" + article.article_id);
  function onClick() {
    navigate("/article/" + article.article_id);
  }
  return (
    <span
      aria-label={"Article by " + article.author}
      tabIndex={0}
      role="link"
      onClick={onClick}
      onKeyDown={(e) => {
        onKeySubmit(e, onClick);
      }}
    >
      <Card
        // extra={
        //   <Button
        //     aria-label={`Read ${article.title}`}
        //     type="link"
        //     onClick={onClick}
        //   >
        //     Read
        //     <VisuallyHidden>
        //       {article.title} by {article.author}
        //     </VisuallyHidden>
        //   </Button>
        // }
        onClick={onClick}
        className="wide maxS"
        title={
          <Typography.Title level={3} className="text-wrap">
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
              className="wide"
              src={data.article.article_img_url}
              alt="Article image"
            />
            <Typography.Text ellipsis={3}>{data.article.body}</Typography.Text>
          </Flex>
        )}
        <Flex justify="space-between">
          <Typography.Text type="secondary">
            By {article.author}
          </Typography.Text>
          <Typography.Text type="secondary">
            {createdAt.toLocaleDateString("en-GB")}
          </Typography.Text>
        </Flex>
      </Card>
    </span>
  );
}
