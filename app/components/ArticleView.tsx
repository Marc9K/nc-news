import { Button, Flex, Typography, Image } from "antd";
import Comments from "./Comments";

export function ArticleView({ article }) {
  return (
    <Flex
      gap="middle"
      vertical
      style={{ maxWidth: "45rem", justifySelf: "center" }}
    >
      <Typography.Title>{article.title}</Typography.Title>
      <Image src={article.article_img_url} />
      <Typography.Text>{article.body}</Typography.Text>
      <Flex justify="space-between" style={{ width: "100%" }}>
        <Typography.Text type="secondary">By {article.author}</Typography.Text>
        <Typography.Text type="secondary" style={{ textAlign: "end" }}>
          {new Date(article.created_at).toLocaleDateString("en-GB")}
        </Typography.Text>

        {/* <Flex justify="space-around" style={{ width: "100%" }}>
          <Typography.Title level={5}>{article.votes} likes</Typography.Title>
          <Button icon={<LikeOutlined />}>Like</Button>
        <Button icon={<DislikeOutlined />}>Like</Button>
        </Flex> */}
      </Flex>
      <Comments id={article.article_id} />
    </Flex>
  );
}
